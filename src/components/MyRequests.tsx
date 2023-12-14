import React, { useEffect, useState } from 'react'
import axios from 'axios'

import customerId from '../services/customerId'
import IProject from '../types/project'

const MyRequests = () => {
  const [projects, setProjects] = useState<IProject[]>()

  const declineRequest = (
    id: any,
    event: { preventDefault: () => void; stopPropagation: () => void }
  ) => {
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
          <li className="md:w-3xl mx-auto mb-4 items-start rounded-xl bg-white p-4 drop-shadow-xl sm:mx-auto md:max-w-3xl">
            <h3 className="text-xl text-[#4E64F9]">{item?.name}</h3>
            <span className="text-sm text-[#BDBDBD]">Заказчик: {item?.customer}</span>
            <p className="text-base text-black">{item?.description}</p>
            <button
              className="mx-auto mt-4 rounded-md border-2 bg-[#246BFD] p-2 text-white duration-300 ease-linear hover:bg-[#246BFD]/80 focus:border-black focus:outline-0 active:bg-[#246BFD]/60 active:shadow-blue-900"
              onClick={declineRequest.bind(null, item?.id)}
            >
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
