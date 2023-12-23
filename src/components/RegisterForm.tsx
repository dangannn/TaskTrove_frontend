import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { data } from 'autoprefixer'

import { AUTH_ROUTE } from '../services/routes'
import axiosInstance from '../services/axiosInstance'

import Input from './ui/Input'

interface IRegisterForm {
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
  groups: Array<string>
}

const FormComponent = () => {
  const [formData, setFormData] = useState<IRegisterForm>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    groups: ['1']
  })

  const {
    register, // метод для регистрации вашего инпута, для дальнейшей работы с ним
    handleSubmit, // метод для получения данных формы, если валидация прошла успешна
    formState: { errors }, // errors - список ошибок валидации для всех полей формы
    reset // метод для очистки полей формы
  } = useForm<IRegisterForm>({
    mode: 'onBlur' // парметр onBlur - отвечает за запуск валидации при не активном состоянии поля
  })

  const [warningMessage, setWarningMessage] = useState('')

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleChangeList = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] })
  }

  const saveElement: SubmitHandler<IRegisterForm> = (data) => {
    setFormData(data)
    reset()
  }

  const handleFormSubmit = async () => {
    console.log(formData)
    try {
      const { data } = await axiosInstance.post('/users/', formData)

      if (data) {
        window.location.href = AUTH_ROUTE
      }
    } catch (error) {
      setWarningMessage(`Ошибка регистрации:${error}`)
    }
  }

  return (
    <section className="grid min-h-screen place-content-center">
      <form
        className="drop-shadow-3xl mx-auto flex flex-col gap-1 rounded-xl bg-white p-4 sm:max-w-sm md:max-w-3xl md:p-10"
        onSubmit={handleSubmit(handleFormSubmit)}
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
        <div>{errors.first_name?.message}</div>
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
        <div>{errors.last_name?.message}</div>
        <label className="" htmlFor="email">
          Почта:
        </label>
        <Input id="email" name="email" type="text" value={formData.email} onChange={handleChange} />
        <div>{errors.email?.message}</div>
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
        <div>{errors.username?.message}</div>
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
          <option value="1">Заказчик</option>
          <option value="2">Фрилансер</option>
        </select>
        <div>{errors.groups?.message}</div>
        <label htmlFor="password">Пароль:</label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        <div>{errors.password?.message}</div>
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
