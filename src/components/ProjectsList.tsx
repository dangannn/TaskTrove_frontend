import React, { useEffect, useState } from 'react'
import axios from 'axios'

import customerId from '../services/customerId'
import axiosInstance from '../services/axiosInstance'
import Project from '../types/project'

import Pagination from './ui/Pagination'

const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [next, setNext] = useState('')
  const [prev, setPrev] = useState('')

  const setData = (url: string) => {
    axiosInstance
      .get('/projects/')
      .then((response) => {
        setProjects(response.data.results)
        if (response.data.next != null) {
          setNext(response.data.next.slice(26))
        }
        if (response.data.previous != null) {
          setPrev(response.data.previous.slice(26))
        }

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода фрилансеров:', error)
      })
  }

  const createRequest = (id: number, event) => {
    event.preventDefault()
    event.stopPropagation()

    const formData = {
      freelancer: [customerId]
    }
    const addFreelancerUrl = `http://127.0.0.1:8000/api/projects/${id}/add_freelancer/`

    axios({
      method: 'patch',
      headers: {
        'Content-Type': 'application/json'
      },
      url: addFreelancerUrl,
      data: formData,
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
    axiosInstance
      .get('/projects/')
      .then((response) => {
        setProjects(response.data.results)
        if (response.data.next != null) {
          setNext(response.data.next.slice(26))
        }
        if (response.data.previous != null) {
          setPrev(response.data.previous.slice(26))
        }

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода проектов:', error)
      })
  }, [])

  const projectsList =
    projects.length > 0
      ? projects.map((item) => (
          <li
            key={item?.id}
            className="md:w-3xl mx-auto mb-4 items-start rounded-xl bg-white p-4 drop-shadow-xl sm:mx-auto md:max-w-3xl"
          >
            <h3 className="text-xl text-[#4E64F9]">{item?.name}</h3>
            <span className="text-sm text-[#BDBDBD]">
              {new Date(item?.pub_date).toDateString('ru')}
            </span>
            <p className="text-base text-[#686868]">{item?.description}</p>
            <button
              className="mx-auto mt-4 rounded-md border-2 bg-[#246BFD] p-2 text-white duration-300 ease-linear hover:bg-[#246BFD]/80 focus:border-black focus:outline-0 active:bg-[#246BFD]/60 active:shadow-blue-900"
              onClick={createRequest.bind(null, item?.id)}
            >
              Откликнуться
            </button>
          </li>
        ))
      : 'нет проектов'

  return (
    <section className="mx-auto max-w-2xl">
      <span className="mx-auto w-fit text-center font-bold">Список проектов:</span>
      <ul className="mx-auto flex w-fit flex-col gap-10 text-black">{projectsList}</ul>
      <Pagination next={next} prev={prev} setData={setData} />
    </section>
  )
}

export default ProjectsList
