import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CartDrawer = ({ cart, onRemoveFromCart, onUpdateQuantity }) => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    
    const totalPrice = cart?.reduce((sum, item) => {
        const price = Number(item.product?.price || item.price || 0)
        const qty = Number(item.quantity || 1)
        return sum + (price * qty)
    }, 0) || 0
    
    const totalItems = cart?.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0) || 0

    const getImageUrl = (item) => {
        const image = item.product?.image || item.image || ''
        if (!image) return '/placeholder.png'
        if (image.startsWith('http')) return image
        return `http://127.0.0.1:8000${image}`
    }

    return (
        <>
            {/* Кнопка корзины */}
            <button onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-[#735751] text-white p-6 lg:p-4 rounded-full shadow-2xl hover:bg-[#8B6B61] transition-all hover:scale-110 active:scale-95">
                <span className="relative text-4xl lg:text-2xl">
                    🛒
                    {totalItems > 0 && (
                        <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xl lg:text-xs rounded-full w-7 h-7 lg:w-5 lg:h-5 flex items-center justify-center font-bold">
                            {totalItems}
                        </span>
                    )}
                </span>
            </button>

            {isOpen && <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)} />}

            {/* Панель корзины */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between items-center p-8 lg:p-6 border-b">
                    <h2 className="text-4xl lg:text-4xl font-bold text-[#735751]">Корзина</h2>
                    <button onClick={() => setIsOpen(false)} className="text-4xl lg:text-2xl text-gray-400">✕</button>
                </div>

                <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 250px)' }}>
                    {!cart || cart.length === 0 ? (
                        <div className="text-center text-gray-500 mt-20">
                            <p className="text-7xl mb-6">🛒</p>
                            <p className="text-3xl lg:text-xl">Корзина пуста</p>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <div key={item.id || index} className="flex gap-4 pb-6 mb-6 border-b">
                                <img src={getImageUrl(item)} alt={item.product?.name || item.name}
                                    className="w-24 lg:w-28 h-24 lg:h-28 object-cover rounded-xl" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-2xl lg:text-2xl text-gray-800">{item.product?.name || item.name}</h3>
                                    <p className="text-xl lg:text-xl text-gray-500 mt-1">{item.product?.price || item.price} ₽</p>
                                    {item.addons && Object.keys(item.addons).length > 0 && (
                                        <div className="text-base lg:text-xl text-gray-400 mt-1">
                                            {Object.entries(item.addons).map(([key, val]) => {
                                                if (typeof val === 'boolean' && val) return <span key={key} className="mr-2">• {key}</span>
                                                if (typeof val === 'object' && val) {
                                                    const selected = Object.entries(val).filter(([_, v]) => v > 0)
                                                    if (selected.length > 0) return <span key={key} className="mr-2">• {key}: {selected.map(([k]) => k).join(', ')}</span>
                                                }
                                                if (typeof val === 'number' && val > 0) return <span key={key} className="mr-2">• {key}: {val}</span>
                                                return null
                                            })}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 mt-3">
                                        <button onClick={() => onUpdateQuantity(item, (item.quantity || 1) - 1)}
                                            className="w-10 lg:w-10 h-10 lg:h-10 bg-gray-100 rounded-full text-2xl lg:text-sm">−</button>
                                        <span className="text-2xl lg:text-xl font-bold">{item.quantity || 1}</span>
                                        <button onClick={() => onUpdateQuantity(item, (item.quantity || 1) + 1)}
                                            className="w-10 lg:w-10 h-10 lg:h-10 bg-gray-100 rounded-full text-2xl lg:text-sm">+</button>
                                        <button onClick={() => onRemoveFromCart(item)} className="ml-auto text-red-500 text-2xl lg:text-2xl">🗑</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart && cart.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-6 border-t bg-white">
                        <div className="flex justify-between mb-6 lg:mb-4">
                            <span className="font-bold text-6xl lg:text-2xl">Итого:</span>
                            <span className="font-bold text-6xl lg:text-2xl text-[#735751]">{totalPrice} ₽</span>
                        </div>
                        {/* Промокоды и счастливые часы */}
                        <div className="bg-[#f5f0ee] rounded-[15px] p-4 mb-4">
                            <p className="text-2xl lg:text-sm text-[#735751] font-bold mb-2">🎫 Доступные скидки:</p>
                            <p className="text-xl lg:text-xs text-gray-500">🕐 Счастливые часы: 8:00-10:00 и 18:00-20:00 (−20% на напитки)</p>
                            <p className="text-xl lg:text-xs text-gray-500">🥐 Завтрак бариста: напиток + круассан (−15%)</p>
                            <p className="text-xl lg:text-xs text-gray-500">🍜 Обед: суп + напиток (−50₽)</p>
                            <p className="text-xl lg:text-xs text-gray-500 mt-2">🎟 Промокоды: ERA10 (−10%), ERA20 (−20%), VKCOFFEE (−15%), MAXCOFFEE (−15%)</p>
                            <input 
                                type="text" 
                                placeholder="Введите промокод" 
                                className="w-full mt-3 p-3 text-xl lg:text-sm border border-gray-300 rounded-[10px]"
                                onChange={(e) => localStorage.setItem('promo', e.target.value)}
                            />
                        </div>
                        <button onClick={() => { setIsOpen(false); navigate('/profile', { state: { tab: 'cart' } }) }}
                            className="w-full bg-[#735751] text-white py-5 lg:py-3 rounded-full text-4xl lg:text-xl font-bold hover:bg-[#8B6B61] transition">
                            Перейти в корзину
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default CartDrawer