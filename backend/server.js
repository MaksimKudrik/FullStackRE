require('dotenv').config()
const express = require('express')
const { Pool } = require('pg')
const path = require('path')
const cors = require('cors')

const { default: electronicsHandlers } = require('./config/electronicsHandlers.js');
const app = express()
const PORT = process.env.PORT || 3000


app.use(cors({origin: '*'}))
app.use(express.json())

app.use((req,res,next)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
    next()
})


app.use('/api',(req,res,next)=>{
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
})

// подключение к локальной бд
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST || 'localhost',
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// })


// -------------------------------------------------------------------------------------
// подключение к render


console.log('Тип Pool:', typeof Pool);          // должно быть "function"
console.log('Есть ли у Pool .on?', typeof Pool.prototype.on);  // "function"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 10,                    // уменьши до 8–12 для Render (free/hobby тарифы)
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    allowExitOnIdle: true,      // полезно для serverless/Render
});

// НЕ используй pool.on('connect') и pool.on('error') вообще — они ненадёжны в новых версиях
// Вместо этого делай проверку подключения напрямую в async

(async () => {
    let client;
    try {
        client = await pool.connect();
        console.log('PostgreSQL → успешно подключено и готово к работе');

        // Тестовый запрос — очень рекомендуется
        const now = await client.query('SELECT NOW()');
        console.log('Текущее время сервера БД:', now.rows[0].now);

    } catch (err) {
        console.error('!!! КРИТИЧЕСКАЯ ОШИБКА ПОДКЛЮЧЕНИЯ К БД !!!');
        console.error(err.stack || err.message);
        process.exit(1);
    } finally {
        if (client) client.release();
    }

    // Сервер стартуем только после успешного теста
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Сервер запущен на http://0.0.0.0:${PORT}`);
        console.log(`Режим: ${process.env.NODE_ENV || 'development'}`);
        console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? 'есть' : 'НЕТ!'}`);
    });
})();
// --------------------------------------------------------------------------

app.get('/api/electronics',async(req,res)=>{
    try{
        const result = await pool.query(
            `SELECT id, name_detail, description, images
            FROM electronic_components
            ORDER BY  id`
        )
        res.json(result.rows)

    }
    catch (err){
        console.error(err)
        res.status(500).json({error: 'Ошибка сервера'})
    }
})

app.get('/api/electronics/:id',async (req,res)=>{
    const id = parseInt(req.params.id)
    console.log(`→ Запрос к /api/electronics/${id}`)
    try{
        const copmRes =await pool.query(
            'SELECT id, name_detail, description, images FROM electronic_components WHERE id = $1 ORDER BY id ASC',[id]
        )
        if (copmRes.rows.length === 0) {
            return res.status(404).json({error: 'Компонент не найден'})
        }
        const component = copmRes.rows[0]

        const devicesRes = await pool.query(
            'SELECT id, name_device, images FROM electronic_devices WHERE parent_id = $1 ORDER BY id ASC',[id]
        )
        res.json({component,devices:devicesRes.rows})

        }
        catch (err){
            console.error(`Ошибка в /api/electronics/${id}:`, err.message)
            res.status(500).json({error: 'Ошибка сервера'})
        }
})



app.get('/api/electronics/:type/:id', async (req, res) => {
    const type = req.params.type;
    const deviceId = parseInt(req.params.id);

    console.log('Получен type:', type, 'тип данных:', typeof type);
    console.log('Доступные ключи в handlers:', Object.keys(electronicsHandlers));
    console.log('Есть ли handler для этого type?', !!electronicsHandlers[type]);

    const handler = electronicsHandlers[type];
    if (!handler) {
        console.log(`Не найден handler для: ${type}`);
            return res.status(400).json({ error: `Неизвестный тип: ${type} `});
    }

    console.log(`→ Запрос /api/electronics/${type}/${deviceId} (${handler.logName})`);

    try {
        const deviceRes = await pool.query(
                `SELECT id, name_device, images 
                FROM electronic_devices 
                WHERE id = $1`,
            [deviceId]
        );

        if (deviceRes.rows.length === 0) {
            return res.status(404).json({ error: 'Устройство не найдено' });
        }

        const device = deviceRes.rows[0];

        const componentsRes = await pool.query(
                `SELECT ${handler.fields} 
                FROM ${handler.table} 
                WHERE device_id = $1 
                ORDER BY id ASC`,
            [deviceId]
        );


        res.json({
            device: {
                id: device.id,
                name: device.name_device,     
                images: device.images || null,
            },
            components: componentsRes.rows
        });

    } catch (err) {
        console.error(`Ошибка /api/electronics/${type}/${deviceId}:`, err.message);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.get('/api/mechanics', async (req, res) => {
    console.log('→ Запрос к /api/mechanics');
    try {
        const result = await pool.query(`
        SELECT id, name_detail, photo, stl, m3d
        FROM mechanical_details
            ORDER BY id
    `);
    res.json(result.rows);
    } catch (err) {
    console.error('Ошибка в /api/mechanics:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
    }
});


app.use(express.static(path.join(__dirname,'../frontend/dist')))

app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/dist/index.html'),
    (err)=>{
        if (err){
            console.error(err)
            res.status(500).send({error: 'Ошибка сервера'})
        }
    })

})

// app.listen(PORT,()=>{
//     console.log(`Сервер запущен на http://localhost:${PORT}`)
// })




