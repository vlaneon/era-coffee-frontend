import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'
import LoyaltyCard from './LoyaltyCard'
import overlayImg from '../img/overlay.svg'
import { Helmet } from 'react-helmet-async'
import { API_BASE_URL } from '../config'   // ← импортируем базовый URL

const Profile = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [userData, setUserData] = useState(null)
    const [cartItems, setCartItems] = useState([])
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('profile')
    const [showOrderModal, setShowOrderModal] = useState(false)
    const [promo, setPromo] = useState('')
    const [selectedAddress, setSelectedAddress] = useState('')
    const [selectedPayment, setSelectedPayment] = useState('')
    const [orderStatus, setOrderStatus] = useState(null)
    const [freeItems, setFreeItems] = useState([])
    const [loyaltyCard, setLoyaltyCard] = useState(null)
    const [expandedOrder, setExpandedOrder] = useState(null)
    const token = localStorage.getItem('token')

    const [editMode, setEditMode] = useState(false)
    const [editData, setEditData] = useState({
        first_name: '',
        username: '',
        email: '',
        phone: '',
        address: ''
    })
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    })
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [passwordSuccess, setPasswordSuccess] = useState('')

    // ---------- адреса кофеен ----------
    const addresses = [
        'АЦ "Sky City" — АЛЕУТСКАЯ 45',
        'Енисейская — ул.Енисейская, 23Д,К2',
        'Офис Сбербанк — ул.ФОНТАННАЯ, 18',
    ]

    // ---------- бесплатные напитки ----------
    const maxFree = Math.floor((loyaltyCard?.stamps || 0) / 10)
    const freeCount = freeItems.length

    // ---------- базовая стоимость без учёта бесплатных ----------
    const totalWithoutFree = cartItems.reduce((sum, item) => sum + Number(item.total_price), 0)
    const freeDiscount = freeItems.reduce((sum, f) => {
        const item = cartItems.find(i => i.id === f.itemId)
        return sum + (item ? Number(item.product.price) : 0)
    }, 0)
    const totalWithFree = totalWithoutFree - freeDiscount

    // ---------- счастливые часы ----------
    const now = new Date()
    const hour = now.getHours()
    const isHappyHour = (hour >= 8 && hour < 10) || (hour >= 18 && hour < 20)
    const happyDiscount = isHappyHour
        ? cartItems.reduce((sum, item) => {
            const cats = item.product?.categories || []
            if (cats.includes('classic') || cats.includes('ice') || cats.includes('matcha') || cats.includes('author')) {
                return sum + Number(item.total_price)
            }
            return sum
        }, 0) * 0.2
        : 0

    // ---------- комбо «Завтрак бариста» ----------
    const hasDrink = cartItems.some(item => {
        const cats = item.product?.categories || []
        return cats.includes('classic') || cats.includes('ice') || cats.includes('matcha') || cats.includes('author')
    })
    const hasCroissant = cartItems.some(item =>
        item.product?.name?.toLowerCase().includes('круассан')
    )
    const drinkItems = cartItems.filter(i => {
        const cats = i.product?.categories || []
        return cats.includes('classic') || cats.includes('ice') || cats.includes('matcha') || cats.includes('author')
    })
    const comboDiscount = (hasDrink && hasCroissant && drinkItems.length > 0)
        ? Math.min(...drinkItems.map(i => Number(i.total_price))) * 0.15
        : 0

    // ---------- комбо «Обед» ----------
    const hasSoup = cartItems.some(item =>
        item.product?.name?.toLowerCase().includes('суп') ||
        item.product?.name?.toLowerCase().includes('удон') ||
        item.product?.name?.toLowerCase().includes('соба')
    )
    const soupDiscount = (hasDrink && hasSoup) ? 50 : 0

    // ---------- промокод ----------
    const promoDiscount = promo === 'ERA10' ? totalWithFree * 0.1 :
                          promo === 'ERA20' ? totalWithFree * 0.2 :
                          promo === 'VKCOFFEE' || promo === 'MAXCOFFEE' ? totalWithFree * 0.15 : 0

    // ---------- итоговая скидка ----------
    const allDiscounts = happyDiscount + comboDiscount + soupDiscount + promoDiscount
    const finalTotal = totalWithFree - allDiscounts

    // ---------- активные скидки для отображения ----------
    const activeDiscounts = []
    if (happyDiscount > 0) activeDiscounts.push(`🕐 Счастливые часы: −${Math.round(happyDiscount)} ₽`)
    if (comboDiscount > 0) activeDiscounts.push(`🥐 Комбо Завтрак: −${Math.round(comboDiscount)} ₽`)
    if (soupDiscount > 0) activeDiscounts.push(`🍜 Комбо Обед: −${soupDiscount} ₽`)
    if (promoDiscount > 0) activeDiscounts.push(`🎫 Промокод ${promo}: −${Math.round(promoDiscount)} ₽`)

    // ---------- универсальная функция для запросов с токеном ----------
    const authFetch = async (endpoint, options = {}) => {
        const url = `${API_BASE_URL}${endpoint}`
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
                ...options.headers,
            },
        })
        return response
    }

    // ---------- запросы к API ----------
    useEffect(() => {
        if (!token) { navigate('/login'); return }
        fetchProfile()
        fetchCart()
        fetchOrders()
        fetchLoyalty()
    }, [token])

    useEffect(() => {
        if (!token) { navigate('/login'); return }
        if (location.state?.tab) setActiveTab(location.state.tab)
        fetchProfile()
        fetchCart()
        fetchOrders()
        fetchLoyalty()
    }, [token, location])

    const fetchProfile = async () => {
        try {
            const r = await authFetch('/profile/')
            if (r.ok) {
                const data = await r.json()
                setUserData(data)
                setEditData({
                    first_name: data.first_name || '',
                    username: data.username || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    address: data.address || ''
                })
            }
        } catch (err) { console.error(err) }
    }

    const fetchCart = async () => {
        try {
            const r = await authFetch('/cart/')
            if (r.ok) setCartItems(await r.json())
        } catch (err) { console.error(err) }
        finally { setIsLoading(false) }
    }

    const fetchOrders = async () => {
        try {
            const r = await authFetch('/orders/history/')
            if (r.ok) setOrders(await r.json())
        } catch (err) { console.error(err) }
    }

    const fetchLoyalty = async () => {
        try {
            const r = await authFetch('/loyalty/')
            if (r.ok) setLoyaltyCard(await r.json())
        } catch (err) { console.error(err) }
    }

    const updateCartItem = async (itemId, quantity) => {
        try {
            await authFetch(`/cart/${itemId}/`, {
                method: 'PUT',
                body: JSON.stringify({ quantity })
            })
            fetchCart()
        } catch (err) { console.error(err) }
    }

    const removeFromCart = async (itemId) => {
        try {
            await authFetch(`/cart/${itemId}/`, { method: 'DELETE' })
            fetchCart()
            setFreeItems(prev => prev.filter(f => f.itemId !== itemId))
        } catch (err) { console.error(err) }
    }

    const toggleFreeItem = (itemId) => {
        if (freeItems.some(f => f.itemId === itemId)) {
            setFreeItems(prev => prev.filter(f => f.itemId !== itemId))
        } else if (freeCount < maxFree) {
            setFreeItems(prev => [...prev, { itemId, qty: 1 }])
        }
    }

    const createOrder = async () => {
        if (!selectedAddress || !selectedPayment) {
            alert('Выберите адрес и способ оплаты')
            return
        }
        try {
            const r = await authFetch('/orders/create/', {
                method: 'POST',
                body: JSON.stringify({
                    address: selectedAddress,
                    payment: selectedPayment,
                    promo,
                    free_items: freeItems
                })
            })
            const data = await r.json()
            if (r.ok) {
                setOrderStatus(data)
                setShowOrderModal(true)
                setFreeItems([])
                fetchCart()
                fetchOrders()
                fetchLoyalty()
            } else {
                alert(data.error || 'Ошибка при создании заказа')
            }
        } catch (err) {
            alert('Ошибка соединения')
        }
    }

    const saveProfile = async () => {
        try {
            const r = await authFetch('/profile/', {
                method: 'PUT',
                body: JSON.stringify(editData)
            })
            if (r.ok) {
                const updated = await r.json()
                setUserData(updated)
                setEditMode(false)
                localStorage.setItem('userName', updated.first_name || updated.username)
            } else {
                alert('Ошибка сохранения')
            }
        } catch (err) {
            alert('Ошибка соединения')
        }
    }

    const changePassword = async () => {
        if (passwordData.new_password !== passwordData.confirm_password) {
            setPasswordError('Пароли не совпадают')
            return
        }
        try {
            const r = await authFetch('/profile/change-password/', {
                method: 'POST',
                body: JSON.stringify(passwordData)
            })
            if (r.ok) {
                setPasswordSuccess('Пароль успешно изменён')
                setPasswordError('')
                setTimeout(() => setShowPasswordModal(false), 1500)
            } else {
                const err = await r.json()
                setPasswordError(err.error || 'Ошибка')
            }
        } catch (err) {
            setPasswordError('Ошибка соединения')
        }
    }

    const formatAddons = (addons) => {
        if (!addons || Object.keys(addons).length === 0) return null
        return (
            <div className='text-2xl lg:text-xs text-gray-400 mt-2 flex flex-wrap gap-x-4 gap-y-2'>
                {Object.entries(addons).map(([key, val]) => {
                    if (typeof val === 'boolean' && val) return <span key={key}>• {key}</span>
                    if (typeof val === 'object' && val !== null) {
                        const selected = Object.entries(val).filter(([_, v]) => v > 0)
                        if (selected.length > 0) return <span key={key}>• {key}: {selected.map(([k, v]) => `${k}${v > 1 ? `×${v}` : ''}`).join(', ')}</span>
                    }
                    if (typeof val === 'number' && val > 0) return <span key={key}>• {key}: {val} порц.</span>
                    return null
                })}
            </div>
        )
    }

    // ---------- заглушка загрузки ----------
    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f0ee]">
            <div className="text-5xl lg:text-2xl text-[#735751] font-BonaNova">Загрузка...</div>
        </div>
    )

    // ====================== ОСНОВНОЙ РЕНДЕР ======================
    return (
        <div className='relative min-h-screen font-BonaNova overflow-hidden'
            style={{ background: 'linear-gradient(135deg, #735751 0%, #8B6B61 50%, #E7D7C1 100%)' }}
        >
            <Helmet>
                <title>Личный кабинет | ERA Coffee</title>
                <meta name="description" content="Управляйте заказами, корзиной, картой лояльности и личными данными в кофейне ERA Coffee." />
            </Helmet>

            {/* Оверлей */}
            <img 
                src={overlayImg} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" 
            />

            {/* Декоративные размытые круги */}
            <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />

            <div className="relative z-10 p-4 lg:p-4">
                <Header />

                <div className='max-w-4xl mx-auto mt-40 lg:mt-28'>
                    <h1 className="text-white text-6xl lg:text-4xl font-bold mb-6 lg:mb-8 drop-shadow-lg text-center lg:text-left">
                        ЛИЧНЫЙ КАБИНЕТ
                    </h1>
                    {/* Вкладки */}
                    <div className='flex gap-3 lg:gap-4 mb-8 lg:mb-6 overflow-x-auto pb-2'>
                        {['profile', 'cart', 'orders'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 lg:py-2 rounded-[15px] text-3xl lg:text-lg font-bold whitespace-nowrap transition flex-shrink-0 backdrop-blur-md shadow-lg ${
                                    activeTab === tab
                                        ? 'bg-[#af8d86]/70 text-white border border-white/20'
                                        : 'bg-white/50 text-[#735751] hover:bg-white/70 border border-white/30'
                                }`}
                            >
                                {tab === 'profile' ? '👤 Профиль' : tab === 'cart' ? `🛒 Корзина (${cartItems.length})` : '📋 История'}
                            </button>
                        ))}
                    </div>

                    <LoyaltyCard />

                    <AnimatePresence mode="wait">
                        {/* ---------- Профиль ---------- */}
                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className='bg-white rounded-[30px] p-8 lg:p-8 shadow-lg mt-6'
                            >
                                <h2 className='text-5xl lg:text-3xl font-bold text-[#735751] mb-8'>Личные данные</h2>
                                {editMode ? (
                                    <div className='space-y-6'>
                                        <div>
                                            <label className='text-gray-400 text-2xl lg:text-sm'>Имя</label>
                                            <input value={editData.first_name} onChange={e => setEditData({...editData, first_name: e.target.value})}
                                                className='w-full p-4 text-2xl lg:text-base bg-[#f5f0ee] rounded-[15px] border-0' />
                                        </div>
                                        <div>
                                            <label className='text-gray-400 text-2xl lg:text-sm'>Логин</label>
                                            <input value={editData.username} onChange={e => setEditData({...editData, username: e.target.value})}
                                                className='w-full p-4 text-2xl lg:text-base bg-[#f5f0ee] rounded-[15px] border-0' />
                                        </div>
                                        <div>
                                            <label className='text-gray-400 text-2xl lg:text-sm'>Email</label>
                                            <input value={editData.email} onChange={e => setEditData({...editData, email: e.target.value})}
                                                className='w-full p-4 text-2xl lg:text-base bg-[#f5f0ee] rounded-[15px] border-0' />
                                        </div>
                                        <div>
                                            <label className='text-gray-400 text-2xl lg:text-sm'>Телефон</label>
                                            <input value={editData.phone} onChange={e => setEditData({...editData, phone: e.target.value})}
                                                className='w-full p-4 text-2xl lg:text-base bg-[#f5f0ee] rounded-[15px] border-0' />
                                        </div>
                                        <div>
                                            <label className='text-gray-400 text-2xl lg:text-sm'>Адрес</label>
                                            <input value={editData.address} onChange={e => setEditData({...editData, address: e.target.value})}
                                                className='w-full p-4 text-2xl lg:text-base bg-[#f5f0ee] rounded-[15px] border-0' />
                                        </div>
                                        <div className='flex gap-4'>
                                            <button onClick={saveProfile} className='bg-[#735751] text-white px-8 py-4 rounded-[15px] text-2xl font-bold'>Сохранить</button>
                                            <button onClick={() => setEditMode(false)} className='bg-gray-300 text-[#735751] px-8 py-4 rounded-[15px] text-2xl font-bold'>Отмена</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='space-y-6'>
                                        <div className='bg-[#f5f0ee] p-6 rounded-[20px]'>
                                            <label className='text-gray-400 text-2xl lg:text-sm'>Имя</label>
                                            <p className='text-4xl lg:text-lg text-[#735751] font-bold mt-2'>{userData?.first_name || 'Не указано'}</p>
                                        </div>
                                        <div className='bg-[#f5f0ee] p-6 rounded-[20px]'>
                                            <label className='text-gray-400 text-2xl lg:text-sm'>Логин</label>
                                            <p className='text-4xl lg:text-lg text-[#735751] font-bold mt-2'>{userData?.username}</p>
                                        </div>
                                        <div className='bg-[#f5f0ee] p-6 rounded-[20px]'>
                                            <label className='text-gray-400 text-2xl lg:text-sm'>Email</label>
                                            <p className='text-4xl lg:text-lg text-[#735751] font-bold mt-2'>{userData?.email}</p>
                                        </div>
                                        {userData?.phone && (
                                            <div className='bg-[#f5f0ee] p-6 rounded-[20px]'>
                                                <label className='text-gray-400 text-2xl lg:text-sm'>Телефон</label>
                                                <p className='text-4xl lg:text-lg text-[#735751] font-bold mt-2'>{userData.phone}</p>
                                            </div>
                                        )}
                                        {userData?.address && (
                                            <div className='bg-[#f5f0ee] p-6 rounded-[20px]'>
                                                <label className='text-gray-400 text-2xl lg:text-sm'>Адрес</label>
                                                <p className='text-4xl lg:text-lg text-[#735751] font-bold mt-2'>{userData.address}</p>
                                            </div>
                                        )}
                                        <button onClick={() => setEditMode(true)} className='bg-[#735751] text-white px-8 py-4 rounded-[15px] text-2xl font-bold'>Редактировать</button>
                                    </div>
                                )}

                                <div className='flex gap-4 mt-6'>
                                    <button onClick={() => setShowPasswordModal(true)} className='bg-white border-2 border-[#735751] text-[#735751] px-6 py-3 rounded-[15px] text-2xl font-bold'>
                                        🔒 Изменить пароль
                                    </button>
                                    <button onClick={() => navigate('/forgot-password')} className='text-[#735751] underline text-2xl'>
                                        Забыли пароль?
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* ---------- Корзина ---------- */}
                        {activeTab === 'cart' && (
                            <motion.div
                                key="cart"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className='bg-white rounded-[30px] p-8 lg:p-8 shadow-lg mt-6'
                            >
                                <h2 className='text-5xl lg:text-3xl font-bold text-[#735751] mb-8'>Корзина</h2>
                                {loyaltyCard?.free_available && (
                                    <div className="bg-green-50 border border-green-200 rounded-[15px] p-4 mb-6 text-center">
                                        <p className="text-green-700 text-2xl lg:text-base font-bold">
                                            🎉 Доступно бесплатных напитков: {maxFree}
                                        </p>
                                    </div>
                                )}
                                {cartItems.length === 0 ? (
                                    <div className='text-center py-12'>
                                        <p className='text-7xl mb-4'>🛒</p>
                                        <p className='text-3xl lg:text-lg text-gray-500'>Корзина пуста</p>
                                        <button onClick={() => navigate('/menu')} className='mt-6 bg-[#735751] text-white px-8 py-4 rounded-[15px] text-2xl font-bold'>
                                            Перейти в меню
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {cartItems.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className='bg-[#f5f0ee] rounded-[20px] p-6 mb-4'
                                            >
                                                <div className='flex justify-between items-start mb-4'>
                                                    <h3 className='text-4xl lg:text-2xl font-bold text-[#735751] flex-1'>{item.product.name}</h3>
                                                    <button onClick={() => removeFromCart(item.id)} className='text-red-400 hover:text-red-600 text-3xl ml-4'>✕</button>
                                                </div>
                                                {formatAddons(item.addons)}
                                                <div className='flex items-center justify-between mt-4'>
                                                    <p className='text-3xl lg:text-xl font-bold text-[#735751]'>{item.total_price} ₽</p>
                                                    <div className='flex items-center gap-4'>
                                                        <button onClick={() => updateCartItem(item.id, item.quantity - 1)} className='w-14 h-14 bg-white rounded-full text-4xl font-bold shadow'>−</button>
                                                        <span className='text-3xl lg:text-xl font-bold w-12 text-center'>{item.quantity}</span>
                                                        <button onClick={() => updateCartItem(item.id, item.quantity + 1)} className='w-14 h-14 bg-white rounded-full text-4xl font-bold shadow'>+</button>
                                                    </div>
                                                </div>
                                                {maxFree > 0 && item.product?.categories?.some(c => ['classic', 'ice', 'matcha', 'author'].includes(c)) && (
                                                    <button
                                                        onClick={() => toggleFreeItem(item.id)}
                                                        disabled={!freeItems.some(f => f.itemId === item.id) && freeCount >= maxFree}
                                                        className={`mt-3 w-full py-3 rounded-full text-2xl lg:text-lg font-bold transition ${
                                                            freeItems.some(f => f.itemId === item.id)
                                                                ? 'bg-green-500 text-white'
                                                                : freeCount >= maxFree
                                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                                    : 'bg-white text-green-600 border-2 border-green-500'
                                                        }`}
                                                    >
                                                        {freeItems.some(f => f.itemId === item.id) ? '✅ Выбран бесплатным' : '🎁 Сделать бесплатным'}
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}

                                        {activeDiscounts.length > 0 && (
                                            <div className="bg-green-50 rounded-[15px] p-4 mb-4">
                                                {activeDiscounts.map((d, i) => (
                                                    <p key={i} className="text-green-700 text-2xl lg:text-base">{d}</p>
                                                ))}
                                            </div>
                                        )}

                                        <div className="bg-[#f5f0ee] rounded-[15px] p-6 mb-6">
                                            <p className="text-3xl lg:text-base text-[#735751] font-bold mb-3">🎫 Доступные акции и скидки:</p>
                                            <div className="space-y-2">
                                                <p className="text-2xl lg:text-sm text-gray-600">🕐 <span className="font-bold">Счастливые часы:</span> 8:00–10:00 и 18:00–20:00 — скидка 20% на все напитки</p>
                                                <p className="text-2xl lg:text-sm text-gray-600">🥐 <span className="font-bold">Завтрак бариста:</span> напиток + круассан — скидка 15%</p>
                                                <p className="text-2xl lg:text-sm text-gray-600">🍜 <span className="font-bold">Обед:</span> удон + напиток — скидка 50₽</p>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-300">
                                                <p className="text-2xl lg:text-sm text-[#735751] font-bold mb-3">🎟 Промокод:</p>
                                                <input
                                                    type='text'
                                                    value={promo}
                                                    onChange={e => setPromo(e.target.value)}
                                                    placeholder='Введите промокод'
                                                    className='w-full p-5 lg:p-3 text-2xl lg:text-base bg-white border-2 border-gray-200 rounded-[15px]'
                                                />
                                                <p className='text-xl lg:text-xs text-gray-400 mt-2'>ERA10 (−10%), ERA20 (−20%), VKCOFFEE (−15%), MAXCOFFEE (−15%)</p>
                                            </div>
                                        </div>

                                        <div className='bg-[#735751] rounded-[20px] p-6 text-white mb-6'>
                                            <p className='text-3xl lg:text-lg opacity-70'>Итого к оплате</p>
                                            <p className='text-5xl lg:text-3xl font-bold mt-2'>{Math.max(0, Math.round(finalTotal))} ₽</p>
                                            {freeCount > 0 && (
                                                <p className='text-2xl lg:text-sm opacity-70 mt-2'>🎁 Бесплатных напитков: {freeCount} (−{freeDiscount} ₽)</p>
                                            )}
                                        </div>

                                        <div className='space-y-6 mb-6'>
                                            <div>
                                                <label className='block text-[#735751] font-bold text-3xl lg:text-base mb-3'>📍 Адрес кофейни</label>
                                                <select value={selectedAddress} onChange={e => setSelectedAddress(e.target.value)}
                                                    className='w-full p-5 lg:p-3 text-2xl lg:text-base bg-[#f5f0ee] border-0 rounded-[15px]'>
                                                    <option value=''>Выберите адрес</option>
                                                    {addresses.map(a => <option key={a} value={a}>{a}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className='block text-[#735751] font-bold text-3xl lg:text-base mb-3'>💳 Способ оплаты</label>
                                                <select value={selectedPayment} onChange={e => setSelectedPayment(e.target.value)}
                                                    className='w-full p-5 lg:p-3 text-2xl lg:text-base bg-[#f5f0ee] border-0 rounded-[15px]'>
                                                    <option value=''>Выберите способ</option>
                                                    <option value='card'>Картой онлайн</option>
                                                    <option value='cash'>Наличными при получении</option>
                                                    <option value='sbp'>СБП</option>
                                                </select>
                                            </div>
                                        </div>

                                        <button onClick={createOrder} className='w-full bg-[#735751] text-white py-6 lg:py-3 rounded-[20px] text-4xl lg:text-xl font-bold hover:bg-[#8B6B61] transition shadow-lg'>
                                            Оформить заказ ✨
                                        </button>
                                    </>
                                )}
                            </motion.div>
                        )}

                        {/* ---------- История заказов ---------- */}
                        {activeTab === 'orders' && (
                            <motion.div
                                key="orders"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className='bg-white rounded-[30px] p-8 lg:p-8 shadow-lg mt-6'
                            >
                                <h2 className='text-5xl lg:text-3xl font-bold text-[#735751] mb-8'>История заказов</h2>
                                {orders.length === 0 ? (
                                    <p className='text-3xl lg:text-2xl text-gray-500 text-center py-12'>Нет заказов</p>
                                ) : (
                                    orders.map((order, index) => (
                                        <motion.div
                                            key={order.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className='bg-[#f5f0ee] rounded-[20px] p-6 mb-4'
                                        >
                                            <div className='flex justify-between items-start mb-3 cursor-pointer'
                                                 onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                                                <div>
                                                    <p className='font-bold text-4xl lg:text-2xl text-[#735751]'>Заказ #{order.id}</p>
                                                    <p className='text-2xl lg:text-xl text-gray-400 mt-1'>{order.created_at}</p>
                                                </div>
                                                <div className='text-right'>
                                                    <p className='font-bold text-4xl lg:text-2xl text-[#735751]'>{order.total} ₽</p>
                                                    <span className={`text-2xl lg:text-xl px-4 py-2 rounded-full inline-block ${
                                                        order.status_code === 'accepted' ? 'bg-yellow-100 text-yellow-800' :
                                                        order.status_code === 'preparing' ? 'bg-blue-100 text-blue-800' :
                                                        order.status_code === 'ready' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>{order.status}</span>
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {expandedOrder === order.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className='border-t border-gray-200 pt-4 mt-4 overflow-hidden'
                                                    >
                                                        {order.items?.map((item, i) => (
                                                            <div key={i} className='flex justify-between text-2xl lg:text-base py-2'>
                                                                <span>{item.name} ×{item.quantity}</span>
                                                                <span className='font-bold'>{item.total} ₽</span>
                                                            </div>
                                                        ))}
                                                        {order.discounts?.map((d, i) => (
                                                            <p key={i} className='text-green-600 text-2xl lg:text-xl mt-2'>{d}</p>
                                                        ))}
                                                        {order.promo && order.promo !== 'Не применялся' && (
                                                            <p className='text-green-600 text-2xl lg:text-xl mt-2'>🎫 Промокод: {order.promo}</p>
                                                        )}
                                                        <p className='text-gray-400 text-xl lg:text-sm mt-2'>💳 {order.payment}</p>
                                                        <p className='text-gray-400 text-xl lg:text-sm'>📍 {order.address}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    ))
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ---------- Модалка заказа ---------- */}
                <AnimatePresence>
                    {showOrderModal && orderStatus && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                            onClick={() => setShowOrderModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-white rounded-[40px] max-w-md w-full p-10 text-center"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="text-8xl mb-6">✅</div>
                                <h3 className="text-5xl lg:text-2xl font-bold text-[#735751] mb-4">Заказ принят!</h3>
                                <p className="text-3xl lg:text-base text-gray-500 mb-2">Номер заказа: <span className='font-bold text-[#735751]'>#{orderStatus.order_id}</span></p>
                                <p className="text-3xl lg:text-base text-gray-500 mb-2">Сумма: <span className='font-bold text-[#735751]'>{orderStatus.total} ₽</span></p>
                                <p className="text-3xl lg:text-base text-gray-500 mb-6">Статус: {orderStatus.status}</p>
                                <p className="text-2xl lg:text-sm text-gray-400 mb-6">⏱ Ожидайте готовности ~15 минут</p>
                                <button onClick={() => setShowOrderModal(false)} className="w-full bg-[#735751] text-white px-8 py-4 rounded-[20px] text-3xl lg:text-lg font-bold hover:bg-[#8B6B61] transition">
                                    Хорошо 👍
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ---------- Модалка смены пароля ---------- */}
                <AnimatePresence>
                    {showPasswordModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                            onClick={() => setShowPasswordModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="bg-white rounded-[40px] max-w-md w-full p-10 text-center"
                                onClick={e => e.stopPropagation()}
                            >
                                <h3 className="text-4xl font-bold text-[#735751] mb-6">Смена пароля</h3>
                                <input type="password" placeholder="Старый пароль" value={passwordData.old_password}
                                    onChange={e => setPasswordData({...passwordData, old_password: e.target.value})}
                                    className="w-full p-4 text-2xl bg-[#f5f0ee] rounded-[15px] mb-4" />
                                <input type="password" placeholder="Новый пароль" value={passwordData.new_password}
                                    onChange={e => setPasswordData({...passwordData, new_password: e.target.value})}
                                    className="w-full p-4 text-2xl bg-[#f5f0ee] rounded-[15px] mb-4" />
                                <input type="password" placeholder="Подтвердите пароль" value={passwordData.confirm_password}
                                    onChange={e => setPasswordData({...passwordData, confirm_password: e.target.value})}
                                    className="w-full p-4 text-2xl bg-[#f5f0ee] rounded-[15px] mb-4" />
                                {passwordError && <p className="text-red-500 text-xl mb-4">{passwordError}</p>}
                                {passwordSuccess && <p className="text-green-500 text-xl mb-4">{passwordSuccess}</p>}
                                <button onClick={changePassword} className="w-full bg-[#735751] text-white py-4 rounded-[15px] text-2xl font-bold">Сменить пароль</button>
                                <button onClick={() => setShowPasswordModal(false)} className="mt-4 text-gray-400 text-xl">Отмена</button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Profile