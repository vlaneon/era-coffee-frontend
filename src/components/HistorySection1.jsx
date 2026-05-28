import React, { useState } from 'react'
import historyBg1 from '../img/overlay.svg'
import historyImg1 from '../img/history-1.webp'
import historyImg2 from '../img/history-2.webp'
import historyImg3 from '../img/history-3.webp'
import historyImg4 from '../img/history-4.webp'

const blocks = [
    {
        image: historyImg1,
        title: 'Эфиопия — родина кофе',
        subtitle: 'IX век',
        text: 'Легенда гласит, что эфиопский пастух Калди заметил, как его козы становятся необычайно бодрыми после поедания красных ягод с неизвестного кустарника. Он поделился находкой с монахами из местного монастыря, которые начали использовать эти ягоды для приготовления напитка, помогающего не засыпать во время ночных молитв. Так началась многовековая история кофе, распространившаяся по всему миру.',
        details: 'Первое упоминание: 850 год н.э.\nРегион: Каффа, Эфиопия\nЗначение: открытие тонизирующих свойств кофе',
        isLight: true
    },
    {
        image: historyImg2,
        title: 'Аравийский полуостров',
        subtitle: 'XV век',
        text: 'Кофе начал своё триумфальное шествие по миру с Йемена, где его начали культивировать и экспортировать через порт Моха. Здесь появились первые кофейни — "qahveh khaneh", ставшие центрами общения, музыки и политических дискуссий. Кофе называли "вином ислама", а его популярность росла с каждым годом. Арабы строго охраняли монополию на выращивание кофе, запрещая вывозить зелёные зёрна.',
        details: 'Первые плантации: Йемен, XV век\nПервые кофейни: Мекка, 1475 год\nМонополия: 200 лет арабского контроля',
        isLight: false
    },
    {
        image: historyImg3,
        title: 'Кофе завоёвывает Европу',
        subtitle: 'XVII век',
        text: 'Венеция стала первым европейским городом, где появился кофе в 1615 году. Вскоре кофейни открылись в Лондоне (1652), Париже (1672) и Вене (1683). Кофе называли "горьким изобретением сатаны", пока Папа Климент VIII не попробовал его и не благословил. К концу XVII века Лондон насчитывал более 300 кофеен, ставших местами встреч интеллектуалов, художников и политиков.',
        details: 'Первая кофейня Европы: Венеция, 1645\nБлагословение Папы: 1600 год\nЛондон: 300+ кофеен к 1700 году',
        isLight: false
    },
    {
        image: historyImg4,
        title: 'Кофе в современном мире',
        subtitle: 'Сегодня',
        text: 'Кофе — второй по популярности напиток в мире после воды. Ежедневно выпивается более 2,5 миллиардов чашек. Бразилия производит треть всего кофе планеты. Появились сотни способов приготовления: от классического эспрессо до холодного дрип-кофе. Кофе стал не просто напитком, а культурным феноменом, объединяющим людей по всему миру.',
        details: 'Потребление: 2,5 млрд чашек в день\nКрупнейший производитель: Бразилия\nСпособов приготовления: более 100',
        isLight: true
    }
]

