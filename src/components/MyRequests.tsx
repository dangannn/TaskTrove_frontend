import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import IProject from '../types/project'
import axiosInstance from '../services/axiosInstance'
import { AuthContext } from '../services/Providers/AuthProvider'

const MyRequests = () => {
  const { customerId } = useContext(AuthContext)
  const [requests, setRequests] = useState<IProject[]>()

  const declineRequest = async (
    id: any,
    event: { preventDefault: () => void; stopPropagation: () => void }
  ) => {
    event.preventDefault()
    event.stopPropagation()

    try {
      const { data } = await axiosInstance.delete(`/requests/${id}/`)
    } catch (error) {
      toast.error('Ошибка отказа в проекте')
    }
  }

  const getRequests = async () => {
    try {
      const { data } = await axiosInstance.get(`/users/${customerId}/requests/`)

      setRequests(data)
    } catch (error) {
      toast.error('Ошибка получения запросов')
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  const requestsList = requests
    ? requests.map((item) => (
        <>
          <li className="md:w-3xl mx-auto mb-4 items-start rounded-xl bg-white p-4 drop-shadow-xl sm:mx-auto md:max-w-3xl">
            <h3 className="text-xl text-[#4E64F9]">{item?.name}</h3>
            <span className="text-sm text-[#BDBDBD]">Заказчик: {item?.customer}</span>
            <p className="text-base">{item?.description}</p>
            <button
              className="mx-auto mt-4 rounded-md border-2 bg-[#246BFD] p-2 text-white duration-300 ease-linear hover:bg-[#246BFD]/80 focus:border-black focus:outline-0 active:bg-[#246BFD]/60 active:shadow-blue-900"
              onClick={declineRequest.bind(null, item?.id)}
            >
              Отказаться
            </button>
          </li>
        </>
      ))
    : 'нет проектов'

  return (
    <div>
      <ul className="mx-auto  flex w-fit flex-col gap-10">
        Список моих запросов:
        {requestsList}
      </ul>
    </div>
  )
}

export default MyRequests
