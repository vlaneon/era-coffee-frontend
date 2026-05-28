import React from 'react'
import Header from './Header'
import Footer from './Footer'
import HomeMain from './HomeMain'
import HomeSlider from './HomeSlider'
import HomeSection1 from './HomeSection1'
import HomeFacts from './HomeFacts'
import overlay from '../img/overlay.svg'
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div>
      <Helmet>
          <title>ERA Coffee – кофейня в Владивостоке | Авторские напитки и свежая обжарка</title>
          <meta name="description" content="ERA Coffee – уютная кофейня во Владивостоке. Свежеобжаренные зерна, авторские напитки, классический кофе и десерты. Закажите онлайн или приходите в гости!" />
      </Helmet>
      
      <Header />
      <div id="main"><HomeMain /></div>
      <div id="slider"><HomeSlider /></div>
      <div id="section1"><HomeSection1 /></div>
      {/* Общая обертка для HomeFacts + Footer */}
        <div className="relative bg-[#735751]">
            <HomeFacts />
            <Footer />
            <img 
                src={overlay} 
                loading="lazy"
                alt="" 
                className="absolute top-0 left-0 w-full h-full object-cover z-10 pointer-events-none opacity-20"
            />
            <div className='bg-white p-2'>
              <p className='text-bold text-2xl lg:text-2xl sm:text-5xl text-center'>сайт является учебным</p>
            </div>
        </div>
    </div>
  )
}

export default Home