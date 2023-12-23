import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'sonner'

import axiosInstance from '../services/axiosInstance'
import IProject from '../types/project'

import Project from './ui/Project'

const Section = styled.section`
  max-width: 64rem;
  margin: 0 auto;
  @media screen and (max-width: 640px) {
    margin: 0 1rem;
  }
`

const Title = styled.h2`
  text-align: center;
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
  gap: 10px;

  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`
const Home = () => {
  const [bestWeekProjects, setBestWeekProjects] = useState<IProject[]>([])
  const [bestYearProjects, setBestYearProjects] = useState<IProject[]>([])

  const getBestWeekProjects = async () => {
    try {
      const { data } = await axiosInstance.get('/projects/best_week_projects/')

      setBestWeekProjects(data)
    } catch (error) {
      toast.error('Ошибка получения проектов')
    }
  }

  const getBestYearProjects = async () => {
    try {
      const { data } = await axiosInstance.get('/projects/best_year_projects/')

      setBestYearProjects(data)
    } catch (error) {
      toast.error('Ошибка получения проектов')
    }
  }

  useEffect(() => {
    getBestWeekProjects()
    getBestYearProjects()
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
