import { useEffect, useState } from 'react'
import axios from 'axios'

import customerId from '../services/customerId'

const ProjectsList = () => {
  const [projects, setProjects] = useState([null])
  const createRequest = (id, event) => {
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
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: 'http://127.0.0.1:8000/api/projects/',
      responseType: 'json'
    })
      .then((response) => {
        setProjects(response.data)

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода постов:', error)
      })
    console.log(projects)
  }, [projects])

  const projectsList = projects
    ? projects.map((item) => (
        <li
          key={item?.id}
          className="mx-2 max-w-sm rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:mx-auto"
        >
          <h3 className="text-xl text-[#4E64F9]">{item?.name}</h3>
          <span className="text-sm text-[#BDBDBD]">
            {new Date(item?.pub_date).toDateString('ru')}
          </span>
          <p className="text-base text-[#686868]">{item?.description}</p>
          <button onClick={createRequest.bind(null, item?.id)}>Откликнуться</button>
        </li>
      ))
    : 'нет проектов'

  return (
    <>
      <ul className="mx-auto flex w-fit flex-col gap-10 text-black">
        Список постов:
        {projectsList}
      </ul>
    </>
  )
}

export default ProjectsList
