import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Базовый URL
  timeout: 0,
  // withCredentials: true, // Включение отправки кук с запросами
  headers: {
    'Content-Type': 'application/json' // Тип контента по умолчанию
  },
  responseType: 'json'
})

export default axiosInstance
