import React from 'react'
import { useNavigate } from 'react-router-dom'
import SectionBg from '../img/zagolovok.webp'
import WaveBottom from '../img/wavebottom.webp'

const HomeSection1 = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const CustomNavigation = (path) => {
        const protectedRoutes = ['/menu']
        if (protectedRoutes.includes(path) && !token) {
            if (window.confirm('Войдите в аккаунт для доступа к этой странице')) {
                navigate('/login')
            }
        } else {
            navigate(path)
        }
    }

    return (
        <div className="relative w-full h-screen lg:h-[120vh] font-KyivSans overflow-hidden">
            <img 
                src={SectionBg} 
                loading="lazy"
                alt="" 
                className="absolute inset-0 w-full h-full object-cover blur-[3px] lg:blur-[0px]"
            />

            {/* Движущиеся мерцающие точки */}
            <div className="absolute inset-0 pointer-events-none z-[5]">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-white/40 animate-float-point"
                        style={{ 
                            width: `${2 + Math.random() * 4}px`,
                            height: `${2 + Math.random() * 4}px`,
                            left: `${Math.random() * 100}%`, 
                            top: `${Math.random() * 100}%`, 
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${4 + Math.random() * 6}s`
                        }} 
                    />
                ))}
            </div>

            <img 
                src={WaveBottom} 
                loading="lazy"
                alt="" 
                className="absolute top-0 left-0 w-full h-auto lg:h-auto z-10 sm:h-96"
            />

            <div className="relative z-20 flex justify-center sm:justify-end items-end h-full px-4 sm:pr-[4em] lg:pr-[8em] pb-8 sm:pb-[20em] lg:pb-[10em] pt-20 sm:pt-[20em] lg:pt-[20em]">
                <div className="text-center sm:text-right max-w-xl lg:max-w-xl sm:max-w-3xl">
                    <h1 className="text-white text-5xl sm:text-7xl lg:text-6xl font-bold mb-6 sm:mb-4 lg:mb-6 leading-tight">
                        Свежеобжаренные кофейные зерна
                    </h1>
                    
                    <div className="space-y-6 sm:space-y-3 lg:space-y-4 mb-8 sm:mb-6 lg:mb-8">
                        <p className="text-[#E7D7C1] text-3xl sm:text-5xl lg:text-3xl leading-relaxed">
                            Выбор каждого гостя — ароматные кофейные напитки, которые в нашей кофейне готовят из кофейных зерен высшего качества. Мы серьезно подходим к подбору проверенных поставщиков, лидеров рынка.
                        </p>
                        <p className="text-[#E7D7C1] text-3xl sm:text-5xl lg:text-3xl leading-relaxed">
                            Стараемся постоянно радовать гостей разнообразием вкусов — предлагать различные сорта для эспрессо-напитков и фильтр-кофе
                        </p>
                    </div>

                    <button
                        onClick={() => CustomNavigation('/menu')}
                        className="bg-[#A78A7F] text-white px-20 sm:px-16 lg:px-26 py-5 sm:py-4 rounded-[50px] text-2xl sm:text-5xl lg:text-2xl font-medium hover:bg-[#8B6B61] transition duration-300 shadow-lg w-full sm:w-full lg:max-w-lg"
                    >
                        смотреть классические напитки
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeSection1