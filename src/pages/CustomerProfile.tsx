import { useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import User from '../types/user'
import axiosInstance from '../services/axiosInstance'
import { AuthContext } from '../services/Providers/AuthProvider'

const CustomerProfile = () => {
  const { customerId } = useContext(AuthContext)
  const [customer, setCustomer] = useState<User>()
  const requestTmpFreelancers = `/users/${customerId}/`

  const getCustomer = async () => {
    try {
      const { data } = await axiosInstance.get(requestTmpFreelancers)

      setCustomer(data)
    } catch (error) {
      toast.error('Ошибка запроса ваших данных')
    }
  }

  useEffect(() => {
    getCustomer()
  }, [])

  return (
    <section>
      {customer ? (
        <div
          className="mx-2 flex max-w-sm flex-col gap-2 rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200
             sm:mx-auto"
        >
          <span className="text-base">
            <span className="font-bold">Имя:</span> {customer?.first_name}
          </span>
          <span className="text-base">
            <span className="font-bold">Фамилия:</span> {customer?.last_name}
          </span>
          <span className="text-base">
            <span className="font-bold">Никнейм:</span> {customer?.username}
          </span>
          <span className="text-base">
            <span className="font-bold">Почта:</span> {customer?.email}
          </span>
          <span className="text-base">
            <span className="font-bold">Номер телефона: </span>
            {customer?.phone_number}
          </span>
        </div>
      ) : (
        'нет данных'
      )}
    </section>
  )
}

export default CustomerProfile
