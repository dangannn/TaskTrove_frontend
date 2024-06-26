import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import removeIcon from '../assets/images/remove-icon.svg'
import axiosInstance from '../services/axiosInstance'
import Freelancer from '../types/freelancer'
import { AuthContext } from '../services/Providers/AuthProvider'

const FavoriteList = () => {
  const { customerId } = useContext(AuthContext)
  const [favoriteList, setFavoriteList] = useState<Freelancer[]>([])
  const removeFromFavoriteList = async (id: number, event: any) => {
    event.preventDefault()
    event.stopPropagation()

    const formData = {
      freelancer: [id]
    }

    try {
      const { data } = await axiosInstance.patch(
        `/favorite_lists/${customerId}/remove_favorite_list/`,
        formData
      )

      toast.success('Фрилансер удален из Избранного')
    } catch (error) {
      toast.error('Ошибка вывода постов')
    }
  }
  const getFavoriteList = async () => {
    try {
      const { data } = await axiosInstance.get(`/favorite_lists/${customerId}/favorite_list/`)

      setFavoriteList(data)
    } catch (error) {
      toast.error('Ошибка запроса Избранного')
    }
  }

  useEffect(() => {
    getFavoriteList()
  }, [])

  const projectsList = favoriteList
    ? favoriteList.map((item) => (
        <>
          <li className="w-xl mx-2 flex max-w-md items-center justify-between gap-2 rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:mx-auto">
            <div>
              <h3 className="text-xl text-[#4E64F9]">{`${item?.first_name} ${item?.last_name}`}</h3>
              <Link
                className="ease w-fit border-b-2 text-sm text-[#BDBDBD] duration-300 hover:border-b-[#246BFD] hover:text-[#246BFD]"
                to={`/freelancers/${item?.id}`}
              >
                Подробнее
              </Link>
            </div>
            <button
              className="ease w-fit rounded-lg duration-300 hover:bg-red-400 active:bg-red-400/60 "
              onClick={removeFromFavoriteList.bind(null, item?.id)}
            >
              <img alt="удалить фрилансера из избранного" className="w-8" src={removeIcon} />
            </button>
          </li>
        </>
      ))
    : 'список пуст'

  return (
    <section>
      <ul className="mx-auto flex w-fit flex-col gap-10">
        {projectsList.length > 0 ? projectsList : <li>список пуст</li>}
      </ul>
    </section>
  )
}

export default FavoriteList
