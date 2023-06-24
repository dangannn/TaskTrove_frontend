import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import customerId from '../../services/customerId'

const FreelancersList = () => {
  const [freelancers, setFreelancers] = useState([null])
  const addToFavoriteList = (id, event) => {
    event.preventDefault()
    event.stopPropagation()

    const formData = {
      freelancer: [`${id}`]
    }
    const favoriteListUrl = `http://127.0.0.1:8000/api/favorite_lists/${customerId}/update_favorite_list/`

    axios({
      method: 'patch',
      headers: {
        'Content-Type': 'application/json'
      },
      url: favoriteListUrl,
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
      url: 'http://127.0.0.1:8000/api/freelancers/',
      responseType: 'json'
    })
      .then((response) => {
        setFreelancers(response.data)

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода постов:', error)
      })
  }, [freelancers])

  const projectsList = freelancers
    ? freelancers.map((item) => (
        <>
          <li className="mx-2 max-w-sm rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:mx-auto">
            <form action="">
              <h3 className="text-xl text-[#4E64F9]">{`${item?.first_name} ${item?.last_name}`}</h3>
              <Link to={`/freelancers/${item?.id}`}>Подробнее</Link>
              <button className="border-2" onClick={addToFavoriteList.bind(null, item?.id)}>
                Добавить в избранное
              </button>
            </form>
          </li>
        </>
      ))
    : 'нет проектов'

  return (
    <ul className="mx-auto  flex w-fit flex-col gap-10 text-black">
      Список фрилансеров:
      {projectsList}
    </ul>
  )
}

export default FreelancersList
