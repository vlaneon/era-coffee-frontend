import React from 'react'
import { useNavigate } from 'react-router-dom'
import overlayImg from '../img/overlay.svg'
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 font-BonaNova overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #735751 0%, #8B6B61 50%, #E7D7C1 100%)' }}>
            
            <Helmet>
                <title>Страница не найдена | ERA Coffee</title>
                <meta name="description" content="Запрошенная страница не существует. Вернитесь на главную и насладитесь ароматным кофе от ERA Coffee." />
            </Helmet>

            {/* Оверлей */}
            <img 
                src={overlayImg} 
                loading="lazy"
                alt="" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" 
            />

            {/* Декоративные круги */}
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10 text-center">
                <h1 className="text-[12rem] lg:text-[15rem] font-bold text-white leading-none drop-shadow-lg">
                    404
                </h1>
                <h2 className="text-5xl lg:text-6xl font-bold text-[#E7D7C1] mb-4">
                    Страница не найдена
                </h2>
                <p className="text-2xl lg:text-xl text-white/70 mb-10 max-w-md mx-auto">
                    Кажется, эту страницу забрал бариста. Она не в меню.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-[#E7D7C1] text-[#735751] px-10 py-5 rounded-[50px] text-2xl lg:text-xl font-bold hover:bg-white transition duration-300 shadow-lg"
                >
                    ← На главную
                </button>
            </div>
        </div>
    )
}

export default NotFound