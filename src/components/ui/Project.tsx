import React from 'react'

import IProject from '../../types/project'

interface IProjectProps {
  project: IProject | undefined
  key: number | undefined
  children?: any | undefined
}

const Project = ({ project, children }: IProjectProps) => {
  return (
    <>
      <div
        key={project?.id}
        className="md:w-3xl projects-start mx-auto mb-4 rounded-xl bg-white p-4 drop-shadow-xl sm:mx-auto md:max-w-3xl"
      >
        <h3 className="text-xl text-[#4E64F9]">{project?.name}</h3>
        <span className="text-sm text-[#BDBDBD]">
          {new Date(project?.pub_date || '').toLocaleString('ru-RU')}
        </span>
        <p className="text-base text-[#686868]">
          <span className="font-bold text-black">Оплата: </span>
          {project?.payment} р
        </p>
        <p className="text-base text-[#686868]">
          <span className="font-bold text-black">Срочность: </span>
          {project?.urgency}
        </p>
        <p className="text-base text-[#686868]">
          <span className="font-bold text-black">Описание: </span>
          {project?.description}
        </p>
        {children}
      </div>
    </>
  )
}

export default Project
