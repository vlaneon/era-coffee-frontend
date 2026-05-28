import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config';

const ADDON_OPTIONS = {
    'Молоко': ['без молока', 'коровье', 'миндальное', 'овсяное'],
    'Сироп': ['ванильный', 'карамельный', 'кокосовый', 'имбирный'],
}

const MenuSection = ({ category, title, cols = 3, onAddToCart }) => {
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

    if (products.length === 0) return null

    return (
        <div className="relative w-full font-KyivSans">
            <div className="relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-24">
                <h2 className="text-white text-4xl lg:text-5xl sm:text-7xl font-bold mb-10 text-center uppercase">{title}</h2>

                {/* Упрощённая сетка для всех устройств — картинки гарантированно будут видны */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-[20px] p-4 shadow-md flex flex-col">
                            {product.image_url && (
                                <img 
                                    src={product.image_url} 
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-[15px] mb-3"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            )}
                            <h3 className="font-bold text-xl">{product.name}</h3>
                            <p className="text-gray-500 text-sm">{product.volume}</p>
                            <div className="flex justify-between items-center mt-3">
                                <span className="font-bold text-lg">{product.price}₽</span>
                                <button
                                    onClick={() => openModal(product)}
                                    className="bg-[#735751] text-white px-4 py-2 rounded-full"
                                >+</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Модальное окно (оставлено как в оригинале, только исправлен src картинки) */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 font-KyivSans p-4" onClick={() => setSelectedProduct(null)}>
                    <div className="bg-white rounded-[30px] w-[95vw] sm:w-auto sm:max-w-3xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto animate-fade-in-up" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-3xl text-[#735751] hover:text-red-500 transition">×</button>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
                            <div className="w-full sm:w-1/2 bg-[#f5f0ee] rounded-[20px] p-4 flex items-center justify-center">
                                <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-48 sm:h-96 object-cover" />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <h3 className="text-2xl lg:text-4xl sm:text-7xl font-bold text-[#735751] mb-2">{selectedProduct.name}</h3>
                                <p className="text-[#8B6B61] text-lg lg:text-3xl sm:text-5xl mb-2">{selectedProduct.description}</p>
                                {getDrinkId(selectedProduct.name) && (
                                    <button onClick={() => {
                                        const drinkId = getDrinkId(selectedProduct.name)
                                        setSelectedProduct(null)
                                        navigate('/history/drinks', { state: { scrollTo: drinkId } })
                                    }} className="text-[#8B6B61] text-sm lg:text-2xl sm:text-3xl underline hover:text-[#735751] transition mb-3">Узнать историю напитка</button>
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
                                                    <button onClick={() => updateAddon(addon, null, null)} className={`w-8 h-8 rounded-full text-2xl transition ${value ? 'bg-[#735751] text-white' : 'bg-[#f5f0ee] text-[#735751]'}`}>{value ? '✓' : '+'}</button>
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
                                                                    <button onClick={() => updateAddon(addon, sub, checked ? 0 : 1)} className={`w-8 h-8 rounded-full border-2 transition ${checked ? 'bg-[#735751] border-[#735751]' : 'border-[#8B6B61]'}`}>{checked && <span className="text-white">✓</span>}</button>
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        Object.entries(value).map(([sub, count]) => (
                                                            <div key={sub} className="flex items-center justify-between ml-4 mb-1">
                                                                <span className="text-xl text-[#8B6B61]">{sub}</span>
                                                                <div className="flex items-center gap-2">
                                                                    <button onClick={() => updateAddon(addon, sub, count - 1)} className="w-7 h-7 bg-[#f5f0ee] rounded-full text-sm">−</button>
                                                                    <span className="w-5 text-center text-lg font-bold">{count}</span>
                                                                    <button onClick={() => updateAddon(addon, sub, count + 1)} className="w-7 h-7 bg-[#f5f0ee] rounded-full text-sm">+</button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[#735751] text-2xl">{addon}</span>
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => updateAddon(addon, null, value - 1)} className="w-10 h-10 bg-[#f5f0ee] rounded-full text-xl">−</button>
                                                        <span className="w-10 text-center text-xl font-bold">{value}</span>
                                                        <button onClick={() => updateAddon(addon, null, value + 1)} className="w-10 h-10 bg-[#f5f0ee] rounded-full text-xl">+</button>
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
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 bg-[#f5f0ee] rounded-full text-2xl">−</button>
                                <span className="text-xl sm:text-5xl lg:text-2xl font-bold">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 bg-[#f5f0ee] rounded-full text-2xl">+</button>
                            </div>
                        </div>

                        <button onClick={handleAddToCart} className="w-full bg-[#735751] text-white py-3 rounded-[15px] text-xl font-bold hover:bg-[#8B6B61] transition">Добавить в корзину</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default React.memo(MenuSection)