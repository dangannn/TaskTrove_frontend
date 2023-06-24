import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import customerId from '../../services/customerId'

const FavoriteList = () => {
  const [favoriteList, setFavoriteList] = useState([null])
  const removeFromFavoriteList = (id, event) => {
    event.preventDefault()
    event.stopPropagation()

    const formData = {
      freelancer: [id]
    }
    const favoriteListUrl = `http://127.0.0.1:8000/api/favorite_lists/${customerId}/remove_favorite_list/`

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
  const requestTmpFavoriteList = `http://127.0.0.1:8000/api/favorite_lists/${customerId}/favorite_list/`

  useEffect(() => {
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: requestTmpFavoriteList,
      responseType: 'json'
    })
      .then((response) => {
        setFavoriteList(response.data)

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода постов:', error)
      })
  }, [favoriteList, requestTmpFavoriteList])
  const projectsList = favoriteList
    ? favoriteList.map((item) => (
        <>
          <li className="mx-2 max-w-sm rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:mx-auto">
            <h3 className="text-xl text-[#4E64F9]">{`${item?.first_name} ${item?.last_name}`}</h3>
            <Link to={`/freelancers/${item?.id}`}>Подробнее</Link>
            <button className="border-2" onClick={removeFromFavoriteList.bind(null, item?.id)}>
              Удалить из избранного
            </button>
          </li>
        </>
      ))
    : 'список пуст'

  return (
    <section>
      <ul className="mx-auto flex w-fit flex-col gap-10 text-black">{projectsList}</ul>
    </section>
  )
}

export default FavoriteList
