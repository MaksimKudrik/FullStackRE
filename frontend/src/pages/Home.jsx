const Home = () => {
    return (
        <div className="home_page">
            <h1 className="page_title"></h1>
            
            <div className="catalog">

                {/* Электронные компоненты */}
                <div className="electronic">
                    <div className="electronic__container">
                        <h2 className="electronic__title">электронные компоненты</h2>
                        <a href="/electronics" className="electronic__card">
                            <div className="electronic__img"></div>
                            <p className="electronic__text">
                                датчик расстояния, цвета и нажатия, большой и средний сервомотор
                            </p>    
                        </a>     
                    </div>
                </div>

                {/* Механические детали */}
                <div className="mechanical">
                    <div className="mechanical__container">
                        <h2 className="mechanical__title">механические детали</h2>
                        <a href="/mechanics" className="mechanical__card">
                            <div className="mechanical__img"></div>
                            <p className="mechanical__text">
                                шестерёнки, валы, подшипники, линейные направляющие, 
                                алюминиевые профили, кронштейны, муфты, редукторы, 
                                ремни, шкивы, пружины
                            </p>    
                        </a>     
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home