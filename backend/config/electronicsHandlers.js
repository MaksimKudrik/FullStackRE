const electronicsHandlers = {
    '1': {
        table: 'large_servo_motor',
        fields: 'id, speed, voltage, current, speed_sensor, url_ozon, price',
        logName: 'большойсерво-мотор'
    },
    '2':{
        table: 'average_servo_motor',
        fields: 'id, speed, voltage, current, speed_sensor, url_ozon, price',
        logName: 'среднийсерво-мотор'
    },
    '3': {
        table: 'color_sensor',
        fields: 'id, recognizes_color, measures_light, polling_rate_ms, url_ozon, price',
        logName: 'датчики-цвета'
    },
    '4': {
        table: 'touch_sensors',
        fields: 'id, touch_mode, force_mode, polling_rate, url_ozon, price',
        logName: 'датчики-нажатия'
    },
    '5': {
        table: 'distance_sensors',
        fields: 'id, range, accuracy, type, polling_rate, url_ozon, price',
        logName: 'датчики-расстояния'
    }
};
module.exports = electronicsHandlers