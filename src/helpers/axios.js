//Axios Configs


import axios from "axios";
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL="https://keshavarz.app/api";
window.axios.interceptors.response.use(
    response => {

        return response; // Return the response or modify it before it's returned
    },
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('customer_keshavarz_token');
            localStorage.removeItem('customer_keshavarz_user');
            window.location.href = '/auth';
        }

        return Promise.reject(error);

    }
)
