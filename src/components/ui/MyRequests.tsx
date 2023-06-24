import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import customerId from '../../services/customerId'

const MyRequests = () => {
  const [projects, setProjects] = useState([null])

  const declineRequest = (id, event) => {
    event.preventDefault()
    event.stopPropagation()

    const projectUrl = `http://127.0.0.1:8000/api/requests/${id}/`

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

  useEffect(() => {
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `http://127.0.0.1:8000/api/users/${customerId}/requests/`,
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
  }, [])
  const projectsList = projects
    ? projects.map((item) => (
        <>
          <li className="mx-2 max-w-sm rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:mx-auto">
            <h3 className="text-xl text-[#4E64F9]">{item?.name}</h3>
            <span className="text-sm text-[#4E64F9]">Заказчик: {item?.customer}</span>
            <p className="text-base text-[#4E64F9]">{item?.description}</p>
            <button className="border-2" onClick={declineRequest.bind(null, item?.id)}>
              Отказаться
            </button>
          </li>
        </>
      ))
    : 'нет проектов'

  return (
    <div>
      <ul className="mx-auto  flex w-fit flex-col gap-10 text-black">
        Список моих запросов:
        {projectsList}
      </ul>
    </div>
  )
}

export default MyRequests
