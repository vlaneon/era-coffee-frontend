import React from 'react'
import { useNavigate } from 'react-router-dom'
import FooterBg from '../img/футер.webp'
import FooterBgMobile from '../img/футермобайл.webp'
import Eralogo from '../img/ERAlogo.webp'
import vk from '../img/vk.svg'
import maxLogo from '../img/max-messenger.svg'

const Footer = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const CustomNavigation = (path) => {
        const protectedRoutes = ['/profile', '/menu']
        if (protectedRoutes.includes(path) && !token) {
            if (window.confirm('Войдите в аккаунт для доступа к этой странице')) {
                navigate('/login')
            }
        } else {
            navigate(path)
        }
    }

    return (
        <div className='font-BonaNova pb-2 md:pb-4'>
            <div className='flex justify-center'>
                <footer className="relative z-20 rounded-[16px] md:rounded-[20px] w-full md:w-[90%] max-w-[1200px] xl:max-w-[1400px] mx-auto overflow-hidden">
                    {/* Фон для мобилки */}
                    <img src={FooterBgMobile} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover md:hidden" />
                    {/* Фон для десктопа */}
                    <img src={FooterBg} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover hidden md:block" />
                    <div className="absolute inset-0 bg-black/10" />
                    
                    <div className="relative z-10 p-4 md:p-10">
                    {/* МОБИЛКА */}
                    <div className="flex lg:hidden flex-col items-center gap-10 text-center px-6 py-20 min-h-screen justify-center">
                        <img src={Eralogo} loading="lazy" alt="ERA" className="h-auto w-[60%]" />
                        
                        <div className="flex flex-col gap-12">
                            <button onClick={() => CustomNavigation('/')} className="text-white text-5xl">ГЛАВНАЯ</button>
                            <button onClick={() => CustomNavigation('/history')} className="text-white text-5xl">ИСТОРИЯ</button>
                            <button onClick={() => CustomNavigation('/menu')} className="text-white text-5xl">МЕНЮ</button>
                            <button onClick={() => navigate('/team')} className="text-white text-5xl">КОМАНДА</button>
                        </div>
                        
                        <div className="text-white text-4xl space-y-10 w-full">
                            <div><p className="font-bold text-5xl ">АЦ "SKY CITY"</p><p>АЛЕУТСКАЯ 45</p><p>ПН-ПТ 08:00-20:00 / СБ 09:00-20:00 / ВС 10:00-20:00</p></div>
                            <div><p className="font-bold text-5xl">ЕНИСЕЙСКАЯ</p><p>УЛ.ЕНИСЕЙСКАЯ, 23Д К2</p><p>ПН-ПТ 08:00-20:00 / СБ 09:00-18:00 / ВС ВЫХОДНОЙ</p></div>
                            <div><p className="font-bold text-5xl">ОФИС СБЕРБАНК</p><p>УЛ.ФОНТАННАЯ, 18</p><p>ПН-ПТ 08:00-20:00 / СБ 09:00-20:00 / ВС 10:00-20:00</p></div>
                        </div>
                        
                        <div className="text-white text-4xl space-y-4">
                            <p>ERACOFFEESHOPSAY@GMAIL.COM</p>
                            <p>ERACOOP@GMAIL.COM</p>
                            <p className="font-bold text-4xl">+7 999 888 46 35</p>
                        </div>
                        
                        <div className="flex gap-8">
                            <a href="https://vk.com" target="_blank" rel="noopener noreferrer"><img src={vk} loading="lazy" alt="VK" className="h-14 w-14" /></a>
                            <a href="https://max.ru" target="_blank" rel="noopener noreferrer"><img src={maxLogo} loading="lazy" alt="Max" className="h-14 w-14" /></a>
                        </div>
                        
                        <div className="text-white text-5xl flex gap-6">
                            <p>2026 ИП COFFEEERA.</p>
                            <p>ВСЕ ПРАВА ЗАЩИЩЕНЫ</p>
                        </div>
                    </div>

                        {/* ДЕСКТОП */}
                        <div className="hidden lg:flex justify-between">
                            <div className="flex flex-col justify-between gap-4">
                                {/* Блок с логотипом и основными кнопками */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-start gap-12">
                                        <img src={Eralogo} loading="lazy" alt="ERA" className="h-24 w-auto" />
                                        <div className="flex flex-col gap-10">
                                            <button onClick={() => CustomNavigation('/')} className="text-white text-2xl hover:text-[#dcd7d5] transition">ГЛАВНАЯ</button>
                                            <button onClick={() => CustomNavigation('/history')} className="text-white text-2xl hover:text-[#dcd7d5] transition">ИСТОРИЯ</button>
                                            <button onClick={() => CustomNavigation('/menu')} className="text-white text-2xl hover:text-[#dcd7d5] transition">МЕНЮ</button>
                                            <button onClick={() => navigate('/team')} className="text-white text-2xl hover:text-[#dcd7d5] transition">КОМАНДА</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Копирайт */}
                                <div className="text-white text-xl flex gap-5">
                                    <p>2026 ИП COFFEEERA.</p>
                                    <p>ВСЕ ПРАВА ЗАЩИЩЕНЫ</p>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-16 mb-8 justify-end">
                                    <div className="space-y-20 text-left">
                                        <div><h3 className="text-white font-bold text-2xl">АЦ "SKY CITY"</h3><p className="text-white text-sm select-all">АЛЕУТСКАЯ 45</p></div>
                                        <div><h3 className="text-white font-bold text-2xl">ЕНИСЕЙСКАЯ</h3><p className="text-white text-sm select-all">УЛ.ЕНИСЕЙСКАЯ, 23Д К2</p></div>
                                        <div><h3 className="text-white font-bold text-2xl">ОФИС СБЕРБАНК</h3><p className="text-white text-sm select-all">УЛ.ФОНТАННАЯ, 18</p></div>
                                    </div>
                                    <div className="space-y-8 text-right">
                                        <div className="text-white text-2xl space-y-1"><p>ПН-ПТ 08:00-20:00</p><p>СБ 09:00-20:00</p><p>ВС 10:00-20:00</p></div>
                                        <div className="text-white text-2xl space-y-1"><p>ПН-ПТ 08:00-20:00</p><p>СБ 09:00-18:00</p><p>ВС ВЫХОДНОЙ</p></div>
                                        <div className="text-white text-2xl space-y-1"><p>ПН-ПТ 08:00-20:00</p><p>СБ 09:00-20:00</p><p>ВС 10:00-20:00</p></div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 ml-auto w-[60%]">
                                    <div className="flex flex-col gap-10 flex-shrink-0">
                                        <a href="https://vk.com" target="_blank" rel="noopener noreferrer"><img src={vk} loading="lazy" alt="VK" className="h-8 w-8" /></a>
                                        <a href="https://max.ru" target="_blank" rel="noopener noreferrer"><img src={maxLogo} loading="lazy" alt="Max" className="h-8 w-8" /></a>
                                    </div>
                                    <div className="text-left text-2xl space-y-1">
                                        <p className="text-white">ERACOFFEESHOPSAY@GMAIL.COM – ВАКАНСИИ, ОБЩИЕ ВОПРОСЫ</p>
                                        <p className="text-white">ERACOOP@GMAIL.COM – ПРЕДЛОЖЕНИЯ, СОТРУДНИЧЕСТВО</p>
                                        <p className="text-white font-bold">+7 999 888 46 35</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer