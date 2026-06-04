import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import historyBg from '../img/coffee.webp'
import cup from '../img/cup.webp'

const coffeeTypes = [
    { 
        name: 'Арабика', 
        latin: 'Coffea arabica', 
        description: 'Королева кофе. Самый популярный сорт, занимающий 70% мирового производства. Обладает мягким, сладковатым вкусом с нотами фруктов, ягод и шоколада. Содержит меньше кофеина чем робуста. Произрастает на высоте 600-2200 метров. Требовательна к климату и почве.', 
        popularity: '70% мирового производства', 
        origin: 'Эфиопия, Колумбия, Бразилия', 
        taste: 'Фруктовый, мягкий' 
    },
    { 
        name: 'Робуста', 
        latin: 'Coffea canephora', 
        description: 'Крепкий и выносливый сорт. Содержит в 2 раза больше кофеина чем арабика. Вкус более горький и резкий, с землистыми и ореховыми нотами. Устойчива к болезням и высокой температуре. Используется в эспрессо-смесях для плотной пенки и в растворимом кофе.', 
        popularity: '30% мирового производства', 
        origin: 'Вьетнам, Бразилия, Индонезия', 
        taste: 'Горький, землистый' 
    },
    { 
        name: 'Либерика', 
        latin: 'Coffea liberica', 
        description: 'Редкий гигант кофейного мира. Деревья вырастают до 18 метров в высоту. Зёрна крупнее арабики и робусты. Вкус уникальный — с дымными, древесными и цветочными нотами. Часто используется в премиальных смесях для придания глубины вкуса.', 
        popularity: 'Менее 1%', 
        origin: 'Западная Африка, Филиппины', 
        taste: 'Дымный, цветочный' 
    },
    { 
        name: 'Типика', 
        latin: 'Typica', 
        description: 'Прародитель большинства современных сортов арабики. Первый сорт, вывезенный из Эфиопии в Йемен. Обладает чистым, сладким вкусом с мягкой кислинкой. Низкая урожайность, но превосходное качество зерна.', 
        popularity: 'Основа многих сортов', 
        origin: 'Эфиопия → Йемен', 
        taste: 'Чистый, сладкий' 
    },
    { 
        name: 'Бурбон', 
        latin: 'Bourbon', 
        description: 'Мутация типики с острова Бурбон (ныне Реюньон). Более сладкий и комплексный вкус чем у типики. Даёт на 20-30% больше урожая. Яркие ноты карамели, ванили и спелых фруктов. Основа для многих латиноамериканских сортов.', 
        popularity: 'Широко распространён', 
        origin: 'Остров Реюньон, Латинская Америка', 
        taste: 'Карамельный, фруктовый' 
    },
    { 
        name: 'Катурра', 
        latin: 'Caturra', 
        description: 'Карликовая мутация бурбона. Компактные деревья позволяют плотную посадку и высокую урожайность. Вкус яркий, с цитрусовой кислинкой и лёгким телом. Популярен в Колумбии и Центральной Америке.', 
        popularity: 'Популярен в Америке', 
        origin: 'Бразилия, Колумбия', 
        taste: 'Цитрусовый, лёгкий' 
    },
    { 
        name: 'Гейша', 
        latin: 'Geisha', 
        description: 'Самый дорогой и престижный сорт кофе в мире. Родом из эфиопской деревни Геша. Прославилась в Панаме. Невероятно сложный вкус с нотами жасмина, бергамота, тропических фруктов. На аукционах цена достигает $1000+ за фунт.', 
        popularity: 'Премиум сегмент', 
        origin: 'Эфиопия, Панама', 
        taste: 'Жасмин, бергамот, фрукты' 
    },
]

const HistorySection2Mobile = () => {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)
    const [rotation, setRotation] = useState(0)
    const [direction, setDirection] = useState(0)

    const total = coffeeTypes.length
    const step = 360 / total

    const next = () => {
        setDirection(1)
        setCurrent((prev) => (prev + 1) % total)
        setRotation(prev => prev + step)
    }
    const prev = () => {
        setDirection(-1)
        setCurrent((prev) => (prev - 1 + total) % total)
        setRotation(prev => prev - step)
    }

    const coffee = coffeeTypes[current]

    return (
        <div className="relative w-full min-h-screen font-KyivSans">
            <img src={historyBg} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#735751]/80" />
            
            <div className="relative z-10 px-4 py-12 flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-white text-7xl font-bold mb-12 text-center uppercase">Сорта кофе</h2>
                
                {/* Чашка с вращением */}
                <div className="relative flex justify-center mb-8">
                    <motion.div
                        animate={{ rotate: rotation }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <img src={cup} loading="lazy" alt="cup" className="w-96 h-96 object-contain" />
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={coffee.name}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.3 }}
                                className="text-[#E7D7C1] text-5xl font-bold drop-shadow-lg text-center px-4"
                            >
                                {coffee.name}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>
                
                {/* Латинское название */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={coffee.latin}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#E7D7C1] text-4xl italic mb-6 text-center"
                    >
                        {coffee.latin}
                    </motion.p>
                </AnimatePresence>
                
                {/* Стрелки и описание */}
                <div className="flex items-center gap-4 mb-10 w-full px-2">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={prev}
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-4xl text-[#735751] flex-shrink-0"
                    >
                        ‹
                    </motion.button>
                    <div className="flex-1 text-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={coffee.description}
                                initial={{ opacity: 0, x: direction * 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -50 }}
                                transition={{ duration: 0.4 }}
                                className="text-white text-4xl leading-relaxed"
                            >
                                {coffee.description}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={next}
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-4xl text-[#735751] flex-shrink-0"
                    >
                        ›
                    </motion.button>
                </div>
                
                {/* Карточки с характеристиками */}
                <div className="grid grid-cols-3 gap-3 w-full mb-12">
                    {['Распр.', 'Откуда', 'Вкус'].map((label, i) => {
                        const value = i === 0 ? coffee.popularity : i === 1 ? coffee.origin : coffee.taste
                        return (
                            <motion.div
                                key={`${label}-${value}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * i }}
                                className="bg-white/10 backdrop-blur-sm rounded-[20px] p-4 text-white border border-white/20 text-center"
                            >
                                <p className="text-[#E7D7C1] text-3xl mb-1">{label}</p>
                                <p className="text-3xl font-bold">{value}</p>
                            </motion.div>
                        )
                    })}
                </div>
                
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/history/drinks')}
                    className="bg-[#E7D7C1] text-[#735751] px-8 py-4 rounded-[50px] text-4xl font-bold mt-4"
                >
                    История напитков
                </motion.button>
            </div>
        </div>
    )
}

export default HistorySection2Mobile