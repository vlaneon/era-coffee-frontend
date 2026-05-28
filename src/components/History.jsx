import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import HistorySection1 from './HistorySection1'
import HistorySection2Mobile from './HistorySection2Mobile'
import HistorySection2 from './HistorySection2'
import CoffeeTest from './CoffeeTest'
import people from '../img/people.webp'
import overlay from '../img/overlay.svg'
import { useIsMobile } from '../hooks/useIsMobile'
import { Helmet } from 'react-helmet-async';

const History = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    const isMobile = useIsMobile(1024)

    return (
        <div>

            <Helmet>
                <title>История кофе | ERA Coffee – от Эфиопии до вашей чашки</title>
                <meta name="description" content="Узнайте историю кофе: от легенды о пастухе Калди до современных сортов. ERA Coffee рассказывает о происхождении, распространении и культуре кофе." />
            </Helmet>

            <Header />

            <HistorySection1 />

            <div className="relative">
                <div 
                    className="absolute inset-0 w-full h-36"
                    style={{ 
                        backgroundImage: `url(${people})`,
                        backgroundRepeat: 'repeat-x',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        opacity: 0.5
                    }} 
                />
            </div>

            {isMobile ? <HistorySection2Mobile /> : <HistorySection2 />}

            <CoffeeTest />
            
            {/* Последняя секция с фоном CoffeeTest + Footer */}
            <div className="relative bg-[#735751]">
                <img src={overlay} loading="lazy" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" />
                <Footer />
            </div>
        </div>
    )
}

export default History