const HistorySection1 = () => {
    const [hovered, setHovered] = useState(null)

    return (
        <div className="relative w-full font-KyivSans">
            {/* Шахматный фон */}
            <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-[#E7D7C1] sm:pt-[40%] lg:pt-[10%]"></div>
                <div className="bg-[#735751]"></div>
                <div className="bg-[#735751]"></div>
                <div className="bg-[#E7D7C1]"></div>
            </div>
            
            <img src={historyBg1} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
            
            <div className="relative z-10 mx-auto px-[5%] pt-[10%] pb-32">

                {/* ТЕЛЕФОН: всё в колонку */}
                <div className="flex flex-col gap-40 lg:hidden ">
                    {/* Заголовок + подсказка */}
                    <div className="text-center mt-[15%]">
                        <h1 className="text-white text-7xl font-bold uppercase drop-shadow-lg">История кофе</h1>
                        <p className="text-[#E7D7C1] text-4xl mt-2">👆 нажми на картинку, чтобы узнать историю</p>
                    </div>

                    {blocks.map((block, index) => (
                        <div 
                            key={index}
                            className={`relative rounded-[10%] overflow-hidden cursor-pointer ${block.isLight ? 'bg-[#E7D7C1]' : 'bg-[#735751]'}`}
                            onClick={() => setHovered(hovered === index ? null : index)}
                        >
                            <img 
                                src={block.image} 
                                loading="lazy"
                                alt={block.title} 
                                className={`w-full h-[50vh] object-cover transition-all duration-500 ${hovered === index ? 'opacity-0 scale-110' : 'opacity-100'}`} 
                            />
                            <div className={`p-6 flex flex-col justify-center transition-all duration-500 absolute inset-0 ${hovered === index ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${block.isLight ? 'text-[#735751]' : 'text-white'}`}>
                                <h3 className={`text-6xl font-bold mb-3 ${block.isLight ? 'text-[#735751]' : 'text-[#E7D7C1]'}`}>{block.title}</h3>
                                <p className={`text-4xl mb-4 ${block.isLight ? 'text-[#A78A7F]' : 'text-[#E7D7C1]/70'}`}>{block.subtitle}</p>
                                <p className="text-4xl leading-relaxed mb-4">{block.text}</p>
                                <div className={`text-4xl whitespace-pre-line ${block.isLight ? 'text-[#735751]/60' : 'text-white/50'}`}>{block.details}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* LG: изначальная сетка */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-6">
                    {blocks.slice(0, 2).map((block, index) => (
                        <div 
                            key={index}
                            className={`relative rounded-[10%] overflow-hidden cursor-pointer group ${block.isLight ? 'bg-[#E7D7C1]' : 'bg-[#735751]'}`}
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <img 
                                src={block.image} 
                                loading="lazy"
                                alt={block.title} 
                                className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 ${hovered === index ? 'opacity-0 scale-110' : 'opacity-100'}`} 
                            />
                            <div className={`p-8 md:p-10 flex flex-col justify-center min-h-[450px] transition-all duration-500 ${hovered === index ? 'opacity-100' : 'opacity-0'} ${block.isLight ? 'text-[#735751]' : 'text-white'}`}>
                                <h3 className={`text-4xl md:text-5xl font-bold mb-3 ${block.isLight ? 'text-[#735751]' : 'text-[#E7D7C1]'}`}>{block.title}</h3>
                                <p className={`text-2xl mb-4 ${block.isLight ? 'text-[#A78A7F]' : 'text-[#E7D7C1]/70'}`}>{block.subtitle}</p>
                                <p className="text-xl leading-relaxed mb-4">{block.text}</p>
                                <div className={`text-lg whitespace-pre-line ${block.isLight ? 'text-[#735751]/60' : 'text-white/50'}`}>{block.details}</div>
                            </div>
                        </div>
                    ))}

                    <div className="md:col-span-2 px-[20%] flex items-center justify-center py-8 bg-gradient-to-r from-[#735751] to-[#E7D7C1]">
                        <h2 className="text-white text-5xl md:text-6xl font-bold text-center uppercase drop-shadow-lg">История кофе</h2>
                    </div>

                    {blocks.slice(2, 4).map((block, index) => (
                        <div 
                            key={index + 2}
                            className={`relative rounded-[10%] overflow-hidden cursor-pointer group ${block.isLight ? 'bg-[#E7D7C1]' : 'bg-[#735751]'}`}
                            onMouseEnter={() => setHovered(index + 2)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <img 
                                src={block.image} 
                                loading="lazy"
                                alt={block.title} 
                                className={`w-full h-full object-cover absolute inset-0 transition-all duration-500 ${hovered === index + 2 ? 'opacity-0 scale-110' : 'opacity-100'}`} 
                            />
                            <div className={`p-8 md:p-10 flex flex-col justify-center min-h-[450px] transition-all duration-500 ${hovered === index + 2 ? 'opacity-100' : 'opacity-0'} ${block.isLight ? 'text-[#735751]' : 'text-white'}`}>
                                <h3 className={`text-4xl md:text-5xl font-bold mb-3 ${block.isLight ? 'text-[#735751]' : 'text-[#E7D7C1]'}`}>{block.title}</h3>
                                <p className={`text-2xl mb-4 ${block.isLight ? 'text-[#A78A7F]' : 'text-[#E7D7C1]/70'}`}>{block.subtitle}</p>
                                <p className="text-xl leading-relaxed mb-4">{block.text}</p>
                                <div className={`text-lg whitespace-pre-line ${block.isLight ? 'text-[#735751]/60' : 'text-white/50'}`}>{block.details}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HistorySection1