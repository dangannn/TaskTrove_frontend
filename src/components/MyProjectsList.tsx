import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast, Toaster } from 'sonner'

import customerId from '../services/customerId'
import trashIcon from '../assets/images/trashIcon.svg'
import IProject from '../types/project'
import axiosInstance from '../services/axiosInstance'

import Input from './ui/Input'
import Button from './ui/Button'

const MyProjectsList = () => {
  const [projects, setProjects] = useState<IProject[]>([])

  const [formData, setFormData] = useState({
    description: '',
    customer: customerId,
    name: '',
    urgency: '',
    payment: 0
  })

  const getProjects = async () => {
    try {
      const { data } = await axiosInstance.get(`/projects/${customerId}/projects/`)

      setProjects(data)
    } catch (error) {
      toast.error('Ошибка вывода постов')
    }
  }

  useEffect(() => {
    getProjects()
  }, [])

  const removeProject = async (id: number, event: any) => {
    event.preventDefault()
    event.stopPropagation()

    const projectUrl = `/projects/${id}/`

    try {
      const { data } = await axiosInstance.delete(projectUrl)

      toast.success('Проект удален')
    } catch (error) {
      toast.error('Ошибка удаления проекта')
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    if (e.target.name === 'payment') {
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    event.stopPropagation()
    try {
      const { data } = await axiosInstance.post('/projects/', formData)

      toast.success('Проект создан')
    } catch (err) {
      toast.error('Ошбика создания проекта')
    }
  }

  const projectsList = projects
    ? projects.map((item) => (
        <>
          <li className="md:w-3xl mx-auto mb-4 flex items-start justify-between rounded-xl bg-white p-4 drop-shadow-xl sm:mx-auto md:max-w-3xl">
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
    : 'нет проектов'

  return (
    <>
      <form
        action=""
        className="mx-auto mb-4 flex flex-col gap-1 rounded-xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:max-w-sm md:max-w-lg md:p-10"
      >
        <fieldset>Создать проект</fieldset>
        <label className="" htmlFor="description">
          Название:
        </label>
        <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
        <label className="" htmlFor="description">
          Описание:
        </label>
        <Input
          id="description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
        />
        <label className="" htmlFor="urgency">
          Срочность:
        </label>
        <Input
          id="urgency"
          name="urgency"
          type="date"
          value={formData.urgency}
          onChange={handleChange}
        />
        <label className="" htmlFor="payment">
          Оплата:
        </label>
        <Input
          id="payment"
          name="payment"
          type="number"
          value={formData.payment}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Добавить проект</Button>
      </form>
      <ul className="width-full mx-auto flex w-fit flex-col gap-10 ">
        Список моих проектов:
        {projectsList}
      </ul>
      <Toaster />
    </>
  )
}

export default MyProjectsList
