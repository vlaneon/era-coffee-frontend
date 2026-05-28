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
        fetch(`${API_BASE_URL}/products/`)
            .then(r => r.json())
            .then(data => {
                const filtered = data.filter(p => p.categories?.includes(category))
                setProducts(filtered)
            })
            .catch(() => setProducts([]))
    }, [category])

    // ... (остальные методы (openModal, updateAddon, handleAddToCart, getDrinkId) остаются без изменений, как у вас) ...

    // Ниже — только JSX с безусловным отображением картинки
    return (
        <div className="relative w-full font-KyivSans">
            <div className="relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-24">
                <h2 className="text-white text-4xl lg:text-5xl sm:text-7xl font-bold mb-10 text-center uppercase">{title}</h2>

                {/* Одна сетка для всех устройств (без hidden) */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols} gap-4`}>
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-[20px] p-4 shadow-md">
                            {/* КАРТИНКА — ВСЕГДА, ЕСЛИ ЕСТЬ image_url */}
                            {product.image_url && (
                                <img 
                                    src={product.image_url} 
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-[15px] mb-3"
                                    onError={(e) => { e.target.style.display = 'none' }}
                                />
                            )}
                            <h3 className="font-bold text-xl">{product.name}</h3>
                            <p className="text-gray-500">{product.volume}</p>
                            <div className="flex justify-between items-center mt-3">
                                <span className="font-bold text-lg">{product.price}₽</span>
                                <button
                                    onClick={() => {
                                        setSelectedProduct(product)
                                        setQuantity(1)
                                    }}
                                    className="bg-[#735751] text-white px-4 py-2 rounded-full"
                                >+</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Модальное окно (оставьте как было) */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setSelectedProduct(null)}>
                    <div className="bg-white rounded-[30px] max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
                        <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-[20px] mb-4" />
                        <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                        <p className="text-gray-500">{selectedProduct.description}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="font-bold text-xl">{selectedProduct.price}₽</span>
                            <button onClick={handleAddToCart} className="bg-[#735751] text-white px-6 py-2 rounded-full">В корзину</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MenuSection