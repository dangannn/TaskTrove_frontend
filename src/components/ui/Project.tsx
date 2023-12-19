import React from 'react'
import styled from 'styled-components'

import IProject from '../../types/project'

interface IProjectProps {
  project: IProject | undefined
  key: number | undefined
  children?: any | undefined
}

const ProjectWrapper = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  background-color: var(--bg-card-primary);
  //border-width: 2px;
  //-webkit-box-shadow: 0px 0px 35px 2px rgba(0, 0, 51, 1);
  //-moz-box-shadow: 0px 0px 35px 2px rgba(0, 0, 51, 1);
  //box-shadow: 0px 0px 35px 2px rgba(0, 0, 51, 1);

  @media (min-width: 640px) {
  }
  @media (min-width: 768px) {
    max-width: 48rem;
  }
`
const Project = ({ project, children }: IProjectProps) => {
  return (
    <>
      <ProjectWrapper key={project?.id}>
        <h3 className="text-xl">{project?.name}</h3>
        <span className="text-sm">{new Date(project?.pub_date || '').toLocaleString('ru-RU')}</span>
        <p className="text-base">
          <span className="font-bold">Оплата: </span>
          {project?.payment} р
        </p>
        <p className="text-base">
          <span className="font-bold">Срочность: </span>
          {project?.urgency}
        </p>
        <p className="text-base">
          <span className="font-bold">Описание: </span>
          {project?.description}
        </p>
        {children}
      </ProjectWrapper>
    </>
  )
}

export default Project
