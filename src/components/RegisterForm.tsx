import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { AUTH_ROUTE } from '../services/routes'
import axiosInstance from '../services/axiosInstance'

import SubmitButton from './ui/SubmitButton'

const RegisterFormWrapper = styled.form`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 0.25rem;

  border-radius: 0.75rem;
  background-color: var(--bg-card-primary);

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    align-items: center;
    gap: 0.25rem;
    max-width: 24rem;
  }
  @media (min-width: 768px) {
    padding: 2.5rem;
    max-width: 48rem;
  }
`

const RegisterFieldsetWrapper = styled.fieldset`
  grid-area: 1 / 1 / 2 / 3;
`

const ErrorMessage = styled.span`
  color: var(--text-error);
`

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

interface IRegisterForm {
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
  groups: Array<string>
}

const FormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<IRegisterForm>({
    defaultValues: {
      groups: ['1']
    },
    mode: 'onBlur'
  })

  const [warningMessage, setWarningMessage] = useState('')

  const saveElement: SubmitHandler<IRegisterForm> = async (data) => {
    data['groups'] = [...data.groups]

    try {
      await axiosInstance.post('/users/', data)
      window.location.href = AUTH_ROUTE
      reset()
    } catch (error) {
      setWarningMessage(`Ошибка регистрации:${error}`)
    }
  }

  return (
    <section className="grid min-h-screen place-content-center">
      <RegisterFormWrapper onSubmit={handleSubmit(saveElement)}>
        <RegisterFieldsetWrapper className="mx-auto font-bold ">
          Регистрация
        </RegisterFieldsetWrapper>
        <label className="" htmlFor="first_name">
          <span>Имя:</span>
          <InputWrapper
            id="first_name"
            type="text"
            {...register('first_name', {
              required: 'Обязательное поле',
              minLength: {
                value: 5,
                message: 'Нужно больше символов'
              }
            })}
          />
          <ErrorMessage>{errors.first_name?.message}</ErrorMessage>
        </label>
        <label className="" htmlFor="last_name">
          <span>Фамилия:</span>
          <InputWrapper
            id="last_name"
            type="text"
            {...register('last_name', {
              required: 'Обязательное поле',
              minLength: {
                value: 5,
                message: 'Нужно больше символов'
              }
            })}
          />
          <ErrorMessage>{errors.last_name?.message}</ErrorMessage>
        </label>
        <label className="" htmlFor="email">
          <span>Почта:</span>
          <InputWrapper
            id="email"
            type="text"
            {...register('email', {
              required: 'Обязательное поле',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Не формат почты'
              }
            })}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>
        </label>
        <label className="" htmlFor="username">
          <span>Логин:</span>
          <InputWrapper
            id="username"
            type="text"
            {...register('username', {
              required: 'Обязательное поле',
              minLength: {
                value: 5,
                message: 'Нужно больше символов'
              }
            })}
          />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </label>
        <label className="" htmlFor="groups">
          <span>Работник:</span>
          <select className="" id="groups" {...register('groups')}>
            <option value="1">Заказчик</option>
            <option value="2">Фрилансер</option>
          </select>
          <ErrorMessage>{errors.groups?.message}</ErrorMessage>
        </label>
        <label htmlFor="password">
          <span>Пароль:</span>
          <InputWrapper
            id="password"
            type="password"
            {...register('password', {
              required: 'Обязательное поле',
              minLength: {
                value: 5,
                message: 'Нужно больше символов'
              }
            })}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </label>
        <Link className="underline" to={AUTH_ROUTE}>
          Уже есть аккаунт?
        </Link>
        <SubmitButton isValid={isValid} type="submit">
          Зарегистрироваться
        </SubmitButton>
        <span className={`text-red-600} max-w-sm`}>{warningMessage}</span>
      </RegisterFormWrapper>
    </section>
  )
}

export default FormComponent
