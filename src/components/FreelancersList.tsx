import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import customerId from '../services/customerId'
import addIcon from '../assets/images/add-icon.svg'
import axiosInstance from '../services/axiosInstance'
import Freelancer from '../types/freelancer'

import Pagination from './ui/Pagination'

const FreelancersList = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [next, setNext] = useState('')
  const [prev, setPrev] = useState('')

  const setData = (url: string) => {
    axiosInstance
      .get(url)
      .then((response) => {
        setFreelancers(response.data.results)
        if (response.data.next != null) {
          setNext(response.data.next.slice(26))
        } else {
          setNext('')
        }
        if (response.data.previous != null) {
          setPrev(response.data.previous.slice(26))
        } else {
          setPrev('')
        }

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода фрилансеров:', error)
      })
  }

  const addToFavoriteList = (id: number, event: any) => {
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
    axiosInstance
      .get('/freelancers/')
      .then((response) => {
        setFreelancers(response.data.results)
        if (response.data.next != null) {
          setNext(response.data.next.slice(26))
        }
        if (response.data.previous != null) {
          setPrev(response.data.previous.slice(26))
        }

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода фрилансеров:', error)
      })
  }, [])

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
      <ul className="mx-auto mb-5 flex w-fit flex-col gap-10 text-black">
        Список фрилансеров:
        {freelancersList}
      </ul>
      <Pagination next={next} prev={prev} setData={setData} />
    </>
  )
}

export default FreelancersList
