import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import historyBg2 from '../img/overlay.svg'
import historyBg from '../img/coffee.webp'
import cup from '../img/cup.webp'

const coffeeTypes = [
    { name: 'Арабика', latin: 'Coffea arabica', description: 'Королева кофе. Самый популярный сорт, занимающий 70% мирового производства.', popularity: '70%', origin: 'Эфиопия, Колумбия', taste: 'Фруктовый' },
    { name: 'Робуста', latin: 'Coffea canephora', description: 'Крепкий и выносливый сорт. В 2 раза больше кофеина чем арабика.', popularity: '30%', origin: 'Вьетнам, Бразилия', taste: 'Горький' },
    { name: 'Либерика', latin: 'Coffea liberica', description: 'Редкий гигант. Вкус с дымными и цветочными нотами.', popularity: '<1%', origin: 'Африка', taste: 'Дымный' },
    { name: 'Типика', latin: 'Typica', description: 'Прародитель сортов. Чистый, сладкий вкус.', popularity: 'Основа', origin: 'Эфиопия', taste: 'Сладкий' },
    { name: 'Бурбон', latin: 'Bourbon', description: 'Сладкий, комплексный. Ноты карамели.', popularity: 'Широко', origin: 'Реюньон', taste: 'Карамель' },
    { name: 'Катурра', latin: 'Caturra', description: 'Цитрусовая кислинка, лёгкое тело.', popularity: 'Америка', origin: 'Бразилия', taste: 'Цитрус' },
    { name: 'Гейша', latin: 'Geisha', description: 'Самый дорогой сорт. Жасмин, бергамот.', popularity: 'Премиум', origin: 'Панама', taste: 'Жасмин' },
]

const HistorySection2Mobile = () => {
    const [current, setCurrent] = useState(0)

    const next = () => setCurrent(p => (p + 1) % 7)
    const prev = () => setCurrent(p => (p - 1 + 7) % 7)

    const coffee = coffeeTypes[current]

    return (
        <div className="relative w-full min-h-screen font-KyivSans">
            <img src={historyBg} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#735751]/80" />
            
            <div className="relative z-10 px-4 py-16 flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-white text-7xl font-bold mb-16 text-center uppercase">Сорта кофе</h2>
                
                <img src={cup} loading="lazy" alt="" className="w-72 h-72 object-contain mb-8" />
                <span className="text-[#E7D7C1] text-7xl font-bold mb-4">{coffee.name}</span>
                <p className="text-[#E7D7C1] text-4xl italic mb-8">{coffee.latin}</p>
                
                <div className="flex items-center gap-6 mb-10 w-full px-2">
                    <button onClick={prev} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl text-[#735751] flex-shrink-0">‹</button>
                    <p className="text-white text-5xl text-center flex-1 leading-relaxed">{coffee.description}</p>
                    <button onClick={next} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl text-[#735751] flex-shrink-0">›</button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 w-full mb-12">
                    <div className="bg-white/10 rounded-[20px] p-5 text-white text-center">
                        <p className="text-[#E7D7C1] text-5xl">Распр.</p>
                        <p className="text-4xl font-bold mt-2">{coffee.popularity}</p>
                    </div>
                    <div className="bg-white/10 rounded-[20px] p-5 text-white text-center">
                        <p className="text-[#E7D7C1] text-5xl">Откуда</p>
                        <p className="text-4xl font-bold mt-2">{coffee.origin}</p>
                    </div>
                    <div className="bg-white/10 rounded-[20px] p-5 text-white text-center">
                        <p className="text-[#E7D7C1] text-5xl">Вкус</p>
                        <p className="text-4xl font-bold mt-2">{coffee.taste}</p>
                    </div>
                </div>
                
                <button onClick={() => window.location.href = '/history/drinks'}
                    className="bg-[#E7D7C1] text-[#735751] px-8 py-5 rounded-[50px] text-5xl font-bold mt-[10%]">
                    История напитков
                </button>
            </div>
        </div>
    )
}

export default HistorySection2Mobile