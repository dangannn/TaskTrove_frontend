import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import Freelancer from '../types/freelancer'
import axiosInstance from '../services/axiosInstance'
import IProject from '../types/project'

import Project from './ui/Project'

const ProjectDetails = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [project, setProject] = useState<IProject>()
  const { id } = useParams()

  useEffect(() => {
    axiosInstance
      .get(`/projects/${id}`)
      .then((response) => {
        setProject(response.data)

        return response
      })
      .catch((error) => {
        // Обработка ошибки
        console.error('Ошибка вывода постов:', error)
      })
    console.log(project)
    console.log(id)
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `http://127.0.0.1:8000/api/projects/${id}/freelancers/`,
      responseType: 'json'
    })
      .then((response) => {
        setFreelancers(response.data)

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода постов:', error)
      })
    console.log(freelancers)
  }, [])

  const freelancersList =
    freelancers.length > 0
      ? freelancers.map((item) => (
          <>
            <li className="mx-2 max-w-sm rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:mx-auto">
              <Link to={`/freelancers/${item?.id}`}>
                <h3 className="text-xl text-[#4E64F9]">{item?.first_name + item?.last_name}</h3>
              </Link>
              <p className="text-base text-[#4E64F9]">Почта:{item?.email}</p>
              <p className="text-base text-[#4E64F9]">Номер телефона:{item?.phone_number}</p>
            </li>
          </>
        ))
      : 'список пуст'

  return (
    <div>
      <Project key={project?.id} project={project} />
      <ul className="width-full mx-auto flex w-fit flex-col gap-10">
        Список откликнувшихся фрилансеров:
        {freelancersList}
      </ul>
    </div>
  )
}

export default ProjectDetails
