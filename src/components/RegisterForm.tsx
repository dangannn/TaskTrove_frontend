import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { AUTH_ROUTE } from '../services/routes'

import Input from './ui/Input'

const FormComponent = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    groups: ['1']
  })

  const [warningMessage, setWarningMessage] = useState('')

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleChangeList = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log(formData)
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: 'http://127.0.0.1:8000/api/users/',
      data: formData,
      responseType: 'json'
    })
      .then((response) => response.data)
      .then((data) => {
        console.log(data)
        window.location.href = AUTH_ROUTE

        return data
      })
      .catch((error) => {
        setWarningMessage(`Ошибка регистрации:${error}`)
      })
  }

  return (
    <section className="grid min-h-screen place-content-center">
      <form
        className="drop-shadow-3xl mx-auto flex flex-col gap-1 rounded-xl bg-white p-4 sm:max-w-sm md:max-w-3xl md:p-10"
        onSubmit={handleSubmit}
      >
        <fieldset className="mx-auto font-bold ">Авторизация</fieldset>
        <label className="" htmlFor="first_name">
          Имя:
        </label>
        <Input
          id="first_name"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
        />
        <label className="" htmlFor="last_name">
          Фамилия:
        </label>
        <Input
          id="last_name"
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
        />
        <label className="" htmlFor="email">
          Почта:
        </label>
        <Input id="email" name="email" type="text" value={formData.email} onChange={handleChange} />
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
        <label className="" htmlFor="groups">
          Работник:
        </label>
        <select
          className=""
          id="groups"
          name="groups"
          value={formData.groups[0]}
          onChange={handleChangeList}
        >
          <option className="" value="1">
            Заказчик
          </option>
          <option className="" value="2">
            Фрилансер
          </option>
        </select>
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
        <Link className="" to={AUTH_ROUTE}>
          Уже есть аккаунт?
        </Link>
        <button
          className="mt-4 rounded-3xl border-2 bg-[#246BFD] py-2 duration-300 ease-linear focus:border-black focus:outline-0 active:shadow-blue-900"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <span className="max-w-sm text-red-600">{warningMessage}</span>
      </form>
    </section>
  )
}

export default FormComponent
