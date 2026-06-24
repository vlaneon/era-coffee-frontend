import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookiesAccepted')
        if (!consent) {
            setIsVisible(true)
        }
    }, [])

    // Проверяем при возврате на страницу
    useEffect(() => {
        const handleFocus = () => {
            const consent = localStorage.getItem('cookiesAccepted')
            if (consent) {
                setIsVisible(false)
            }
        }
        window.addEventListener('focus', handleFocus)
        return () => window.removeEventListener('focus', handleFocus)
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#f5f0ee] shadow-2xl border-t-4 border-[#735751] p-4 sm:p-5 md:p-4 lg:p-3 font-BonaNova">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="text-center sm:text-left text-xl sm:text-3xl lg:text-xl text-gray-700 leading-relaxed">
                    <p>
                        Мы используем файлы cookie для корректной работы сайта, а также обрабатываем 
                        персональные данные (имя, email, адрес доставки) с целью оформления заказов. 
                        Продолжая использовать сайт, вы соглашаетесь с{' '}
                        <Link 
                            to="/privacy-policy"
                            className="text-[#735751] font-bold underline hover:text-[#8B6B61] transition"
                            // onClick УДАЛЁН — окно НЕ закрывается при переходе
                        >
                            политикой обработки персональных данных
                        </Link>.
                    </p>
                </div>
                <button
                    onClick={handleAccept}
                    className="bg-[#735751] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-2xl font-bold hover:bg-[#8B6B61] transition whitespace-nowrap flex-shrink-0 w-full sm:w-auto"
                >
                    Принять
                </button>
            </div>
        </div>
    )
}

export default CookieConsent