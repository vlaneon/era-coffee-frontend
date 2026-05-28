import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config'

const LoyaltyCard = () => {
    const [card, setCard] = useState(null)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) return
        fetch(`${API_BASE_URL}/loyalty/`, { 
            headers: { 'Authorization': `Token ${token}` }
        })
        .then(r => r.json())
        .then(data => setCard(data))
    }, [token])

    if (!token || !card) return null

    const progress = Math.min((card.stamps / 10) * 100, 100)

    return (
        <div className="bg-white rounded-[30px] lg:rounded-[20px] p-8 lg:p-6 shadow-lg font-KyivSans mb-5">
            <h3 className="text-[#735751] text-4xl lg:text-3xl font-bold mb-4 lg:mb-2">Карта лояльности</h3>
            <p className="text-gray-500 text-2xl lg:text-2xl mb-6 lg:mb-4">Собери 10 печатей — получи напиток бесплатно!</p>
            
            {/* Печати */}
            <div className="flex gap-3 lg:gap-2 mb-6 lg:mb-4 flex-wrap">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-14 lg:w-12 h-14 lg:h-12 rounded-full flex items-center justify-center text-2xl lg:text-sm font-bold ${
                        i < card.stamps % 10 
                            ? 'bg-[#735751] text-white' 
                            : 'bg-[#f5f0ee] text-[#A78A7F]'
                    }`}>
                        {i < card.stamps % 10 ? '☕' : '○'}
                    </div>
                ))}
            </div>

            {/* Прогресс-бар */}
            <div className="w-full bg-[#f5f0ee] rounded-full h-4 lg:h-3 mb-4 lg:mb-2">
                <div 
                    className="bg-[#735751] h-4 lg:h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-2xl lg:text-2xl text-[#A78A7F]">
                {card.free_available 
                    ? '🎉 У вас есть бесплатный напиток!' 
                    : `Осталось ${card.next_reward} до бесплатного напитка`
                }
            </p>
            <p className="text-xl lg:text-xl text-gray-400 mt-3 lg:mt-2">Всего заказов: {card.total_orders}</p>
        </div>
    )
}

export default LoyaltyCard