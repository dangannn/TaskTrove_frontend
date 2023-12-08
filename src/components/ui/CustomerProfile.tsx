import { useEffect, useState } from 'react'
import axios from 'axios'

import customerId from '../../services/customerId'
import User from '../../types/user'

const CustomerProfile = () => {
  const [customer, setCustomer] = useState<User>()
  const requestTmpFreelancers = `http://127.0.0.1:8000/api/users/${customerId}/`

  useEffect(() => {
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: requestTmpFreelancers,
      responseType: 'json'
    })
      .then((response) => {
        setCustomer(response.data)

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода постов:', error)
      })
  }, [requestTmpFreelancers])

  return (
    <section>
      {customer ? (
        <div
          className="mx-2 flex max-w-sm flex-col gap-2 rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200
             sm:mx-auto"
        >
          <span className="text-base text-black">
            <span className="font-bold">Имя:</span> {customer?.first_name}
          </span>
          <span className="text-base text-black">
            <span className="font-bold">Фамилия:</span> {customer?.last_name}
          </span>
          <span className="text-base text-black">
            <span className="font-bold">Никнейм:</span> {customer?.username}
          </span>
          <span className="text-base text-black">
            <span className="font-bold">Почта:</span> {customer?.email}
          </span>
          <span className="text-base text-black">
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
