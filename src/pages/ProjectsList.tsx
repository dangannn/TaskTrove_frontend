import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast, Toaster } from 'sonner'
import { useInView } from 'react-intersection-observer'

import axiosInstance from '../services/axiosInstance'
import IProject from '../types/project'
import { AuthContext } from '../services/Providers/AuthProvider'

import { Project } from '../components/ui/Project/Project'
import Input from '../components/ui/Input'

const LIMIT_PROJECTS = 3

const Select = styled.select`
  background-color: var(--bg-primary);
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
`

const BlockOnServer = styled.div`
  height: 1px;
`

const Option = styled.option`
  padding: 8px;
`
const ProjectsList = () => {
  const { customerId } = useContext(AuthContext)
  const [projects, setProjects] = useState<IProject[]>([])
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [isAllProjectsRequested, setIsAllProjectsRequested] = useState(false)

  const getProjectsRequest = async (limit: number, offset: number) => {
    try {
      setLoading(true)
      const { data } = await axiosInstance.get(
        `/projects/?ordering=${filter}&search=${search}&limit=${limit}&offset=${offset}`
      )

      if (data) {
        setProjects((prev) => [...prev, ...data.results])
        if (data.count === projects.length) {
          setIsAllProjectsRequested(true)
        }
      }
    } catch (error) {
      toast.error('Ошибка поиска')
    } finally {
      setLoading(false)
    }
  }
  const handleChangeList = (e: { target: { name: any; value: any } }) => {
    setFilter(String([e.target.value]))
  }
  const handleSearch = (e: { target: { name: any; value: any } }) => {
    setSearch(String([e.target.value]))
  }
  const createRequest = async (id: number, event: any) => {
    event.preventDefault()
    event.stopPropagation()

    const formData = {
      freelancer: [customerId]
    }

    try {
      await axiosInstance.patch(`/projects/${id}/add_freelancer/`, formData)
      toast.success('Вы откликнулись')
    } catch (error) {
      toast.error('Ошибка отклика на проект')
    }
  }
  const { ref, inView } = useInView({
    threshold: 0.1
  })

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1)
    }
  }, [inView])

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
        <label className="hidden" htmlFor="search">
          Искать:
        </label>
        <Input id="search" name="search" type="search" value={search} onChange={handleSearch} />
        <div className="p-1">
          <label className="" htmlFor="filter">
            Сортировать по:
          </label>
          <Select id="filter" name="filter" value={filter} onChange={handleChangeList}>
            <Option value="-pub_date">По дате</Option>
            <Option value="-urgency">По срочности</Option>
            <Option value="-payment">По стоимости</Option>
          </Select>
        </div>
      </div>
      <ul className="mx-auto flex w-fit flex-col gap-10">{projectsList}</ul>
      {loading && <div>Loading...</div>}
      {!loading && !isAllProjectsRequested && <BlockOnServer ref={ref} />}
      <Toaster />
    </section>
  )
}

export default ProjectsList
