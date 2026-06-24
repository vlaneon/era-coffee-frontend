import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[#f5f0ee] font-BonaNova">
            <Header />
            <div className="max-w-4xl mx-auto px-4 py-20">
                <h1 className="text-4xl md:text-5xl font-bold text-[#735751] mb-6">Политика обработки персональных данных</h1>
                <div className="bg-white rounded-[30px] p-6 md:p-10 shadow-lg space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
                    <p><strong>Дата вступления в силу:</strong> 1 июня 2026 г.</p>

                    <h2 className="text-2xl font-bold text-[#735751] mt-6">1. Общие положения</h2>
                    <p>Настоящая политика обработки персональных данных (далее – Политика) действует в отношении всей информации, которую сайт кофейни «ERA Coffee» (далее – Сайт) может получить о пользователе во время использования Сайта, оформления заказов и взаимодействия с сервисом.</p>

                    <h2 className="text-2xl font-bold text-[#735751] mt-6">2. Какие данные мы собираем</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Имя пользователя (для персонализации и оформления заказа).</li>
                        <li>Адрес электронной почты (для подтверждения заказа и связи).</li>
                        <li>Номер телефона (для уточнения деталей заказа).</li>
                        <li>Адрес доставки (для самовывоза в выбранной кофейне).</li>
                        <li>Технические данные: IP-адрес, тип браузера, файлы cookie (для корректной работы сайта).</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#735751] mt-6">3. Цели обработки данных</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Оформление и выполнение заказов.</li>
                        <li>Связь с пользователем по вопросам заказа.</li>
                        <li>Улучшение работы сайта и пользовательского опыта.</li>
                        <li>Аналитика и статистика (обезличенная).</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#735751] mt-6">4. Права пользователя</h2>
                    <p>Пользователь имеет право:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Запросить информацию о хранящихся данных.</li>
                        <li>Изменить или удалить свои данные (кроме необходимых для исполнения заказа).</li>
                        <li>Отозвать согласие на обработку данных (в этом случае заказ не может быть выполнен).</li>
                    </ul>
                    <p>Для реализации этих прав свяжитесь с нами по email: <a href="mailto:eracoffeeshopsay@gmail.com" className="text-[#735751] font-bold">eracoffeeshopsay@gmail.com</a></p>

                    <h2 className="text-2xl font-bold text-[#735751] mt-6">5. Хранение и защита данных</h2>
                    <p>Данные хранятся на защищённых серверах с использованием шифрования и ограниченного доступа. Мы не передаём ваши данные третьим лицам, за исключением случаев, предусмотренных законодательством.</p>

                    <h2 className="text-2xl font-bold text-[#735751] mt-6">6. Изменения в политике</h2>
                    <p>Мы можем обновлять эту Политику при изменении законодательства или функционала сайта. Актуальная версия всегда доступна по этому адресу.</p>

                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <Link to="/" className="text-[#735751] font-bold hover:underline">← Вернуться на главную</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy