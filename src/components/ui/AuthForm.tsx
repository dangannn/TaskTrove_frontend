import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Input from './Input'

const FormComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [warningMessage, setWarningMessage] = useState('')

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const setAuthToken = (token: string) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else delete axios.defaults.headers.common['Authorization']
  }

  const token = localStorage.getItem('token')

  if (token) {
    setAuthToken(token)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: 'http://127.0.0.1:8000/api/token/',
      data: formData,
      responseType: 'json'
    })
      .then((response) => {
        return response.data
      })
      .then((data) => {
        const token = data.access
        const { refresh } = data

        //set JWT token to local
        localStorage.setItem('token', token)
        localStorage.setItem('refresh', refresh)
        //set token to axios common header
        setAuthToken(token)
        //redirect user to home page
        window.location.href = '/projects'

        return token
      })
      .catch((error) => {
        setWarningMessage(`Ошибка авторизации:${error}`)
      })
  }

  return (
    <section className="grid min-h-screen place-content-center">
      <form
        className="drop-shadow-3xl mx-auto flex flex-col gap-1 rounded-xl bg-white p-4 sm:max-w-sm md:max-w-3xl md:p-10"
        onSubmit={handleSubmit}
      >
        <fieldset className="mx-auto font-bold ">Авторизация</fieldset>
        <label className="" htmlFor="username">
          Логин:
        </label>
        <Input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
        <label className="" htmlFor="password">
          Пароль:
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Link className="" to="/register">
          Создать аккаунт?
        </Link>
        <button
          className="mt-4 rounded-3xl border-2 bg-[#246BFD] py-2 duration-300 ease-linear hover:bg-[#246BFD]/80 focus:border-black focus:outline-0 active:bg-[#246BFD]/60 active:shadow-blue-900"
          type="submit"
        >
          Авторизоваться
        </button>
        <span className="max-w-sm text-red-600">{warningMessage}</span>
      </form>
    </section>
  )
}

export default FormComponent
