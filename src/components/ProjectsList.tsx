import React, { useEffect, useState } from 'react'

import customerId from '../services/customerId'
import axiosInstance from '../services/axiosInstance'
import IProject from '../types/project'

import Pagination from './ui/Pagination'
import Project from './ui/Project'
import Input from './ui/Input'

interface SearchProps {
  background?: string
}

const ProjectsList = () => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [next, setNext] = useState('')
  const [prev, setPrev] = useState('')
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  const setData = (url: string) => {
    axiosInstance
      .get(url)
      .then((response) => {
        setProjects(response.data.results)
        if (response.data.next != null) {
          setNext(response.data.next.slice(26))
        } else {
          setNext('')
        }
        if (response.data.previous != null) {
          setPrev(response.data.previous.slice(26))
        } else {
          setPrev('')
        }

        return response
      })
      .catch((error) => {
        console.error('Ошибка запроса проектов:', error)
      })
  }
  const handleChangeList = (e: { target: { name: any; value: any } }) => {
    setFilter(String([e.target.value]))
  }
  const handleSearch = (e: { target: { name: any; value: any } }) => {
    setSearch(String([e.target.value]))
  }
  const createRequest = (id: number, event: any) => {
    event.preventDefault()
    event.stopPropagation()

    const formData = {
      freelancer: [customerId]
    }

    axiosInstance
      .patch(`/projects/${id}/add_freelancer/`, formData)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error('Ошибка отклика на проект:', error)
      })
  }

  useEffect(() => {
    console.log(123)
    setData(`/projects/?ordering=${filter}&search=${search}`)
  }, [filter, search])

  const projectsList =
    projects.length > 0
      ? projects.map((item) => (
          <Project key={item.id} project={item}>
            <button
              className="mx-auto mt-4 rounded-md border-2 bg-[#246BFD] p-2 text-white duration-300 ease-linear hover:bg-[#246BFD]/80 focus:border-black focus:outline-0 active:bg-[#246BFD]/60 active:shadow-blue-900"
              onClick={createRequest.bind(null, item?.id)}
            >
              Откликнуться
            </button>
          </Project>
        ))
      : 'нет проектов'

  return (
    <section className="mx-auto max-w-2xl">
      <h2 className="w-fit text-center font-bold">Список проектов:</h2>
      <div className="flex flex-col justify-between gap-1">
        <label className="hidden text-black" htmlFor="search">
          Искать:
        </label>
        <Input id="search" name="search" type="search" value={search} onChange={handleSearch} />
        <div>
          <label className="text-black" htmlFor="filter">
            Сортировать по:
          </label>
          <select
            className="text-black"
            id="filter"
            name="filter"
            value={filter}
            onChange={handleChangeList}
          >
            <option className="text-black" value="-pub_date">
              По дате
            </option>
            <option className="text-black" value="-urgency">
              По срочности
            </option>
            <option className="text-black" value="-payment">
              По стоимости
            </option>
          </select>
        </div>
      </div>
      <ul className="mx-auto flex w-fit flex-col gap-10 text-black">{projectsList}</ul>
      <Pagination next={next} prev={prev} setData={setData} />
    </section>
  )
}

export default ProjectsList
