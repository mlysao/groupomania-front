import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000';

export default (() => {
    const http = axios.create({
        baseURL: apiUrl,
    });
    http.interceptors.request.use((config) => {
        const newConfig = { ...config };
        const token = sessionStorage.getItem('token');
        if (token) {
            newConfig.headers.Authorization = `Bearer ${token}`;
        }
        console.log(newConfig)
        return newConfig;
    }, (error) => Promise.reject(error));
    return http;
})();
