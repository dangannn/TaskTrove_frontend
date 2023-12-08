import React, { useEffect, useState } from 'react'

import axiosInstance from '../services/axiosInstance'
import IProject from '../types/project'

import Project from './ui/Project'

const Home = () => {
  const [bestWeekProjects, setBestWeekProjects] = useState<IProject[]>([])
  const [bestYearProjects, setBestYearProjects] = useState<IProject[]>([])

  useEffect(() => {
    axiosInstance
      .get('/projects/best_week_projects/')
      .then((response) => {
        setBestWeekProjects(response.data)

        return response
      })
      .catch((error) => {
        console.error('Ошибка запроса лучших проектов недели:', error)
      })

    axiosInstance
      .get('/projects/best_year_projects/')
      .then((response) => {
        setBestYearProjects(response.data)

        return response
      })
      .catch((error) => {
        console.error('Ошибка запроса лучших проектов года:', error)
      })
  }, [])

  const bestWeekProjectsList =
    bestWeekProjects.length > 0
      ? bestWeekProjects.map((item) => <Project key={item.id} project={item} />)
      : 'нет проектов'

  const bestYearProjectsList =
    bestYearProjects.length > 0
      ? bestYearProjects.map((item) => <Project key={item.id} project={item} />)
      : 'нет проектов'

  return (
    <section>
      <h2>Лучшие проекты недели</h2>
      <ul className="mx-auto flex w-fit flex-col gap-10 text-black">{bestWeekProjectsList}</ul>
      <h2>Лучшие проекты года</h2>
      <ul className="mx-auto flex w-fit flex-col gap-10 text-black">{bestYearProjectsList}</ul>
    </section>
  )
}

export default Home
