import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

import axiosInstance from '../../services/axiosInstance'

interface IAuthForm {
  username: string
  password: string
}

const InputWrapper = styled.input`
  color: var(--text-primary);
  display: flex;
  padding: 0.75rem;
  margin-top: 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  border-width: 1px;
  border-color: #e5e7eb;
  outline-style: none;
  width: 100%;
  height: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  transition-duration: 300ms;
  transition-timing-function: linear;

  &:focus {
    border-color: var(--blue);
  }
`

const FormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<IAuthForm>({
    mode: 'onBlur'
  })

  const [warningMessage, setWarningMessage] = useState('')

  const setAuthToken = (token: string) => {
    if (token.length > 0) {
      axios.defaults.headers.common['Authorization'] = `${token}`
      axiosInstance.defaults.headers.common['Authorization'] = `${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
      delete axiosInstance.defaults.headers.common['Authorization']
    }
  }

  const token = localStorage.getItem('token')

  if (token) {
    setAuthToken(token)
  }

  const sendRequest: SubmitHandler<IAuthForm> = async (data) => {
    try {
      const { headers } = await axiosInstance.post('/token/', data)

      const token = headers['authorization']

      // set JWT token to localnpm run de
      localStorage.setItem('token', token)

      // set token to axios common header
      setAuthToken(token)
      // redirect user to home page
      window.location.href = '/'
    } catch (error) {
      toast.error(`Ошибка авторизации:${error}`)
    }
  }

  return (
    <section className="grid min-h-screen place-content-center">
      <form
        className="drop-shadow-3xl mx-auto flex flex-col gap-1 rounded-xl bg-white p-4 sm:max-w-sm md:max-w-3xl md:p-10"
        onSubmit={handleSubmit(sendRequest)}
      >
        <fieldset className="mx-auto font-bold ">Авторизация</fieldset>
        <label className="" htmlFor="username">
          Логин:
        </label>
        <InputWrapper
          id="username"
          type="text"
          {...register('username', {
            required: 'Обязательное поле',
            minLength: {
              value: 1,
              message: 'Нужно больше символов'
            }
          })}
        />
        <label className="" htmlFor="password">
          Пароль:
        </label>
        <InputWrapper
          id="password"
          type="password"
          {...register('password', {
            required: 'Обязательное поле',
            minLength: {
              value: 1,
              message: 'Нужно больше символов'
            }
          })}
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
      <Toaster />
    </section>
  )
}

export default FormComponent
