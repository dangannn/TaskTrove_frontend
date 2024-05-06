import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 0,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `${token}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const { headers } = await axiosInstance.get('/token/refresh/')

      const token = headers['authorization']

      localStorage.setItem('token', token)
      try {
      } catch (e) {
        console.log(e)
      }
    }
    if (error.response.status === 500) {
      localStorage.setItem('token', '')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
