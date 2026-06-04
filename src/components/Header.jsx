import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Eralogo from '../img/ERAlogo.webp'
import profileLogo from '../img/bx-user.svg'
import cart from '../img/bx-cart.svg'
import vk from '../img/vk.svg'
import maxLogo from '../img/max-messenger.svg'

const Header = () => {
    const navigate = useNavigate()
    const [isContactsOpen, setIsContactsOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobileContactsOpen, setIsMobileContactsOpen] = useState(false) // для полноэкранного окна контактов
    const contactsRef = useRef(null)
    const profileRef = useRef(null)
    const contactsCloseTimerRef = useRef(null)
    const profileCloseTimerRef = useRef(null)

    const token = localStorage.getItem('token')
    const userName = localStorage.getItem('userName') || 'Пользователь'

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contactsRef.current && !contactsRef.current.contains(event.target)) {
                setIsContactsOpen(false)
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const CustomNavigation = (path) => {
        const protectedRoutes = ['/profile', '/menu']
        if (protectedRoutes.includes(path) && !token) {
            if (window.confirm('Войдите в аккаунт для доступа к этой странице')) {
                navigate('/login')
            }
        } else {
            navigate(path)
        }
        setIsMobileMenuOpen(false)
        setIsMobileContactsOpen(false)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        setIsProfileOpen(false)
        navigate('/')
        window.location.reload()
    }

    const handleContactsMouseEnter = () => {
        if (contactsCloseTimerRef.current) clearTimeout(contactsCloseTimerRef.current)
        setIsContactsOpen(true)
    }

    const handleContactsMouseLeave = () => {
        contactsCloseTimerRef.current = setTimeout(() => setIsContactsOpen(false), 300)
    }

    const handleProfileMouseEnter = () => {
        if (profileCloseTimerRef.current) clearTimeout(profileCloseTimerRef.current)
        setIsProfileOpen(true)
    }

    const handleProfileMouseLeave = () => {
        profileCloseTimerRef.current = setTimeout(() => setIsProfileOpen(false), 300)
    }

    const contactsData = [
        {
            title: 'АЦ "Sky City"',
            address: 'АЛЕУТСКАЯ 45',
            schedule: ['ПН-ПТ 08:00 - 20:00', 'СБ 09:00 - 20:00', 'ВС 10:00 - 20:00'],
        },
        {
            title: 'Енисейская',
            address: 'ул.Енисейская, 23Д,К2',
            schedule: ['ПН-ПТ 08:00 - 20:00', 'СБ 09:00 - 18:00', 'ВС ВЫХОДНОЙ']
        },
        {
            title: 'Офис Сбербанк',
            address: 'ул.ФОНТАННАЯ, 18',
            schedule: ['ПН-ПТ 08:00 - 20:00', 'СБ 09:00 - 20:00', 'ВС 10:00 - 20:00'],
        }
    ]

    const [cartPulse, setCartPulse] = useState(false)

    const addToCartPulse = () => {
        setCartPulse(true)
        setTimeout(() => setCartPulse(false), 500)
    }

    return (
        <div className='font-BonaNova fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-3 lg:pt-4'>
            <div className='flex justify-center'>
                <header className='bg-[#735751]/90 backdrop-blur-sm shadow-lg rounded-[16px] sm:rounded-[18px] lg:rounded-[20px] w-[95%] 
                                    sm:w-[92%] lg:w-[90%] lg:max-w-[1200px] xl:max-w-[1400px]'>
                    <div className='px-4 sm:px-5 lg:px-6'>
                        <div className='flex items-center justify-between h-20 sm:h-40 lg:h-20'>
                            <button onClick={() => navigate('/')} className="flex-shrink-0">
                                <img 
                                    src={Eralogo} 
                                    loading="lazy"
                                    alt="ERA Coffee" 
                                    className="h-12 sm:h-32 lg:h-16 w-auto hover:opacity-80 transition duration-200"
                                />
                            </button>

                            {/* Десктоп навигация (ноут) */}
                            <div className='hidden lg:flex items-center gap-4 lg:gap-8'>
                                <nav className='flex items-center gap-4 lg:gap-8'>
                                    <button className='text-white text-sm lg:text-2xl hover:text-[#dcd7d5] duration-200 transition' onClick={() => CustomNavigation('/')}>ГЛАВНАЯ</button>
                                    <button className='text-white text-sm lg:text-2xl hover:text-[#dcd7d5] duration-200 transition' onClick={() => CustomNavigation('/history')}>ИСТОРИЯ</button>
                                    <button className='text-white text-sm lg:text-2xl hover:text-[#dcd7d5] duration-200 transition' onClick={() => CustomNavigation('/menu')}>МЕНЮ</button>
                                    
                                    <div className="relative" ref={contactsRef}>
                                        <button className='text-white text-sm lg:text-2xl hover:text-[#dcd7d5] duration-200 transition' onMouseEnter={handleContactsMouseEnter} onMouseLeave={handleContactsMouseLeave}>КОНТАКТЫ</button>
                                        {isContactsOpen && (
                                            <div className="absolute top-full right-0 mt-2 w-[90vw] lg:w-[500px] xl:w-[650px] bg-white rounded-lg shadow-2xl z-50 p-4 lg:p-6" onMouseEnter={handleContactsMouseEnter} onMouseLeave={handleContactsMouseLeave}>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                                                    {contactsData.map((contact, index) => (
                                                        <div key={index} className="space-y-1 lg:space-y-2">
                                                            <h3 className="font-bold text-[#735751] text-sm lg:text-xl">{contact.title}</h3>
                                                            <p className="text-gray-600 text-xs lg:text-lg select-all">{contact.address}</p>
                                                            <div className="text-gray-500 text-xs lg:text-lg space-y-0.5">
                                                                {contact.schedule.map((time, idx) => (<p key={idx} className="select-all">{time}</p>))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                                    <div>
                                                        <p className="text-gray-500 text-xs lg:text-xl select-all">ERACOFFEESHOPSAY@GMAIL.COM – ВАКАНСИИ, ОБЩИЕ ВОПРОСЫ</p>
                                                        <p className="text-gray-500 text-xs lg:text-xl select-all">ERACOOP@GMAIL.COM – ВАКАНСИИ, ОБЩИЕ ВОПРОСЫ</p>
                                                        <p className="text-[#735751] font-bold text-xs lg:text-xl mt-1 lg:mt-2 select-all">+7 999 888 46 35</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                                                            <img src={vk} loading="lazy" alt="VK" className="h-6 lg:h-12 w-6 lg:w-12" />
                                                        </a>
                                                        <a href="https://max.ru" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition">
                                                            <img src={maxLogo} loading="lazy" alt="Max" className="h-6 lg:h-12 w-6 lg:w-12" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </nav>

                                <button 
                                    className='hover:opacity-80 transition duration-200'
                                    onClick={() => token ? navigate('/profile', { state: { tab: 'cart' } }) : CustomNavigation('/login')}
                                >
                                    <img 
                                        src={cart} 
                                        loading="lazy"
                                        alt="Корзина" 
                                        className={`h-6 lg:h-8 w-6 lg:w-8 brightness-0 invert transition-transform ${cartPulse ? 'animate-pulse-cart' : ''}`} 
                                    />
                                </button>

                                <div className="relative" ref={profileRef}>
                                    <button 
                                        className='hover:opacity-80 transition duration-200'
                                        onMouseEnter={handleProfileMouseEnter}
                                        onMouseLeave={handleProfileMouseLeave}
                                        onClick={() => token ? navigate('/profile') : CustomNavigation('/login')}
                                    >
                                        <img src={profileLogo} loading="lazy" alt="Профиль" className="h-6 lg:h-10 w-6 lg:w-10 brightness-0 invert" />
                                    </button>
                                    {token && isProfileOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 lg:w-64 bg-white rounded-lg shadow-2xl z-50" onMouseEnter={handleProfileMouseEnter} onMouseLeave={handleProfileMouseLeave}>
                                            <div className="p-3 lg:p-4 border-b border-gray-100">
                                                <p className="text-gray-700 font-medium text-base lg:text-2xl">{userName}</p>
                                                <p className="text-gray-500 text-xs lg:text-xl">Пользователь</p>
                                            </div>
                                            <button onClick={handleLogout} className="w-full text-left px-3 lg:px-4 py-2 lg:py-3 text-red-600 hover:bg-red-50 text-sm lg:text-xl transition duration-200">Выйти</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Мобилка + Планшет: иконки + бургер */}
                            <div className='lg:hidden flex items-center gap-4 sm:gap-5'>
                                <button 
                                    className='hover:opacity-80 transition duration-200'
                                    onClick={() => token ? navigate('/profile', { state: { tab: 'cart' } }) : CustomNavigation('/login')}
                                >
                                    <img 
                                        src={cart} 
                                        loading="lazy"
                                        alt="Корзина" 
                                        className={`h-6 lg:h-8 w-6 sm:h-12 sm:w-12 lg:w-8 brightness-0 invert transition-transform ${cartPulse ? 'animate-pulse-cart' : ''}`} 
                                    />
                                </button>
                                <button 
                                    className='hover:opacity-80 transition duration-200'
                                    onClick={() => token ? navigate('/profile') : CustomNavigation('/login')}
                                >
                                    <img src={profileLogo} loading="lazy" alt="Профиль" className="h-7 sm:h-12 w-7 sm:w-12 brightness-0 invert" />
                                </button>
                                <button className='text-white text-3xl sm:text-5xl' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                    {isMobileMenuOpen ? '✕' : '☰'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Мобильное меню */}
                    {isMobileMenuOpen && (
                        <div className='lg:hidden bg-[#735751] border-t border-white/10 px-4 pb-6'>
                            <nav className='flex flex-col gap-4'>
                                <button className='text-white text-xl sm:text-3xl hover:text-[#dcd7d5] transition text-left' onClick={() => CustomNavigation('/')}>ГЛАВНАЯ</button>
                                <button className='text-white text-xl sm:text-3xl hover:text-[#dcd7d5] transition text-left' onClick={() => CustomNavigation('/history')}>ИСТОРИЯ</button>
                                <button className='text-white text-xl sm:text-3xl hover:text-[#dcd7d5] transition text-left' onClick={() => CustomNavigation('/menu')}>МЕНЮ</button>
                                <button 
                                    className='text-white text-xl sm:text-3xl hover:text-[#dcd7d5] transition text-left'
                                    onClick={() => setIsMobileContactsOpen(!isMobileContactsOpen)}
                                >
                                    КОНТАКТЫ
                                </button>
                            </nav>
                    
                            {/* Блок контактов – крупный и на всю ширину */}
                            {isMobileContactsOpen && (
                                <div className="mt-4 space-y-6 text-left animate-fade-in-up">
                                    {contactsData.map((contact, index) => (
                                        <div key={index}>
                                            <h3 className="font-bold text-white text-3xl sm:text-4xl mb-1">{contact.title}</h3>
                                            <p className="text-gray-300 text-2xl sm:text-3xl select-all">{contact.address}</p>
                                            <div className="text-gray-400 text-2xl sm:text-3xl space-y-1 mt-2">
                                                {contact.schedule.map((time, idx) => (
                                                    <p key={idx} className="select-all">{time}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="text-gray-300 text-2xl sm:text-3xl space-y-2 mt-6">
                                        <p className="select-all">ERACOFFEESHOPSAY@GMAIL.COM – ВАКАНСИИ, ОБЩИЕ ВОПРОСЫ</p>
                                        <p className="select-all">ERACOOP@GMAIL.COM – ВАКАНСИИ, ОБЩИЕ ВОПРОСЫ</p>
                                        <p className="font-bold text-white text-3xl sm:text-4xl mt-3 select-all">+7 999 888 46 35</p>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                                            <img src={vk} alt="VK" className="h-10 sm:h-12 w-10 sm:w-12" />
                                        </a>
                                        <a href="https://max.ru" target="_blank" rel="noopener noreferrer">
                                            <img src={maxLogo} alt="Max" className="h-10 sm:h-12 w-10 sm:w-12" />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </header>
            </div>
        </div>
    )
}

export default Header