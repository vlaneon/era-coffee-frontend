import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Eralogo from '../img/ERAlogo.webp'
import overlayImg from '../img/overlay.svg'
import { Helmet } from 'react-helmet-async';
import { API_BASE_URL } from '../config';

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        try {
            const response = await fetch(`${API_BASE_URL}/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('userName', data.user.first_name || data.user.username)
                navigate('/')
                window.location.reload()
            } else {
                setError(data.error || 'Ошибка при входе')
            }
        } catch (err) {
            setError('Ошибка соединения с сервером')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div 
            className="relative min-h-screen flex items-center justify-center p-4 font-BonaNova overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #735751 0%, #8B6B61 50%, #E7D7C1 100%)' }}
        >
            <Helmet>
                <title>Войти | ERA Coffee</title>
                <meta name="description" content="Войдите в свой аккаунт ERA Coffee, чтобы оформлять заказы, копить бонусы и пользоваться картой лояльности." />
            </Helmet>
            
            {/* Оверлей */}
            <img 
                src={overlayImg} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" 
            />

            {/* Декоративные круги */}
            <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md"
            >
                <div className='text-center mb-10'>
                    <img 
                        src={Eralogo} 
                        alt="ERA Coffee" 
                        className="h-28 lg:h-20 mx-auto mb-6 cursor-pointer hover:opacity-80 transition"
                        onClick={() => navigate('/')} 
                    />
                    <h1 className='text-white text-6xl lg:text-3xl font-bold drop-shadow-lg'>Вход в аккаунт</h1>
                    <p className='text-[#dcd7d5] text-2xl lg:text-base mt-3'>Добро пожаловать обратно!</p>
                </div>

                <div className='bg-white rounded-[30px] lg:rounded-[20px] shadow-2xl p-8 lg:p-8'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label className='block text-[#735751] text-3xl lg:text-lg mb-3 font-medium'>Email</label>
                            <input 
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                placeholder="your@email.com" required
                                className='w-full px-5 py-5 lg:py-3 rounded-[15px] lg:rounded-[10px] border-2 border-gray-200 focus:border-[#735751] focus:outline-none transition text-2xl lg:text-lg' 
                            />
                        </div>
                        <div>
                            <label className='block text-[#735751] text-3xl lg:text-lg mb-3 font-medium'>Пароль</label>
                            <input 
                                type="password" name="password" value={formData.password} onChange={handleChange}
                                placeholder="Введите пароль" required
                                className='w-full px-5 py-5 lg:py-3 rounded-[15px] lg:rounded-[10px] border-2 border-gray-200 focus:border-[#735751] focus:outline-none transition text-2xl lg:text-lg' 
                            />
                        </div>

                        {error && (
                            <div className='bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-[15px] lg:rounded-[10px] text-2xl lg:text-sm'>
                                {error}
                            </div>
                        )}

                        <div className="text-right">
                            <button 
                                type="button"
                                onClick={() => navigate('/forgot-password')} 
                                className="text-[#735751] text-2xl lg:text-base underline hover:text-[#8B6B61] transition"
                            >
                                Забыли пароль?
                            </button>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className='w-full bg-[#735751] text-white py-5 lg:py-3 rounded-[15px] lg:rounded-[10px] text-3xl lg:text-xl font-medium hover:bg-[#8B6B61] transition disabled:opacity-50'
                        >
                            {isLoading ? 'Входим...' : 'Войти'}
                        </button>
                    </form>

                    <div className='mt-8 text-center'>
                        <p className='text-gray-500 text-2xl lg:text-base'>
                            Нет аккаунта?{' '}
                            <button 
                                onClick={() => navigate('/register')} 
                                className='text-[#735751] font-medium hover:text-[#8B6B61] transition text-2xl lg:text-base'
                            >
                                Зарегистрироваться
                            </button>
                        </p>
                    </div>
                </div>

                <div className='text-center mt-8'>
                    <button 
                        onClick={() => navigate('/')} 
                        className='text-white text-2xl lg:text-base hover:text-[#dcd7d5] transition'
                    >
                        ← На главную
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default Login