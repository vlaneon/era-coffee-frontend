import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[#f5f0ee] font-BonaNova">
            <Header />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-28 md:py-44 lg:py-28">
                <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold text-[#735751] mb-6 text-center sm:text-left">
                    Политика обработки персональных данных
                </h1>
                <div className="bg-white rounded-[20px] sm:rounded-[30px] p-5 sm:p-8 md:p-10 shadow-lg space-y-5 sm:space-y-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                    <p className="text-2xl sm:text-3xl text-gray-500">
                        <strong>Дата вступления в силу:</strong> 1 июня 2026 г.
                    </p>

                    <h2 className="text-xl sm:text-5xl font-bold text-[#735751] mt-6">1. Общие положения</h2>
                    <p className='text-2xl lg:text-2xl sm:text-2xl'>Настоящая политика обработки персональных данных (далее – Политика) действует в отношении всей информации, которую сайт кофейни «ERA Coffee» (далее – Сайт) может получить о пользователе во время использования Сайта, оформления заказов и взаимодействия с сервисом.</p>

                    <h2 className="text-xl lg:text-4xl sm:text-4xl font-bold text-[#735751] mt-6">2. Какие данные мы собираем</h2>
                    <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 text-sm sm:text-4xl lg:text-2xl">
                        <li>Имя пользователя (для персонализации и оформления заказа).</li>
                        <li>Адрес электронной почты (для подтверждения заказа и связи).</li>
                        <li>Номер телефона (для уточнения деталей заказа).</li>
                        <li>Адрес доставки (для самовывоза в выбранной кофейне).</li>
                        <li>Технические данные: IP-адрес, тип браузера, файлы cookie (для корректной работы сайта).</li>
                    </ul>

                    <h2 className="text-xl lg:text-4xl sm:text-4xl font-bold text-[#735751] mt-6">3. Цели обработки данных</h2>
                    <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 text-sm sm:text-4xl lg:text-2xl">
                        <li>Оформление и выполнение заказов.</li>
                        <li>Связь с пользователем по вопросам заказа.</li>
                        <li>Улучшение работы сайта и пользовательского опыта.</li>
                        <li>Аналитика и статистика (обезличенная).</li>
                    </ul>

                    <h2 className="text-xl lg:text-4xl sm:text-4xl font-bold text-[#735751] mt-6">4. Права пользователя</h2>
                    <p className='text-sm sm:text-4xl lg:text-2xl'>Пользователь имеет право:</p>
                    <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 text-sm sm:text-4xl lg:text-2xl">
                        <li>Запросить информацию о хранящихся данных.</li>
                        <li>Изменить или удалить свои данные (кроме необходимых для исполнения заказа).</li>
                        <li>Отозвать согласие на обработку данных (в этом случае заказ не может быть выполнен).</li>
                    </ul>
                    <p className="text-sm sm:text-3xl lg:text-xl">
                        Для реализации этих прав свяжитесь с нами по email:{' '}
                        <a href="mailto:eracoffeeshopsay@gmail.com" className="text-[#735751] font-bold break-all hover:underline">
                            eracoffeeshopsay@gmail.com
                        </a>
                    </p>

                    <h2 className="text-xl lg:text-4xl sm:text-4xl font-bold text-[#735751] mt-6">5. Хранение и защита данных</h2>
                    <p className='text-sm sm:text-4xl lg:text-2xl'>Данные хранятся на защищённых серверах с использованием шифрования и ограниченного доступа. Мы не передаём ваши данные третьим лицам, за исключением случаев, предусмотренных законодательством.</p>

                    <h2 className="text-xl lg:text-4xl sm:text-4xl font-bold text-[#735751] mt-6">6. Изменения в политике</h2>
                    <p className='text-sm sm:text-4xl lg:text-2xl'>Мы можем обновлять эту Политику при изменении законодательства или функционала сайта. Актуальная версия всегда доступна по этому адресу.</p>

                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <Link to="/" className="text-[#735751] font-bold hover:underline text-xl sm:text-3xl lg:text-xl">
                            ← Вернуться на главную
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy