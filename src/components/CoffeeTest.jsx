import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import historyBg1 from '../img/overlay.svg'
import { useIsMobile } from '../hooks/useIsMobile'

const questions = [
    {
        question: 'Какой вкус кофе вы предпочитаете?',
        options: [
            { text: 'Мягкий и сладковатый', points: 'arabica' },
            { text: 'Крепкий и горький', points: 'robusta' },
            { text: 'Необычный и редкий', points: 'liberica' },
            { text: 'Кислинка и легкость', points: 'typica' },
        ]
    },
    {
        question: 'Что для вас важнее в кофе?',
        options: [
            { text: 'Аромат и послевкусие', points: 'bourbon' },
            { text: 'Бодрость и крепость', points: 'robusta' },
            { text: 'Уникальность и редкость', points: 'geisha' },
            { text: 'Лёгкость и чистота', points: 'typica' },
        ]
    },
    {
        question: 'Как вы относитесь к сладкому?',
        options: [
            { text: 'Обожаю сладкое', points: 'bourbon' },
            { text: 'Предпочитаю без сахара', points: 'robusta' },
            { text: 'Люблю фруктовые ноты', points: 'geisha' },
            { text: 'Нейтрально', points: 'caturra' },
        ]
    },
]

const results = {
    arabica: { name: 'Арабика', emoji: '☕', text: 'Классика и элегантность. Вы цените баланс и мягкость во всём.' },
    robusta: { name: 'Робуста', emoji: '💪', text: 'Крепкий характер! Вы не боитесь трудностей.' },
    liberica: { name: 'Либерика', emoji: '🌿', text: 'Редкая душа. Вы уникальны и не похожи на других.' },
    typica: { name: 'Типика', emoji: '🌱', text: 'Чистота и лёгкость. Вы цените простоту.' },
    bourbon: { name: 'Бурбон', emoji: '🍬', text: 'Сладкая жизнь! Вы любите комфорт и наслаждение.' },
    geisha: { name: 'Гейша', emoji: '🌸', text: 'Изысканность и редкость. Вы — ценитель прекрасного.' },
    caturra: { name: 'Катурра', emoji: '🍋', text: 'Яркость и энергия! Вы — душа компании.' },
}

const CoffeeTest = () => {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState([])
    const [result, setResult] = useState(null)
    const isMobile = useIsMobile(1024)

    const handleAnswer = (points) => {
        const newAnswers = [...answers, points]
        setAnswers(newAnswers)
        if (step < questions.length - 1) {
            setStep(step + 1)
        } else {
            const count = {}
            newAnswers.forEach(a => count[a] = (count[a] || 0) + 1)
            const winner = Object.keys(count).sort((a, b) => count[b] - count[a])[0]
            setResult(results[winner])
        }
    }

    const reset = () => { setStep(0); setAnswers([]); setResult(null) }

    return (
        <div className="relative w-full font-KyivSans py-20 bg-[#735751] min-h-screen flex items-center overflow-hidden">
            <img src={historyBg1} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
            
            {/* Плавающие зёрна */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <span 
                        key={i} 
                        className="absolute text-4xl lg:text-2xl animate-bounce"
                        style={{ 
                            left: `${Math.random() * 90}%`, 
                            top: `${Math.random() * 90}%`, 
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            opacity: 0.3
                        }}>
                        ☕
                    </span>
                ))}
            </div>
            
            <div className="relative z-10 w-full px-4 lg:px-6 text-center max-w-2xl mx-auto">
                <motion.h2 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-7xl lg:text-5xl font-bold mb-6 lg:mb-4 uppercase">
                    Какой ты кофе?
                </motion.h2>
                <p className="text-[#E7D7C1] text-4xl lg:text-2xl mb-8 lg:mb-6">Пройди тест и узнай свой кофейный характер</p>

                {/* Прогресс-бар */}
                {!result && (
                    <div className="w-full bg-[#E7D7C1]/30 rounded-full h-3 mb-10 lg:mb-8">
                        <motion.div 
                            className="bg-[#E7D7C1] h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {result ? (
                        <motion.div 
                            key="result"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#E7D7C1] rounded-[40px] lg:rounded-[30px] p-10 lg:p-8">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="text-9xl lg:text-7xl mb-6 lg:mb-4">
                                {result.emoji}
                            </motion.div>
                            <h3 className="text-[#735751] text-6xl lg:text-3xl font-bold mb-6 lg:mb-4">{result.name}</h3>
                            <p className="text-[#735751] text-4xl lg:text-xl mb-10 lg:mb-6">{result.text}</p>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={reset} 
                                className="bg-[#735751] text-white px-12 lg:px-8 py-5 lg:py-3 rounded-[50px] text-3xl lg:text-lg font-bold hover:bg-[#8B6B61] transition">
                                Пройти заново
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key={step}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.4 }}
                            className="bg-[#E7D7C1] rounded-[40px] lg:rounded-[30px] p-10 lg:p-8">
                            <p className="text-[#735751] text-3xl lg:text-sm mb-6 lg:mb-4">Вопрос {step + 1} из {questions.length}</p>
                            <h3 className="text-[#735751] text-5xl lg:text-3xl font-bold mb-12 lg:mb-8">{questions[step].question}</h3>
                            <div className="flex flex-col gap-6 lg:gap-4">
                                {questions[step].options.map((opt, i) => (
                                    <motion.button 
                                        key={i} 
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleAnswer(opt.points)}
                                        className="bg-white text-[#735751] px-8 lg:px-6 py-6 lg:py-4 rounded-[20px] lg:rounded-[15px] text-3xl lg:text-lg font-medium hover:bg-[#735751] hover:text-white transition shadow-md">
                                        {opt.text}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default CoffeeTest