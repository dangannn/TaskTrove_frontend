import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useQuery } from 'react-query'

import trashIcon from '../assets/images/trashIcon.svg'
import IProject from '../types/project'
import axiosInstance from '../services/axiosInstance'
import { AuthContext } from '../services/Providers/AuthProvider'

import ProjectPdf from '../components/ui/ProjectPdf'
import SubmitButton from '../components/ui/SubmitButton'

interface IProjectForm {
  description: string
  customer: number
  name: string
  urgency: Date
  payment: number
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
const MyProjectsList = () => {
  const { customerId } = useContext(AuthContext)
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<IProjectForm>({
    defaultValues: {
      customer: customerId,
      urgency: new Date(0),
      payment: 0
    },
    mode: 'onBlur'
  })

  const createProject: SubmitHandler<IProjectForm> = async (data) => {
    try {
      await axiosInstance.post(`/projects/${customerId}/create_project/`, data)
      reset()
      toast.success('Проект создан')
    } catch (err) {
      toast.error('Ошибка создания проекта')
    }
  }

  const getProjects = async () => {
    try {
      const { data } = await axiosInstance.get(`/projects/${customerId}/projects/`)

      return data
    } catch (error) {
      toast.error('Ошибка вывода постов')
    }
  }
  const { data: projects, refetch } = useQuery('getProjects', getProjects)

  const removeProject = async (id: number, event: any) => {
    event.preventDefault()
    event.stopPropagation()

    const projectUrl = `/projects/${id}/`

    try {
      await axiosInstance.delete(projectUrl)

      toast.success('Проект удален')
      refetch()
    } catch (error) {
      toast.error('Ошибка удаления проекта')
    }
  }

  return (
    <>
      <form
        className="mx-auto mb-4 flex flex-col gap-1 rounded-xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:max-w-sm md:max-w-lg md:p-10"
        onSubmit={handleSubmit(createProject)}
      >
        <fieldset>Создать проект</fieldset>
        <label className="" htmlFor="description">
          Название:
        </label>
        <InputWrapper
          id="name"
          type="text"
          {...register('name', {
            required: 'Обязательное поле',
            minLength: {
              value: 5,
              message: 'Нужно больше символов'
            }
          })}
        />
        <label className="" htmlFor="description">
          Описание:
        </label>
        <InputWrapper
          id="description"
          type="text"
          {...register('description', {
            required: 'Обязательное поле',
            minLength: {
              value: 5,
              message: 'Нужно больше символов'
            }
          })}
        />
        <label className="" htmlFor="urgency">
          Срочность:
        </label>
        <InputWrapper
          id="urgency"
          type="date"
          {...register('urgency', {
            required: 'Обязательное поле'
          })}
        />
        <label className="" htmlFor="payment">
          Оплата:
        </label>
        <InputWrapper
          id="payment"
          type="number"
          {...register('payment', {
            required: 'Обязательное поле'
          })}
        />
        <SubmitButton isValid={isValid} type="submit">
          Добавить проект
        </SubmitButton>
        <PDFDownloadLink
          className="m-auto block border-b-2 border-transparent duration-300 hover:border-black"
          document={
            <ProjectPdf
              customer={getValues('customer')}
              description={getValues('description')}
              name={getValues('name')}
              payment={getValues('payment')}
              urgency={getValues('urgency').toLocaleString()}
            />
          }
          fileName={`${getValues('name')}.pdf`}
        >
          {({ blob, url, loading, error }) => (loading ? 'Загрузка документа...' : 'Скачать pdf')}
        </PDFDownloadLink>
      </form>
      <ul className="width-full mx-auto flex w-fit flex-col gap-10 ">
        Список моих проектов:
        {projects
          ? projects.map((item: IProject) => (
              <>
                <li
                  key={item.id}
                  className="md:w-3xl mx-auto mb-4 flex items-start justify-between rounded-xl bg-white p-4 drop-shadow-xl sm:mx-auto md:max-w-3xl"
                >
                  <div className="max-w-md">
                    <h3 className="text-xl text-[#4E64F9]">{item?.name}</h3>
                    <span className="text-sm text-[#BDBDBD]">
                      {new Date(item?.pub_date).toLocaleString('ru-RU')}
                    </span>
                    <Link
                      className="ease w-fit border-b-2 text-sm text-[#BDBDBD] duration-300 hover:border-b-[#246BFD] hover:text-[#246BFD]"
                      to={`/project_details/${item?.id}`}
                    >
                      Подробнее
                    </Link>
                  </div>
                  <button
                    className="ease w-fit rounded-lg duration-300 hover:bg-red-400 active:bg-red-400/60 "
                    onClick={removeProject.bind(null, item?.id)}
                  >
                    <img alt="удалить проект" className="w-8 p-1" src={trashIcon} />
                  </button>
                </li>
              </>
            ))
          : 'нет проектов'}
      </ul>
      <Toaster />
      );
    </>
  )
}

export default MyProjectsList
