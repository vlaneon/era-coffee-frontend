import React from 'react'
import card1 from '../img/1 card.webp'
import card2 from '../img/2 card.webp'
import card3 from '../img/3 card.webp'
import card4 from '../img/4 card.webp'
import card5 from '../img/5 card.webp'
import card6 from '../img/6 card.webp'
import eracoffeeshopis from '../img/eracoffeeshopis.svg'

const HomeFacts = () => {

    return (
        <div className="relative w-full bg-[#735751] font-KyivSans overflow-hidden pb-20">
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
                {/* МОБИЛКА: всё в колонку */}
                <div className="flex flex-col gap-4 lg:hidden">
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={eracoffeeshopis} loading="lazy" alt="ERA Coffee Shop" className="w-full h-auto" />
                    </div>
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={card3} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={card1} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={card2} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={card4} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={card5} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={card6} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center items-center text-center p-4">
                        <h2 className="text-white text-6xl font-bold mb-4">
                            СКОРЕЕ СТАНЬ ЧАСТЬЮ НАШЕЙ КРУТОЙ КОМАНДЫ!
                        </h2>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open('https://forms.yandex.ru/u/6a168fbcd0468820e4fac055', '_blank');
                            }}
                            className="bg-white text-[#735751] px-10 py-3 rounded-[50px] text-5xl font-bold hover:bg-[#E7D7C1] transition duration-300 shadow-lg"
                        >
                            заполнить форму
                        </button>
                    </div>
                </div>

                {/* LG: изначальная сетка  */}
                <div className="hidden lg:grid grid-cols-3 gap-4">
                    <div className="col-span-2 rounded-[20px] overflow-hidden flex items-center justify-center">
                        <img src={eracoffeeshopis} loading="lazy" alt="ERA Coffee Shop" className="w-full h-auto object-contain" />
                    </div>
                    <div className="row-span-2 rounded-[20px] overflow-hidden">
                        <img src={card3} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={card1} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={card2} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="row-span-2 rounded-[20px] overflow-hidden">
                        <img src={card4} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={card5} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-[20px] overflow-hidden">
                        <img src={card6} loading="lazy" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-2 flex flex-col justify-center items-center text-center p-4">
                        <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                            СКОРЕЕ СТАНЬ ЧАСТЬЮ НАШЕЙ КРУТОЙ КОМАНДЫ!
                        </h2>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open('https://forms.yandex.ru/u/6a168fbcd0468820e4fac055', '_blank');
                            }}
                            className="bg-white text-[#735751] px-10 py-3 rounded-[50px] text-lg font-bold hover:bg-[#E7D7C1] transition duration-300 shadow-lg"
                        >
                            заполнить форму
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeFacts