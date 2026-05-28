// Базовый URL для API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Пример использования в функции
export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products/`);
    return response.json();
};

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
};

// И так далее для всех API-запросов...