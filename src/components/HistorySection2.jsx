import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import historyBg2 from '../img/overlay.svg'
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

const HistorySection2 = () => {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)
    const [rotation, setRotation] = useState(0)
    const [direction, setDirection] = useState(0)

    const next = () => {
        setDirection(1)
        setCurrent((prev) => (prev + 1) % coffeeTypes.length)
        setRotation(prev => prev + (360 / coffeeTypes.length))
    }
    const prev = () => {
        setDirection(-1)
        setCurrent((prev) => (prev - 1 + coffeeTypes.length) % coffeeTypes.length)
        setRotation(prev => prev - (360 / coffeeTypes.length))
    }

    const coffee = coffeeTypes[current]

    return (
        <div className="relative w-full font-KyivSans">
            <img src={historyBg} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#735751]/90" />
            
            <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 lg:py-32">
                <motion.h2 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-6xl lg:text-6xl font-bold mb-12 lg:mb-16 text-center uppercase">
                    Сорта кофе
                </motion.h2>
                
                <div className="flex flex-col items-center">
                    {/* Чашка с анимацией */}
                    <motion.div 
                        className="relative mb-8 lg:mb-8"
                        animate={{ rotate: rotation }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <img src={cup} loading="lazy" alt="Coffee Cup" 
                            className="w-72 lg:w-96 h-74 lg:h-84 object-contain cursor-pointer drop-shadow-2xl" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span 
                                    key={coffee.name}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[#E7D7C1] text-3xl lg:text-xl font-bold drop-shadow-lg text-center px-4">
                                    {coffee.name}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                    
                    <AnimatePresence mode="wait">
                        <motion.p 
                            key={coffee.latin}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-[#E7D7C1] text-3xl lg:text-3xl italic mb-6 drop-shadow-lg">
                            {coffee.latin}
                        </motion.p>
                    </AnimatePresence>
                    
                    {/* Стрелки + описание */}
                    <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-10 w-full">
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={prev} 
                            className="w-14 lg:w-14 h-14 lg:h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl lg:text-3xl text-[#735751] hover:bg-[#735751] hover:text-white transition-all flex-shrink-0">
                            ‹
                        </motion.button>
                        
                        <div className="text-center flex-1">
                            <AnimatePresence mode="wait">
                                <motion.p 
                                    key={coffee.description}
                                    initial={{ opacity: 0, x: direction * 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction * -50 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-white text-2xl lg:text-2xl leading-relaxed">
                                    {coffee.description}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                        
                        <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={next} 
                            className="w-14 lg:w-14 h-14 lg:h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl lg:text-3xl text-[#735751] hover:bg-[#735751] hover:text-white transition-all flex-shrink-0">
                            ›
                        </motion.button>
                    </div>
                    
                    {/* Карточки с анимацией */}
                    <div className="grid grid-cols-3 gap-3 lg:gap-4 w-full max-w-2xl mb-10 lg:mb-12">
                        {['Распространённость', 'Происхождение', 'Вкус'].map((label, i) => {
                            const value = i === 0 ? coffee.popularity : i === 1 ? coffee.origin : coffee.taste
                            return (
                                <motion.div 
                                    key={`${label}-${value}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * i }}
                                    className="bg-white/10 backdrop-blur-sm rounded-[20px] p-4 lg:p-5 text-white border border-white/20 text-center hover:bg-white/20 transition-all cursor-default">
                                    <p className="text-[#E7D7C1] text-xl lg:text-lg mb-1">{label}</p>
                                    <p className="text-2xl lg:text-2xl font-bold">{value}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                    
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/history/drinks'}
                        className="bg-[#E7D7C1] text-[#735751] px-10 lg:px-12 py-4 lg:py-5 rounded-[50px] text-3xl lg:text-2xl font-bold hover:bg-white transition duration-300 shadow-lg">
                        История наших напитков
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default HistorySection2