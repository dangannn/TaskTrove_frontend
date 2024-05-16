import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import addIcon from '../assets/images/add-icon.svg'
import axiosInstance from '../services/axiosInstance'
import Freelancer from '../types/freelancer'
import { AuthContext } from '../services/Providers/AuthProvider'

import Pagination from '../components/ui/Pagination'

const LIMIT_FREELANCERS = 3

const FreelancersList = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const { customerId } = useContext(AuthContext)
  const getFreelancersRequest = async (limit: number, offset: number) => {
    const { data } = await axiosInstance.get(`/freelancers/?limit=${limit}&offset=${offset}`)

    if (data) {
      setFreelancers(data.results)
      setTotalCount(data.count)
    }
  }

  useEffect(() => {
    getFreelancersRequest(LIMIT_FREELANCERS, (page - 1) * LIMIT_FREELANCERS)
  }, [page])

  const addToFavoriteList = async (id: number, event: any) => {
    event.preventDefault()
    event.stopPropagation()

    const formData = {
      freelancer: [`${id}`]
    }

    try {
      const { data } = await axiosInstance.patch(
        `/favorite_lists/${customerId}/update_favorite_list/`,
        formData
      )

      toast.success('Добавлено в Избранное')
    } catch (error) {
      toast.error('Ошибка добавления в избранное')
    }
  }

  const freelancersList = freelancers
    ? freelancers.map((item: Freelancer) => (
        <>
          <li className="mx-2 max-w-sm rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:mx-auto">
            <form action="" className="flex items-center justify-between gap-2">
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
                className="ease w-fit rounded-lg duration-300 hover:bg-yellow-400 active:bg-yellow-400/60 "
                onClick={addToFavoriteList.bind(null, item?.id)}
              >
                <img alt="добавить фриласнера в избранное" className="w-8" src={addIcon} />
              </button>
            </form>
          </li>
        </>
      ))
    : 'нет проектов'

  return (
    <>
      <ul className="mx-auto mb-5 flex w-fit flex-col gap-10">
        Список фрилансеров:
        {freelancersList}
      </ul>
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPage={Math.ceil(totalCount / LIMIT_FREELANCERS)}
      />
    </>
  )
}

export default FreelancersList
