import React, { useEffect, useState, Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import overlayImg from '../img/overlay.svg'
import espressoImg from '../img/эспрессо.webp'
import lungoImg from '../img/лунго.webp'
import filterImg from '../img/филтр кофе.webp'
import americanoImg from '../img/американо.webp'
import latteImg from '../img/латте.webp'
import cappuccinoImg from '../img/капуч.webp'
import flatwhiteImg from '../img/флэтуайт.webp'
import rafImg from '../img/раф.webp'
import bumbleImg from '../img/бамбл карамел.webp'
import espressotonicImg from '../img/эспрессо тоник.webp'
import matchaImg from '../img/матча классический.webp'
import { Helmet } from 'react-helmet-async';

const drinks = [
    { id: 'espresso', name: 'Эспрессо', latin: 'Espresso', text: 'Основа всех кофейных напитков. Маленький, крепкий, насыщенный. Готовится под давлением 9 бар при температуре 90-95°C за 25-30 секунд. Идеальный эспрессо имеет золотистую пенку — "крема". Появился в Италии в 1901 году благодаря изобретателю Луиджи Беццера, который создал первую эспрессо-машину.', details: 'Объём: 30мл\nКофеин: 63мг\nДавление: 9 бар\nВремя экстракции: 25-30с\nРодина: Италия, 1901', image: espressoImg, imageRight: true },
    { id: 'lungo', name: 'Лунго', latin: 'Lungo', text: 'Лунго — это эспрессо с удлинённой экстракцией. Через ту же порцию кофе пропускают больше воды (60мл вместо 30). Результат — менее концентрированный, но более горький напиток. В Италии лунго популярен как утренний кофе — не такой крепкий как эспрессо, но бодрящий.', details: 'Объём: 60мл\nКофеин: 80мг\nВремя экстракции: 45-60с\nРодина: Италия', image: lungoImg, imageRight: false },
    { id: 'filter', name: 'Фильтр-кофе', latin: 'Filter Coffee', text: 'Самый популярный способ заваривания кофе в мире. Горячая вода медленно проходит через молотый кофе, удерживаемый бумажным или тканевым фильтром. Получается чистый, мягкий напиток без осадка и горечи. Изобретён в Германии в 1908 году Мелиттой Бентц.', details: 'Объём: 200-400мл\nКофеин: 95-200мг\nСпособ: пролив\nРодина: Германия, 1908', image: filterImg, imageRight: true },
    { id: 'americano', name: 'Американо', latin: 'Americano', text: 'Легендарный напиток, придуманный американскими солдатами в Италии во время Второй мировой войны. Чтобы получить привычный по крепости кофе, они разбавляли итальянский эспрессо горячей водой. Сегодня американо — один из самых заказываемых напитков в мире.', details: 'Объём: 120-200мл\nКофеин: 63-126мг\nПроисхождение: Вторая мировая\nОсобенность: эспрессо + вода', image: americanoImg, imageRight: false },
    { id: 'latte', name: 'Латте', latin: 'Latte', text: 'Нежный кофейно-молочный напиток. Эспрессо с большим количеством горячего молока и лёгкой пенкой. В Италии "caffè latte" традиционно готовят дома на завтрак. Мировую популярность латте получил благодаря американским кофейням в 1980-х годах.', details: 'Объём: 250-400мл\nКофеин: 63мг\nСоотношение: 1:3 кофе/молоко\nПопулярность: мировой бестселлер', image: latteImg, imageRight: true },
    { id: 'cappuccino', name: 'Капучино', latin: 'Cappuccino', text: 'Классика итальянского завтрака. Равные части эспрессо, горячего молока и густой молочной пенки. Назван в честь монахов-капуцинов — цвет напитка напоминает коричневые рясы монахов. Традиционно в Италии капучино пьют только до полудня.', details: 'Объём: 150-180мл\nКофеин: 63мг\nСоотношение: 1:1:1\nПравило: только до 12:00', image: cappuccinoImg, imageRight: false },
    { id: 'flatwhite', name: 'Флэт Уайт', latin: 'Flat White', text: 'Австралийское изобретение, покорившее мир. Двойной эспрессо с бархатистым микромолоком. Меньше пены, чем в капучино, больше кофейного вкуса. Идеально сбалансированный напиток для тех, кто ценит чистый вкус кофе с мягкой сливочностью.', details: 'Объём: 150-200мл\nКофеин: 126мг\nПена: микропена\nРодина: Австралия, 1980-е', image: flatwhiteImg, imageRight: true },
    { id: 'raf', name: 'Раф', latin: 'Raf Coffee', text: 'Единственный кофейный напиток, изобретённый в России. В 1996 году в московской кофейне "Кофе Бин" постоянный гость Рафаэль попросил сделать ему "что-то вкусное". Бариста смешал эспрессо, сливки и ванильный сахар, взбив всё паром. Так родился легендарный Раф.', details: 'Объём: 300-400мл\nКофеин: 63мг\nРодина: Москва, 1996\nОсобенность: взбитые сливки', image: rafImg, imageRight: false },
    { id: 'bumble', name: 'Бамбл', latin: 'Bumble Coffee', text: 'Освежающий кофейный коктейль на основе эспрессо и апельсинового сока. Цитрусовая кислинка неожиданно гармонирует с кофейной глубиной. Особенно популярен в жарких странах — Таиланде, Вьетнаме, на Ближнем Востоке. Подаётся со льдом.', details: 'Объём: 250-350мл\nКофеин: 63мг\nОснова: эспрессо + апельсин\nПопулярен: Юго-Восточная Азия', image: bumbleImg, imageRight: true },
    { id: 'espressotonic', name: 'Эспрессо Тоник', latin: 'Espresso Tonic', text: 'Скандинавский тренд: эспрессо с тоником и льдом. Горьковато-сладкий тоник подчёркивает фруктовые ноты эспрессо. Красивый слоистый эффект делает напиток не только вкусным, но и эффектным. Идеален для жарких летних дней.', details: 'Объём: 250-350мл\nКофеин: 63мг\nОснова: эспрессо + тоник\nРодина: Скандинавия', image: espressotonicImg, imageRight: false },
    { id: 'matchaclassic', name: 'Матча Классический', latin: 'Matcha Classic', text: 'Традиционный японский чай матча — перемолотые в нежнейшую пудру листья тенча. Взбивается бамбуковым венчиком тясян в горячей воде. Используется в японской чайной церемонии с XII века. Богат антиоксидантами и L-теанином.', details: 'Температура: 80°C\nФорма: порошок\nРодина: Япония\nЦеремония: ча-но-ю', image: matchaImg, imageRight: true },
]

const HistoryDrinks = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const scrollTo = location.state?.scrollTo
    const token = localStorage.getItem('token')
    const [showTopBtn, setShowTopBtn] = useState(false)

    useEffect(() => {
        const handleScroll = () => setShowTopBtn(window.scrollY > 500)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (!scrollTo) {
            window.scrollTo(0, 0);
            return;
        }
    
        console.log('Пытаюсь проскроллить к:', scrollTo);
    
        let attempts = 0;
        const maxAttempts = 15; // 15 попыток = 1.5 секунды
        const interval = 100;
    
        const tryScroll = () => {
            const el = document.getElementById(scrollTo);
            console.log(`Попытка ${attempts + 1}: элемент`, el);
        
            if (el) {
                // Используем scrollIntoView – он сам учтёт положение элемента
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
        
            attempts++;
            if (attempts < maxAttempts) {
                setTimeout(tryScroll, interval);
            } else {
                console.warn('Элемент не найден за', maxAttempts, 'попыток');
                window.scrollTo(0, 0);
            }
        };
    
        // Даём странице немного времени на рендеринг, затем начинаем искать
        setTimeout(tryScroll, 400);
    }, [scrollTo]);

    return (
        <div>

            <Helmet>
                <title>История кофейных напитков | ERA Coffee</title>
                <meta name="description" content="История эспрессо, капучино, латте, раф-кофе и других напитков. Как они появились, чем отличаются и как готовятся в ERA Coffee." />
            </Helmet>

            <Header />
            
            {showTopBtn && (
                <motion.button 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => document.getElementById('drinks-footer')?.scrollIntoView({ behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-50 w-20 lg:w-16 h-20 lg:h-16 bg-[#735751] text-white rounded-full flex items-center justify-center text-4xl lg:text-3xl shadow-2xl">
                    ↓
                </motion.button>
            )}
            
            <div className="font-KyivSans relative">
                <img src={overlayImg} loading="lazy" alt="" className="fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0 mix-blend-screen" />
                
                <motion.h1 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="text-6xl lg:text-5xl font-bold text-center text-[#735751] py-96 lg:py-40 bg-transparent uppercase relative z-10">
                    История напитков
                </motion.h1>
                
                {drinks.map((drink, index) => (
                    <Fragment key={drink.id}>
                        {index > 0 && (
                            <div className="relative z-10 h-3 lg:h-5 bg-gradient-to-r from-[#735751] via-[#E7D7C1] to-[#735751]" />
                        )}
                        <motion.div 
                            id={drink.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className={`flex flex-col lg:flex-row min-h-screen relative overflow-hidden ${drink.imageRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} ${index % 2 === 0 ? 'bg-white' : 'bg-[#735751]'}`}
                        >
                            <motion.div 
                                whileInView={{ opacity: [0, 1], x: [drink.imageRight ? -50 : 50, 0] }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="w-full lg:w-1/2 h-[35vh] lg:h-auto">
                                <img src={drink.image} loading="lazy" alt={drink.name} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                            </motion.div>
                            
                            <div className={`w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 ${index % 2 === 0 ? 'text-[#735751]' : 'text-white'}`}>
                                <motion.h3 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-7xl lg:text-5xl font-bold mb-3 lg:mb-2">{drink.name}</motion.h3>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className={`text-5xl lg:text-2xl italic mb-6 ${index % 2 === 0 ? 'text-[#A78A7F]' : 'text-[#E7D7C1]/70'}`}>{drink.latin}</motion.p>
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="text-6xl lg:text-3xl leading-relaxed mb-6 lg:mb-8">{drink.text}</motion.p>
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    className={`text-4xl lg:text-xl whitespace-pre-line ${index % 2 === 0 ? 'text-[#735751]/60' : 'text-white opacity-40'}`}>{drink.details}</motion.div>
                            </div>
                        </motion.div>
                    </Fragment>
                ))}
                
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    id="drinks-footer" className="flex justify-center gap-4 lg:gap-6 py-16 lg:py-20 bg-transparent relative z-10 px-4">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/history')}
                        className="bg-[#735751] text-white px-8 lg:px-12 py-4 lg:py-5 rounded-[50px] text-2xl lg:text-2xl font-bold">
                        ← Назад
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => token ? navigate('/menu') : (window.confirm('Войдите') ? navigate('/login') : null)}
                        className="bg-white text-[#735751] px-8 lg:px-12 py-4 lg:py-5 rounded-[50px] text-2xl lg:text-2xl font-bold">
                        Заказать
                    </motion.button>
                </motion.div>
            </div>
            
            <Footer />
        </div>
    )
}

export default HistoryDrinks