import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Eralogo from '../img/ERAlogo.webp'
import { Helmet } from 'react-helmet-async';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setMessage('')
        try {
            const r = await fetch('http://127.0.0.1:8000/api/password-reset/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            const data = await r.json()
            if (r.ok) {
                setMessage(data.message)
            } else {
                setError(data.error || 'Ошибка')
            }
        } catch (err) {
            setError('Ошибка соединения')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='font-BonaNova min-h-screen bg-gradient-to-br from-[#735751] to-[#8B6B61] flex items-center justify-center p-6'>
            <Helmet>
                <title>Восстановление пароля | ERA Coffee</title>
                <meta name="description" content="Восстановите пароль от аккаунта ERA Coffee. Мы отправим инструкцию на вашу электронную почту." />
            </Helmet>
            <div className='w-full max-w-md'>
                <div className='text-center mb-10'>
                    <img src={Eralogo} alt="ERA" className="h-28 lg:h-20 mx-auto mb-6 cursor-pointer" onClick={() => navigate('/')} />
                    <h1 className='text-white text-5xl lg:text-3xl font-bold'>Восстановление пароля</h1>
                </div>
                <div className='bg-white rounded-[30px] lg:rounded-[20px] shadow-2xl p-8'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label className='block text-[#735751] text-3xl lg:text-lg mb-3 font-medium'>Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                placeholder="your@email.com" required
                                className='w-full px-5 py-5 lg:py-3 rounded-[15px] border-2 border-gray-200 focus:border-[#735751] text-2xl lg:text-lg' />
                        </div>
                        {error && <div className='bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-[15px] text-2xl'>{error}</div>}
                        {message && <div className='bg-green-50 border border-green-200 text-green-600 px-5 py-4 rounded-[15px] text-2xl'>{message}</div>}
                        <button type="submit" disabled={isLoading}
                            className='w-full bg-[#735751] text-white py-5 lg:py-3 rounded-[15px] text-3xl lg:text-xl font-medium hover:bg-[#8B6B61] transition disabled:opacity-50'>
                            {isLoading ? 'Отправляем...' : 'Отправить инструкцию'}
                        </button>
                    </form>
                    <div className='mt-8 text-center'>
                        <button onClick={() => navigate('/login')} className='text-[#735751] text-2xl lg:text-base font-medium hover:text-[#8B6B61] transition'>
                            ← Вернуться ко входу
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword