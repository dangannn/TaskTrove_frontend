import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast, Toaster } from 'sonner'

import Freelancer from '../types/freelancer'
import axiosInstance from '../services/axiosInstance'
import IProject from '../types/project'

import { Project } from '../components/ui/Project/Project'

const ProjectDetails = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [project, setProject] = useState<IProject>()
  const { id } = useParams()

  const getProject = async () => {
    try {
      const { data } = await axiosInstance.get(`/projects/${id}`)

      setProject(data)
    } catch (error) {
      toast.error('Ошибка получения проекта')
    }
  }

  const getFreelancers = async () => {
    try {
      const { data } = await axiosInstance.get(`/projects/${id}/freelancers/`)

      setFreelancers(data)
    } catch (error) {
      toast.error('Ошибка получения проекта')
    }
  }

  useEffect(() => {
    getProject()
    getFreelancers()
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
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Проект:</h2>
      <Project key={project?.id} project={project} />
      <ul className="width-full mx-auto flex w-fit flex-col gap-10">
        Список откликнувшихся фрилансеров:
        {freelancersList}
      </ul>
      <Toaster />
    </div>
  )
}

export default ProjectDetails
