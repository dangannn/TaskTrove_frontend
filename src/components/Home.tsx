import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import axiosInstance from '../services/axiosInstance'
import IProject from '../types/project'

import Project from './ui/Project'

const Section = styled.section``

const Title = styled.h2`
  text-align: center;
  color: #333; /* Dark gray color */
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 10px;
  @media screen and (max-width: 640px) {
    font-size: 1.2rem;
  }
`

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: auto;
  //display: flex;
  //flex-direction: column;
  gap: 10px;
  color: black;

  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`
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
    <Section>
      <Title>Лучшие проекты недели</Title>
      <List>{bestWeekProjectsList}</List>
      <Title>Лучшие проекты года</Title>
      <List>{bestYearProjectsList}</List>
    </Section>
  )
}

export default Home
