import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import MenuSection from './MenuSection'
import { API_BASE_URL } from '../config'   // ← импорт базового URL

import menuBg from '../img/меню.webp'
import aboutBg from '../img/overlay.svg'
import logo from '../img/ERAlogo.webp'
import { Helmet } from 'react-helmet-async'

const categories = [
    { id: 'classic', title: 'Классика', cols: 4 },
    { id: 'ice', title: 'Айс кофе' },
    { id: 'matcha', title: 'Матча Напитки' },
    { id: 'author', title: 'Авторские' },
    { id: 'food', title: 'Основное меню' },
    { id: 'dessert', title: 'Десерты' },
]

const Menu = () => {
    const [activeTab, setActiveTab] = useState('classic')
    const [cart, setCart] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    // Проверка авторизации при входе на страницу
    useEffect(() => {
        if (!token) {
            if (window.confirm('Войдите в аккаунт для доступа к меню')) {
                navigate('/login')
            } else {
                navigate('/')
            }
        }
    }, [])

    // Загрузка корзины если авторизован
    useEffect(() => {
        if (token) {
            fetch(`${API_BASE_URL}/cart/`, {
                headers: { 'Authorization': `Token ${token}` }
            })
                .then(r => r.json())
                .then(data => setCart(data))
                .catch(() => setCart([]))
        }
    }, [token])

    const addToCart = async (item) => {
        if (!token) {
            if (window.confirm('Войдите в аккаунт, чтобы добавить товар в корзину')) {
                navigate('/login')
            }
            return
        }
        if (item.addons && item.addons['Молоко']) {
            const milkSelected = Object.values(item.addons['Молоко']).some(v => v > 0)
            if (!milkSelected) {
                alert('Выберите тип молока')
                return
            }
        }
        try {
            const response = await fetch(`${API_BASE_URL}/cart/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    product_id: item.product.id,
                    quantity: item.quantity,
                    addons: item.addons
                })
            })
            if (response.ok) {
                const updatedCart = await fetch(`${API_BASE_URL}/cart/`, {
                    headers: { 'Authorization': `Token ${token}` }
                }).then(r => r.json())
                setCart(updatedCart)
                alert('Добавлено в корзину!')
            } else {
                const error = await response.json()
                alert(error.error || 'Ошибка при добавлении')
            }
        } catch (err) {
            alert('Ошибка: ' + err.message)
        }
    }

    const removeFromCart = (item) => {
        fetch(`${API_BASE_URL}/cart/${item.id}/`, {
            method: 'DELETE',
            headers: { 'Authorization': `Token ${token}` }
        }).then(() => {
            setCart(prev => prev.filter(i => i.id !== item.id))
        })
    }

    const updateQuantity = (item, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(item)
        } else {
            fetch(`${API_BASE_URL}/cart/${item.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
                body: JSON.stringify({ quantity: newQuantity })
            }).then(() => {
                setCart(prev =>
                    prev.map(i =>
                        i.id === item.id ? { ...i, quantity: newQuantity, total_price: item.product.price * newQuantity } : i
                    )
                )
            })
        }
    }

    // Если нет токена — показываем заглушку с редиректом
    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f0ee]">
                <div className="text-4xl text-[#735751] font-BonaNova animate-pulse">
                    Требуется авторизация...
                </div>
            </div>
        )
    }

    return (
        <div className="relative bg-[#ad9893]">
            <img 
                src={menuBg} 
                loading="lazy" 
                alt="Фон меню" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" 
            />

            <Helmet>
                <title>Меню кофейни ERA Coffee | Классика, авторские напитки, десерты</title>
                <meta name="description" content="Ознакомьтесь с меню ERA Coffee: классический кофе, айс-латте, матча, авторские напитки, основные блюда и десерты. Свежие ингредиенты и уникальные рецепты." />
            </Helmet>

            <Header />
            
            <div className="relative bg-[#735751]/80 pt-48 pb-6 lg:pt-32 lg:pb-8 overflow-hidden z-10">
                <img src={aboutBg} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <img src={logo} loading="lazy" alt="ERA" className="h-40 lg:h-28 mx-auto mb-6" />
                    <h1 className="text-[#E7D7C1] text-5xl lg:text-2xl leading-relaxed mb-6">
                        Мы — кофейня с душой. Готовим кофе только из свежеобжаренных зёрен премиальной арабики из Эфиопии, Колумбии и Бразилии. 
                        Каждая чашка — результат труда фермеров, обжарщиков и наших бариста.
                    </h1>
                    <p className="text-[#E7D7C1] text-5xl lg:text-2xl leading-relaxed mb-8">
                        В нашем меню вы найдёте классические напитки, авторские сочетания и сезонные новинки. 
                        Мы используем только натуральные сиропы, свежее молоко и лучшие ингредиенты.
                    </p>
                </div>
            </div>

            <div className="sticky top-[11rem] lg:top-24 z-40 py-2 flex justify-center">
                <div className="bg-[#8a6a63]/90 rounded-2xl px-4 py-10 lg:py-3 max-w-[95vw] backdrop-blur-sm">
                    <div className="flex flex-nowrap overflow-x-auto gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveTab(cat.id)
                                    document.getElementById(cat.id)?.scrollIntoView({ behavior: 'smooth' })
                                }}
                                className={`px-6 py-3 rounded-full text-3xl lg:text-lg font-KyivSans whitespace-nowrap transition flex-shrink-0 ${
                                    activeTab === cat.id
                                        ? 'bg-white text-[#735751]'
                                        : 'bg-[#8B6B61] text-white hover:bg-[#A78A7F]'
                                }`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Секции меню */}
            {categories.slice(0, -1).map(cat => (
                <div key={cat.id} id={cat.id} className="relative">
                    <MenuSection 
                        category={cat.id} 
                        title={cat.title} 
                        cols={cat.cols || 3} 
                        onAddToCart={addToCart}
                    />
                </div>
            ))}

            {/* Секция десертов и футер */}
            <div className="relative" id="dessert">
                <MenuSection 
                    category="dessert" 
                    title="Десерты" 
                    cols={3} 
                    onAddToCart={addToCart}
                />
                <Footer />
            </div>

            <CartDrawer 
                cart={cart}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateQuantity}
            />
        </div>
    )
}

export default Menu