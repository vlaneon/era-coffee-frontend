import React from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import overlayImg from '../img/overlay.svg'

// Импортируем фото сотрудников
import directorImg from '../img/director.webp'
import managerImg from '../img/manager.webp'
import chefBaristaImg from '../img/chef-barista.webp'
import barista1Img from '../img/barista1.webp'
import barista2Img from '../img/barista2.webp'
import barista3Img from '../img/barista3.webp'

const staff = [
  {
    name: 'Ольга Белова',
    role: 'Директор',
    photo: directorImg,
    description: 'Основательница ERA. Вдохновляет команду и задаёт стандарты качества.'
  },
  {
    name: 'Максим Орлов',
    role: 'Управляющий',
    photo: managerImg,
    description: 'Отвечает за уют, атмосферу и безупречный сервис.'
  },
  {
    name: 'Анна Соколова',
    role: 'Шеф-бариста',
    photo: chefBaristaImg,
    description: 'Разрабатывает авторские рецепты, обучает бариста и следит за вкусом каждого напитка.'
  },
  {
    name: 'Дмитрий Кузнецов',
    role: 'Бариста',
    photo: barista1Img,
    description: 'Мастер латте-арта и любимец гостей. Готовит кофе с улыбкой.'
  },
  {
    name: 'Елена Волкова',
    role: 'Бариста',
    photo: barista2Img,
    description: 'Знает о кофе всё. Помогает гостям выбрать идеальный напиток.'
  },
  {
    name: 'Артём Новиков',
    role: 'Бариста',
    photo: barista3Img,
    description: 'Энергия и позитив. Делает ваш кофе быстрее и вкуснее.'
  },
]

const StaffPage = () => {
  return (
    <div className="relative min-h-screen bg-[#E7D7C1] font-BonaNova">
      <img 
        src={overlayImg} 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0" 
      />
      
      <div className="relative z-10">
        <Header />
        <div className="pt-48 lg:pt-28 pb-10 max-w-6xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-7xl lg:text-6xl font-bold text-[#735751] mb-6 text-center"
          >
            Наша команда
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl lg:text-2xl text-[#A78A7F] mb-14 text-center italic"
          >
            «Кофе с душой, команда с сердцем»
          </motion.p>

          {/* Мобильная верстка – одна колонка, крупные карточки */}
          <div className="lg:hidden flex flex-col gap-10">
            {staff.map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-[40px] p-10 shadow-lg text-center"
              >
                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-64 h-64 rounded-full object-cover mx-auto mb-8 border-4 border-[#E7D7C1]"
                  onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"%3E%3Ccircle cx="128" cy="128" r="128" fill="%23E7D7C1"/%3E%3Ctext x="128" y="145" text-anchor="middle" fill="%23735751" font-size="90" font-family="serif"%3E👤%3C/text%3E%3C/svg%3E' }}
                />
                <h3 className="text-5xl font-bold text-[#735751]">{person.name}</h3>
                <p className="text-3xl text-[#A78A7F] mt-4">{person.role}</p>
                <p className="text-2xl text-gray-500 mt-6">{person.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Десктопная верстка – сетка, размеры как раньше */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {staff.map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-[30px] p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-40 h-40 rounded-full object-cover mx-auto mb-4 border-4 border-[#E7D7C1]"
                  onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"%3E%3Ccircle cx="80" cy="80" r="80" fill="%23E7D7C1"/%3E%3Ctext x="80" y="90" text-anchor="middle" fill="%23735751" font-size="60" font-family="serif"%3E👤%3C/text%3E%3C/svg%3E' }}
                />
                <h3 className="text-3xl font-bold text-[#735751]">{person.name}</h3>
                <p className="text-xl text-[#A78A7F] mt-2">{person.role}</p>
                <p className="text-lg text-gray-500 mt-4">{person.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default StaffPage