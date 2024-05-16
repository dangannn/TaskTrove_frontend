import React, { FC } from 'react'
import IProject from '../../../types/project'
import { ProjectWrapper } from '../../../global-styles'

interface IProjectProps {
  project: IProject | undefined
  key: number | undefined
  children?: any | undefined
}

export const Project: FC<IProjectProps> = ({ project, children }) => {
  return (
    <>
      <ProjectWrapper key={project?.id}>
        <h3 className="text-xl">{project?.name}</h3>
        <span className="text-sm">{new Date(project?.pub_date ?? '').toLocaleString('ru-RU')}</span>
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
