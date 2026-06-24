import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Проверяем, давал ли пользователь согласие
        const consent = localStorage.getItem('cookiesAccepted')
        if (!consent) {
            setIsVisible(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl border-t-4 border-[#735751] p-4 md:p-6 font-BonaNova">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left text-sm md:text-base text-gray-700 leading-relaxed">
                    <p>
                        Мы используем файлы cookie для корректной работы сайта, а также обрабатываем 
                        персональные данные (имя, email, адрес доставки) с целью оформления заказов. 
                        Продолжая использовать сайт, вы соглашаетесь с{' '}
                        <Link 
                            to="/privacy-policy" 
                            className="text-[#735751] font-bold underline hover:text-[#8B6B61] transition"
                            onClick={() => setIsVisible(false)} // можно закрыть при переходе, но лучше оставить
                        >
                            политикой обработки персональных данных
                        </Link>.
                    </p>
                </div>
                <button
                    onClick={handleAccept}
                    className="bg-[#735751] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#8B6B61] transition whitespace-nowrap flex-shrink-0"
                >
                    Принять
                </button>
            </div>
        </div>
    )
}

export default CookieConsent