import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config';

const ADDON_OPTIONS = {
    'Молоко': ['без молока', 'коровье', 'миндальное', 'овсяное'],
    'Сироп': ['ванильный', 'карамельный', 'кокосовый', 'имбирный'],
}

const MenuSection = ({ category, title, bgImage, splashImage, cols = 3, onAddToCart }) => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [selectedAddons, setSelectedAddons] = useState({})

    useEffect(() => {
        const cached = sessionStorage.getItem(`products_${category}`)
        if (cached) {
            setProducts(JSON.parse(cached))
            return
        }
        fetch(`${API_BASE_URL}/products/`)
            .then(r => r.json())
            .then(data => {
                const filtered = data.filter(p => p.categories?.includes(category))
                sessionStorage.setItem(`products_${category}`, JSON.stringify(filtered))
                setProducts(filtered)
            })
            .catch(() => setProducts([]))
    }, [category])

    useEffect(() => {
        if (selectedProduct?.addons) {
            const addons = { ...selectedProduct.addons }
            Object.keys(addons).forEach(key => {
                if (ADDON_OPTIONS[key] && typeof addons[key] === 'object' && Object.keys(addons[key]).length === 0) {
                    const filled = {}
                    ADDON_OPTIONS[key].forEach(opt => { filled[opt] = 0 })
                    if (key === 'Молоко') filled['без молока'] = 1
                    addons[key] = filled
                }
            })
            setSelectedAddons(addons)
        }
    }, [selectedProduct])

    const openModal = (product) => {
        setSelectedProduct(product)
        setQuantity(1)
    }

    const updateAddon = (addon, sub, value) => {
        setSelectedAddons(prev => {
            const updated = { ...prev }
            if (typeof updated[addon] === 'object' && !Array.isArray(updated[addon])) {
                if (ADDON_OPTIONS[addon]) {
                    const reset = {}
                    ADDON_OPTIONS[addon].forEach(opt => { reset[opt] = 0 })
                    if (addon === 'Молоко') {
                        if (sub === 'без молока') {
                            updated[addon] = { ...reset, 'без молока': 1 }
                        } else {
                            updated[addon] = { ...reset, [sub]: value > 0 ? 1 : 0 }
                            delete updated[addon]['без молока']
                        }
                    } else if (addon === 'Сироп') {
                        updated[addon] = { ...reset, [sub]: value > 0 ? 1 : 0 }
                    } else {
                        updated[addon] = { ...updated[addon], [sub]: Math.min(10, Math.max(0, value)) }
                    }
                } else {
                    updated[addon] = { ...updated[addon], [sub]: Math.min(10, Math.max(0, value)) }
                }
            } else if (typeof updated[addon] === 'boolean') {
                updated[addon] = !updated[addon]
            } else {
                updated[addon] = Math.min(10, Math.max(0, value))
            }
            return updated
        })
    }

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart({
                product: selectedProduct,
                quantity: quantity,
                addons: selectedAddons
            })
        }
        setSelectedProduct(null)
        setQuantity(1)
    }

    const getCardStyle = (index, total) => {
        const position = index % cols
        if (total === 1) return 'bg-[#735751] text-white rounded-[30px] col-span-2 flex max-w-md mx-auto'
        if (total === 2) {
            if (position === 0) return 'bg-[#735751] text-white rounded-l-[30px] rounded-r-[10px] col-span-2 flex'
            if (position === 1) return 'bg-[#E7D7C1] rounded-r-[30px] rounded-l-[10px]'
        }
        if (position === 0) return 'bg-[#735751] text-white rounded-l-[30px] rounded-r-[10px]'
        if (position === cols - 1) return 'bg-[#735751] text-white rounded-r-[30px] rounded-l-[10px]'
        return 'bg-[#E7D7C1] rounded-[10px]'
    }

    const isDark = (index, total) => {
        const position = index % cols
        if (total === 1) return true
        if (total === 2) return position === 0
        return position === 0 || position === cols - 1
    }

    const isWide = (index, total) => {
        if (total === 1) return true
        if (total === 2 && index === 0) return true
        return false
    }

    if (products.length === 0) return null

    const getDrinkId = (name) => {
        const map = {
            'Эспрессо': 'espresso', 'Лунго': 'lungo', 'Фильтр-кофе': 'filter',
            'Американо': 'americano', 'Американо на молоке': 'americano',
            'Латте': 'latte', 'Капучино': 'cappuccino', 'Флэт Уайт': 'flatwhite',
            'Раф': 'raf', 'Бамбл': 'bumble', 'Эспрессо Тоник': 'espressotonic',
            'Матча Классический': 'matchaclassic',
        }
        return map[name] || ''
    }

    return (
        <div className="relative w-full font-KyivSans">
            <div className="relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-24">
                <h2 className="text-white text-4xl lg:text-5xl sm:text-7xl font-bold mb-10 text-center uppercase">{title}</h2>

                {/* Мобильная сетка */}
                <div className="grid grid-cols-2 gap-4 lg:hidden">
                    {products.map((product, index) => (
                        <div key={product.id} className={`${getCardStyle(index, products.length)} p-5 relative flex flex-col`}>
                            <div className="flex flex-col h-full">
                                <div className="mb-4 rounded-[20px] p-4 flex items-center justify-center h-[60%] relative">
                                    <img
                                        src={`http://127.0.0.1:8000${product.image}`}
                                        loading="lazy"
                                        alt={product.name}
                                        className="w-[100%] h-[100%] object-cover rounded-[20%]"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/80 to-transparent rounded-b-[30%]" />
                                </div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className={`font-bold text-5xl ${isDark(index, products.length) ? 'text-white' : 'text-[#735751]'}`}>{product.name}</h3>
                                    <span className={`text-5xl ${isDark(index, products.length) ? 'text-[#E7D7C1]' : 'text-[#BF4342]'}`}>{product.volume}</span>
                                </div>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className={`font-bold text-5xl ${isDark(index, products.length) ? 'text-[#E7D7C1]' : 'text-[#BF4342]'}`}>{product.price}₽</span>
                                    <button
                                        aria-label={`Добавить ${product.name} в корзину`}
                                        onClick={() => openModal(product)}
                                        className={`text-7xl cursor-pointer hover:opacity-70 transition ${isDark(index, products.length) ? 'text-[#E7D7C1]' : 'text-[#BF4342]'}`}
                                    >+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Десктопная сетка */}
                <div className={`hidden lg:grid ${cols === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-4 ${cols === 3 ? 'max-w-4xl mx-auto' : ''}`}>
                    {products.map((product, index) => (
                        <div key={product.id} className={`${getCardStyle(index, products.length)} p-5 relative flex flex-col`}>
                            {isWide(index, products.length) ? (
                                <div className="flex h-full">
                                    <div className="w-1/2 mr-4 flex items-center relative">
                                        <img
                                            src={`http://127.0.0.1:8000${product.image}`}
                                            loading="lazy"
                                            alt={product.name}
                                            className="w-[80%] h-auto object-contain rounded-[20%]"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/80 to-transparent rounded-b-[20%]" />
                                    </div>
                                    <div className="w-1/2 flex flex-col justify-between">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-2xl">{product.name}</h3>
                                            <span className="text-[#E7D7C1] text-xl">{product.volume}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="font-bold text-2xl text-[#E7D7C1]">{product.price}₽</span>
                                            <button
                                                aria-label={`Добавить ${product.name} в корзину`}
                                                onClick={() => openModal(product)}
                                                className="text-5xl cursor-pointer hover:opacity-70 transition text-[#E7D7C1]"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full">
                                    <div className="mb-4 rounded-[20px] p-4 flex items-center justify-center h-[60%] relative">
                                        <img
                                            src={`http://127.0.0.1:8000${product.image}`}
                                            loading="lazy"
                                            alt={product.name}
                                            className="w-[100%] h-[100%] object-cover rounded-[20%]"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/80 to-transparent rounded-b-[30%]" />
                                    </div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className={`font-bold text-2xl ${isDark(index, products.length) ? 'text-white' : 'text-[#735751]'}`}>{product.name}</h3>
                                        <span className={`text-xl ${isDark(index, products.length) ? 'text-[#E7D7C1]' : 'text-[#BF4342]'}`}>{product.volume}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className={`font-bold text-2xl ${isDark(index, products.length) ? 'text-[#E7D7C1]' : 'text-[#BF4342]'}`}>{product.price}₽</span>
                                        <button
                                            aria-label={`Добавить ${product.name} в корзину`}
                                            onClick={() => openModal(product)}
                                            className={`text-5xl cursor-pointer hover:opacity-70 transition ${isDark(index, products.length) ? 'text-[#E7D7C1]' : 'text-[#BF4342]'}`}
                                        >+</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {splashImage && (
                <div className="flex justify-start mt-[-15%] relative z-20">
                    <img src={splashImage} loading="lazy" alt="Декоративный элемент" className="w-[60%] h-auto" />
                </div>
            )}

            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 font-KyivSans p-4" onClick={() => setSelectedProduct(null)}>
                    <div className="bg-white rounded-[30px] w-[95vw] sm:w-auto sm:max-w-3xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto animate-fade-in-up" onClick={e => e.stopPropagation()}>
                        <button
                            aria-label="Закрыть окно товара"
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 text-3xl text-[#735751] hover:text-red-500 transition"
                        >×</button>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
                            <div className="w-full sm:w-1/2 bg-[#f5f0ee] rounded-[20px] p-4 flex items-center justify-center">
                                <img src={`http://127.0.0.1:8000${selectedProduct.image}`} loading="lazy" alt={selectedProduct.name} className="w-full h-48 sm:h-96 object-cover" />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <h3 className="text-2xl lg:text-4xl sm:text-7xl font-bold text-[#735751] mb-2">{selectedProduct.name}</h3>
                                <p className="text-[#8B6B61] text-lg lg:text-3xl sm:text-5xl mb-2">{selectedProduct.description}</p>
                                {getDrinkId(selectedProduct.name) && (
                                    <button
                                        onClick={() => {
                                            const drinkId = getDrinkId(selectedProduct.name)
                                            setSelectedProduct(null)
                                            navigate('/history/drinks', { state: { scrollTo: drinkId } })
                                        }}
                                        className="text-[#8B6B61] text-sm lg:text-2xl sm:text-3xl underline hover:text-[#735751] transition mb-3"
                                    >Узнать историю напитка</button>
                                )}
                                <p className="text-3xl sm:text-5xl lg:text-4xl font-bold text-[#735751]">{selectedProduct.price}₽</p>
                            </div>
                        </div>

                        {selectedProduct.addons && Object.keys(selectedProduct.addons).length > 0 && (
                            <div className="mb-6">
                                <span className="text-5xl font-bold text-[#735751] mb-3 block">Добавки:</span>
                                <div className="space-y-3">
                                    {Object.entries(selectedAddons).map(([addon, value]) => (
                                        <div key={addon}>
                                            {typeof value === 'boolean' ? (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[#735751] text-5xl">{addon}</span>
                                                    <button
                                                        aria-label={`Добавить ${addon}`}
                                                        onClick={() => updateAddon(addon, null, null)}
                                                        className={`w-8 h-8 rounded-full text-2xl transition ${value ? 'bg-[#735751] text-white' : 'bg-[#f5f0ee] text-[#735751]'}`}
                                                    >{value ? '✓' : '+'}</button>
                                                </div>
                                            ) : typeof value === 'object' ? (
                                                <div>
                                                    <span className="text-[#735751] text-5xl font-medium block mb-2">{addon}:</span>
                                                    {ADDON_OPTIONS[addon] ? (
                                                        ADDON_OPTIONS[addon].map(sub => {
                                                            const checked = value[sub] > 0
                                                            return (
                                                                <div key={sub} className="flex items-center justify-between ml-4 mb-1">
                                                                    <span className="text-xl lg:text-2xl sm:text-4xl text-[#8B6B61]">{sub}</span>
                                                                    <button
                                                                        aria-label={`Выбрать ${sub}`}
                                                                        onClick={() => updateAddon(addon, sub, checked ? 0 : 1)}
                                                                        className={`w-8 h-8 rounded-full border-2 transition ${checked ? 'bg-[#735751] border-[#735751]' : 'border-[#8B6B61]'}`}
                                                                    >{checked && <span className="text-white">✓</span>}</button>
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        Object.entries(value).map(([sub, count]) => (
                                                            <div key={sub} className="flex items-center justify-between ml-4 mb-1">
                                                                <span className="text-xl text-[#8B6B61]">{sub}</span>
                                                                <div className="flex items-center gap-2">
                                                                    <button aria-label={`Уменьшить ${sub}`} onClick={() => updateAddon(addon, sub, count - 1)} className="w-7 h-7 bg-[#f5f0ee] rounded-full text-sm">−</button>
                                                                    <span className="w-5 text-center text-lg font-bold">{count}</span>
                                                                    <button aria-label={`Увеличить ${sub}`} onClick={() => updateAddon(addon, sub, count + 1)} className="w-7 h-7 bg-[#f5f0ee] rounded-full text-sm">+</button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[#735751] text-2xl">{addon}</span>
                                                    <div className="flex items-center gap-2">
                                                        <button aria-label={`Уменьшить ${addon}`} onClick={() => updateAddon(addon, null, value - 1)} className="w-10 h-10 bg-[#f5f0ee] rounded-full text-xl">−</button>
                                                        <span className="w-10 text-center text-xl font-bold">{value}</span>
                                                        <button aria-label={`Увеличить ${addon}`} onClick={() => updateAddon(addon, null, value + 1)} className="w-10 h-10 bg-[#f5f0ee] rounded-full text-xl">+</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-6">
                            <span className="text-2xl sm:text-5xl lg:text-4xl font-bold text-[#735751]">Количество:</span>
                            <div className="flex items-center gap-4">
                                <button aria-label="Уменьшить количество" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 bg-[#f5f0ee] rounded-full text-2xl">−</button>
                                <span className="text-xl sm:text-5xl lg:text-2xl font-bold">{quantity}</span>
                                <button aria-label="Увеличить количество" onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 bg-[#f5f0ee] rounded-full text-2xl">+</button>
                            </div>
                        </div>

                        <button onClick={handleAddToCart} className="w-full bg-[#735751] text-white py-3 rounded-[15px] text-xl font-bold hover:bg-[#8B6B61] transition">
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default React.memo(MenuSection)