import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ScrollToTop from './hooks/ScrollToTop';

const Menu = lazy(() => import('./components/Menu'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Profile = lazy(() => import('./components/Profile'));
const History = lazy(() => import('./components/History'));
const NotFound = lazy(() => import('./components/NotFound'));
const HistoryDrinks = lazy(() => import('./components/HistoryDrinks'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
const StaffPage = lazy(() => import('./components/StaffPage'));

const Loading = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0ee]">
        <div className="text-4xl text-[#735751] font-BonaNova animate-pulse">Загрузка...</div>
    </div>
);

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/history/drinks" element={<HistoryDrinks />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/team" element={<StaffPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;