import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

import axiosInstance from '../../services/axiosInstance'
import { AuthContext } from '../../services/Providers/AuthProvider'

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

const FormComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<IAuthForm>({
    mode: 'onBlur'
  })

  const [warningMessage, setWarningMessage] = useState('')
  const navigate = useNavigate()
  const { setIsAuth, extractUserIdFromToken } = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true)
      extractUserIdFromToken()
      navigate('/')
    }
  }, [])

  const sendRequest: SubmitHandler<IAuthForm> = async (data) => {
    try {
      const { headers } = await axiosInstance.post('/token/', data)
      const token = headers['authorization']

      localStorage.setItem('token', token)
      if (localStorage.getItem('token')) {
        setIsAuth(true)
        extractUserIdFromToken()
        navigate('/')
      }
    } catch (error) {
      toast.error(`Ошибка авторизации: ${error}`)
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
