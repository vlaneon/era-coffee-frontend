import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomeBg from '../img/main.webp'
import Eracoffeeshop from '../img/eracoffeeshop.webp'
import WaveImg from '../img/wavetop.webp'
import vk from '../img/vk.svg'
import maxLogo from '../img/max-messenger.svg'

const HomeMain = () => {
    const navigate = useNavigate()
    const [showPromo, setShowPromo] = useState(false)
    const [timeLeft, setTimeLeft] = useState('')

    // Таймер до счастливых часов
    useEffect(() => {
        const updateTimer = () => {
            const now = new Date()
            const hour = now.getHours()
            let target = new Date(now)
            
            if (hour < 8) {
                target.setHours(8, 0, 0, 0)
            } else if (hour < 10) {
                setTimeLeft('Счастливые часы идут! 🕐')
                return
            } else if (hour < 18) {
                target.setHours(18, 0, 0, 0)
            } else if (hour < 20) {
                setTimeLeft('Счастливые часы идут! 🕐')
                return
            } else {
                target.setDate(target.getDate() + 1)
                target.setHours(8, 0, 0, 0)
            }
            
            const diff = target - now
            const hours = Math.floor(diff / 3600000)
            const minutes = Math.floor((diff % 3600000) / 60000)
            const seconds = Math.floor((diff % 60000) / 1000)
            setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`)
        }
        
        updateTimer()
        const interval = setInterval(updateTimer, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full h-screen overflow-hidden font-BonaNova">
            <img 
                src={HomeBg} 
                loading="eager" fetchPriority="high"
                alt="Background" 
                className="absolute inset-0 w-full h-full object-cover sm:blur-[10px] lg:blur-[0px]"
                style={{ objectPosition: '80% 50%' }}
            />

            <div className="absolute inset-0" />
            
            {/* Контент */}
            <div className="relative z-10 flex flex-col items-start justify-start h-full px-[5%] sm:px-[8%] lg:px-[10%] pt-[20%] sm:pt-[60%] lg:pt-[10%]">
                <div className="flex flex-col items-center">
                    <motion.img 
                        src={Eracoffeeshop} 
                        loading="lazy"
                        alt="ERA Coffee Shop" 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-28 sm:h-96 lg:h-56 w-auto mx-auto mb-6 sm:mb-6 lg:mb-8 cursor-pointer hover:scale-110 hover:brightness-75 transition-all duration-300"
                        onClick={() => navigate('/menu')}
                    />

                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        onClick={() => navigate('/history')}
                        className="bg-[#735751]/80 backdrop-blur-sm text-white px-14 sm:px-18 lg:px-24 py-4 sm:py-4 lg:py-4 rounded-[50px] text-xl sm:text-5xl lg:text-3xl font-medium hover:bg-[#674e48] transition duration-300 shadow-lg"
                    >
                        УЗНАТЬ БОЛЬШЕ ОБ ИСТОРИИ КОФЕ
                    </motion.button>

                    {/* Слоган */}
                    <p className="text-white/80 text-xl sm:text-5xl lg:text-3xl mt-4 text-center drop-shadow-xl max-w-screen-lg">
                        Откройте многовековую историю кофе вместе с ERA
                    </p>
                </div>
            </div>
            
            {/* Волна с акциями внизу */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <img 
                    src={WaveImg} 
                    loading="lazy"
                    alt="Wave" 
                    className="w-full sm:w-full h-52 sm:h-96 lg:h-auto"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-[12%] sm:pt-[20%] lg:pt-[8%]">
                    <div>
                        <h2 
                            className="text-4xl sm:text-7xl lg:text-7xl font-bold text-white cursor-pointer hover:text-[#E7D7C1] transition duration-300 flex items-center gap-2"
                            onClick={() => setShowPromo(!showPromo)}
                        >
                            НАШИ АКЦИИ
                            <span className={`text-3xl sm:text-5xl lg:text-5xl transition-transform duration-300 inline-block ${showPromo ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Окно акций */}
            {showPromo && (
                <>
                    {/* Оверлей — клик по нему закрывает окно */}
                    <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowPromo(false)}
                    />
                    <div className="fixed bottom-[20%] left-1/2 -translate-x-1/2 w-[95vw] sm:w-[85vw] lg:w-[90vw] lg:max-w-3xl bg-white rounded-[20px] shadow-2xl p-5 sm:p-6 lg:p-6 z-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end mb-2 lg:hidden">
                            <button 
                                onClick={() => setShowPromo(false)}
                                className="text-2xl text-gray-500 hover:text-gray-800"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* содержимое карточек остаётся без изменений */}
                            <div className="bg-[#f5f0ee] rounded-[15px] p-4 text-center">
                                <p className="text-[#735751] font-bold text-6xl sm:text-6xl lg:text-2xl mb-2">Счастливые часы</p>
                                <p className="text-[#735751] text-3xl sm:text-3xl lg:text-xl">Скидка 20% на все напитки с 8:00 до 10:00 и с 18:00 до 20:00</p>
                                <p className="text-[#735751] font-bold text-4xl sm:text-4xl lg:text-2xl mt-3">
                                    {timeLeft}
                                </p>
                                <button 
                                    onClick={() => navigate('/menu')}
                                    className="mt-3 bg-[#735751] text-white px-4 py-2 rounded-full text-xl sm:text-2xl lg:text-lg font-bold hover:bg-[#8B6B61] transition shadow-md"
                                >
                                    В меню
                                </button>
                            </div>
                            <div className="bg-[#f5f0ee] rounded-[15px] p-4 text-center">
                                <p className="text-[#735751] font-bold text-6xl sm:text-6xl lg:text-2xl mb-2">Комбо-наборы</p>
                                <p className="text-[#735751] text-3xl sm:text-3xl lg:text-xl">"Завтрак бариста": напиток + круассан = скидка 15%. "Обед": удон + напиток = фиксированная цена.</p>
                                <button 
                                    onClick={() => navigate('/menu')}
                                    className="mt-3 bg-[#735751] text-white px-4 py-2 rounded-full text-xl sm:text-2xl lg:text-lg font-bold hover:bg-[#8B6B61] transition shadow-md"
                                >
                                    В меню
                                </button>
                            </div>
                            <div className="bg-[#f5f0ee] rounded-[15px] p-4 text-center">
                                <p className="text-[#735751] font-bold text-6xl sm:text-6xl lg:text-2xl mb-2">Промокоды в соцсетях</p>
                                <p className="text-[#735751] text-3xl sm:text-3xl lg:text-xl">Раз в неделю в VK/Max промокод на скидку.</p>
                                <div className="flex justify-center gap-4 mt-4">
                                    <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                                        <img src={vk} alt="VK" className="h-12 w-12" />
                                    </a>
                                    <a href="https://max.ru" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                                        <img src={maxLogo} alt="Max" className="h-12 w-12" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
                    </div>
                </>
            )}
        </div>
    )
}

export default HomeMain