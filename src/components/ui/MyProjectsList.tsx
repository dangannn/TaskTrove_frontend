import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import customerId from '../../services/customerId'

import Input from './Input'
import Button from './Button'

const MyProjectsList = () => {
  const [projects, setProjects] = useState([null])

  const [formData, setFormData] = useState({
    description: '',
    customer: customerId,
    name: ''
  })

  const removeFromFavoriteList = (id, event) => {
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
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

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
        // Обработка ошибки
        console.error('Ошибка вывода постов:', error)
      })
    console.log(projects)
  }, [])
  const projectsList = projects
    ? projects.map((item) => (
        <>
          <li className="mx-2 max-w-sm rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:mx-auto">
            <h3 className="text-xl text-[#4E64F9]">{item?.name}</h3>
            <p className="text-base text-[#4E64F9]">{item?.description}</p>
            <button className="border-2" onClick={removeFromFavoriteList.bind(null, item?.id)}>
              Удалить проект
            </button>
            <Link to={`/project_details/${item?.id}`}>Отклики</Link>
          </li>
        </>
      ))
    : 'нет проектов'

  return (
    <>
      <form action="" className="mx-auto max-w-sm border-2">
        <fieldset>Оставить комментарий</fieldset>
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
