import React, { useEffect, useState } from 'react'

import customerId from '../services/customerId'
import axiosInstance from '../services/axiosInstance'
import IProject from '../types/project'

import Pagination from './ui/Pagination'
import Project from './ui/Project'
import Input from './ui/Input'

const LIMIT_PROJECTS = 3
const ProjectsList = () => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  const getProjectsRequest = async (limit: number, offset: number) => {
    const { data } = await axiosInstance.get(
      `/projects/?ordering=${filter}&search=${search}&limit=${limit}&offset=${offset}`
    )

    if (data) {
      setProjects(data.results)
      setTotalCount(data.count)
    }
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
    getProjectsRequest(LIMIT_PROJECTS, (page - 1) * LIMIT_PROJECTS)
  }, [page, filter, search])

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
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPage={Math.ceil(totalCount / LIMIT_PROJECTS)}
      />
    </section>
  )
}

export default ProjectsList
