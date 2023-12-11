import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import customerId from '../services/customerId'
import trashIcon from '../assets/images/trashIcon.svg'
import IProject from '../types/project'

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

  const removeFromFavoriteList = (id: number, event: any) => {
    event.preventDefault()
    event.stopPropagation()

    const projectUrl = `http://127.0.0.1:8000/api/projects/${id}/`

    axios({
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      url: projectUrl,
      responseType: 'json'
    })
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода постов:', error)
      })
  }
  const handleChange = (e: { target: { name: any; value: any } }) => {
    if (e.target.name != 'payment') {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    } else {
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) })
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log(formData)
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: 'http://127.0.0.1:8000/api/projects/',
      data: formData,
      responseType: 'json'
    })
      .then((response) => {
        return response.data
      })
      .then((data) => {
        const token = data.access

        return token
      })
      .catch((error) => {
        console.error(`Ошибка авторизации:${error}`)

        return error
      })
  }

  useEffect(() => {
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `http://127.0.0.1:8000/api/projects/${customerId}/projects/`,
      responseType: 'json'
    })
      .then((response) => {
        setProjects(response.data)

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода постов:', error)
      })
    console.log(projects)
  }, [])
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
              onClick={removeFromFavoriteList.bind(null, item?.id)}
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
        className="mx-auto mb-4 flex flex-col gap-1 rounded-xl bg-white p-4 drop-shadow-xl sm:max-w-sm md:max-w-lg md:p-10"
      >
        <fieldset>Создать проект</fieldset>
        <label className="text-black" htmlFor="description">
          Название:
        </label>
        <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
        <label className="text-black" htmlFor="description">
          Описание:
        </label>
        <Input
          id="description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
        />
        <label className="text-black" htmlFor="urgency">
          Срочность:
        </label>
        <Input
          id="urgency"
          name="urgency"
          type="date"
          value={formData.urgency}
          onChange={handleChange}
        />
        <label className="text-black" htmlFor="payment">
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
      <ul className="width-full mx-auto flex w-fit flex-col gap-10 text-black">
        Список моих проектов:
        {projectsList}
      </ul>
    </>
  )
}

export default MyProjectsList
