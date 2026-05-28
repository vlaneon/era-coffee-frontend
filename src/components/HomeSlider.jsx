import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SliderBg from '../img/sliderbg.svg'
import { API_BASE_URL } from '../config';

const HomeSlider = () => {
    const navigate = useNavigate()
    const [slides, setSlides] = useState([])
    const [current, setCurrent] = useState(1)
    const [animating, setAnimating] = useState(false)

    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch('${API_BASE_URL}/products/')
            .then(r => r.json())
            .then(data => {
                const filtered = data.filter(p => p.categories?.includes('slider'))
                const formatted = filtered.map(p => ({
                    id: p.id,
                    image: p.image,
                    title: p.name,
                    isHit: p.is_hit || false
                }))
                setSlides(formatted)
            })
            .catch(() => {
                setSlides([])
            })
    }, [])

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

    if (slides.length === 0) {
        return (
            <div className="relative w-full h-screen lg:py-20 font-KyivSans overflow-hidden">
                <img src={SliderBg} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="relative z-10 flex items-center justify-center h-full">
                    <p className="text-[#735751] text-3xl lg:text-xl">Загрузка...</p>
                </div>
            </div>
        )
    }

    const goTo = (index) => {
        if (animating || index === current) return
        setAnimating(true)
        setCurrent(index)
        setTimeout(() => setAnimating(false), 600)
    }

    const next = () => goTo((current + 1) % slides.length)
    const prev = () => goTo((current - 1 + slides.length) % slides.length)

    const getSlideIndex = (offset) => {
        return (current + offset + slides.length) % slides.length
    }

    return (
        <div className="relative w-full h-screen lg:h-auto lg:py-20 font-KyivSans overflow-hidden">
            <img src={SliderBg} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover" />

            <div className="relative z-10 max-w-7xl mx-auto px-2 lg:px-4 h-full">
                    <h2 className="text-center text-[#735751] text-8xl lg:text-5xl font-bold sm:mt-[20%] lg:mt-0 mb-0 lg:mb-8">
                        Авторские напитки
                    </h2>

                <div className="relative flex items-center justify-center h-full lg:h-[480px] sm:h-[70%]">
                    <button onClick={prev} className="absolute left-1 lg:left-0 z-20 w-14 lg:w-12 h-14 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl lg:text-2xl text-[#735751] hover:bg-[#735751] hover:text-white transition-all duration-300">
                        ‹
                    </button>

                    <div className="relative flex items-center justify-center w-full h-full">
                        {[-2, -1, 0, 1, 2].map((offset) => {
                            const index = getSlideIndex(offset)
                            const slide = slides[index]
                            if (!slide) return null
                            const isCenter = offset === 0

                            let positionClasses = 'hidden lg:block opacity-0 scale-50'
                            if (isCenter) {
                                positionClasses = 'w-[85vw] h-[55vh] lg:w-[340px] lg:h-[430px] z-30 scale-100 opacity-100 left-1/2 -translate-x-1/2'
                            } else if (offset === -1) {
                                positionClasses = 'w-[65vw] h-[40vh] lg:w-[260px] lg:h-[350px] z-20 scale-90 opacity-80 left-[calc(50%-72vw)] lg:left-[calc(50%-310px)]'
                            } else if (offset === 1) {
                                positionClasses = 'w-[65vw] h-[40vh] lg:w-[260px] lg:h-[350px] z-20 scale-90 opacity-80 left-[calc(50%+7vw)] lg:left-[calc(50%+50px)]'
                            } else if (offset === -2) {
                                positionClasses = 'lg:w-[220px] lg:h-[300px] lg:z-10 lg:scale-80 lg:opacity-50 lg:left-[calc(50%-510px)]'
                            } else {
                                positionClasses = 'lg:w-[220px] lg:h-[300px] lg:z-10 lg:scale-80 lg:opacity-50 lg:left-[calc(50%+290px)]'
                            }

                            return (
                                <div
                                    key={index}
                                    onClick={() => goTo(index)}
                                    className={`absolute rounded-[30px] lg:rounded-[40px] shadow-xl cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${positionClasses}`}
                                >
                                    <div className="w-full h-full bg-white rounded-[30px] lg:rounded-[40px] overflow-hidden">
                                        <div className="p-6 pb-0 h-[70%] lg:h-[75%] flex items-center justify-center bg-gradient-to-b from-[#f5f0ee] to-white">
                                            <img src={slide.image_url || `https://res.cloudinary.com/dn3ku8mvi/${slide.image}`} 
                                            loading="lazy" 
                                            alt={slide.title} 
                                            className="w-full h-full object-contain hover:scale-110 transition duration-500" />
                                        </div>
                                        
                                        {slide.isHit && (
                                            <div className="absolute top-0 left-0 bg-[#735751] text-white px-5 lg:px-4 py-6 lg:py-1.5 rounded-full text-5xl lg:text-xs font-bold tracking-wider z-40">
                                                HIT
                                            </div>
                                        )}

                                        {isCenter && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-b-[30px] lg:rounded-b-[40px] p-6 lg:p-5 text-center border-t border-gray-100">
                                                <h3 className="text-[#735751] font-bold text-7xl lg:text-xl mb-[10%] lg:mb-1">{slide.title}</h3>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); CustomNavigation('/menu') }}
                                                    className="text-[#A78A7F] text-5xl lg:text-sm font-medium hover:text-[#735751] transition"
                                                >
                                                    смотреть меню →
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <button onClick={next} className="absolute right-1 lg:right-0 z-20 w-20 lg:w-12 h-20 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl lg:text-2xl text-[#735751] hover:bg-[#735751] hover:text-white transition-all duration-300">
                        ›
                    </button>
                </div>

                <div className="flex justify-center gap-3 lg:gap-2 mt-6 lg:mt-8">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            className={`rounded-full transition-all duration-300 ${
                                index === current 
                                    ? 'bg-[#735751] w-14 lg:w-10 h-3 lg:h-2.5' 
                                    : 'bg-[#A78A7F]/30 hover:bg-[#A78A7F]/50 w-3 lg:w-2.5 h-3 lg:h-2.5'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeSlider