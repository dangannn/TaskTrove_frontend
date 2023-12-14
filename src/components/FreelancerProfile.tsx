import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import customerId from '../services/customerId'
import smileIcon from '../assets/images/smile.svg'
import sadIcon from '../assets/images/sad.svg'
import Freelancer from '../types/freelancer'

import Button from './ui/Button'
import Input from './ui/Input'

const FreelancerProfile = () => {
  const [freelancer, setFreelancer] = useState<Freelancer[]>([])
  const [comments, setComments] = useState([null])
  const { id } = useParams()

  const [formRequestData, setFormRequestData] = useState({
    name: '',
    description: '',
    customer: customerId,
    freelancer: [id]
  })

  const [formCommentData, setFormCommentData] = useState({
    description: '',
    is_positive: false,
    author: customerId,
    freelancer: [id]
  })

  const [isCheckedPositive, setIsCheckedPositive] = useState(false)
  const [isCheckedNegative, setIsCheckedNegative] = useState(false)
  const handleCommentFormChange = (e: { target: { name: any; value: any } }) => {
    setFormCommentData({ ...formCommentData, [e.target.name]: e.target.value })
  }
  const handleRequestFormChange = (e: { target: { name: any; value: any } }) => {
    setFormRequestData({ ...formRequestData, [e.target.name]: e.target.value })
  }
  const handleCommentChangeBoolean = (value, e) => {
    setFormCommentData({ ...formCommentData, [e.target.name]: Boolean(value) })
    if (value) {
      setIsCheckedPositive(true)
      setIsCheckedNegative(false)
    } else {
      setIsCheckedPositive(false)
      setIsCheckedNegative(true)
    }
  }

  const addCommentUrl = 'http://127.0.0.1:8000/api/comments/'
  const addRequestUrl = 'http://127.0.0.1:8000/api/requests/'
  const handleSubmit = (url: string, data, event) => {
    event.preventDefault()
    event.stopPropagation()
    console.log(data)
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url,
      data,
      responseType: 'json'
    })
      .then((response) => {
        return response.data
      })
      .then((data) => {
        const token = data.access

        return token
      })
      .catch((error) => {
        console.error(`Ошибка авторизации:${error}`)
      })
  }

  const requestTmpFreelancers = `http://127.0.0.1:8000/api/freelancers/${id}/`
  const requestTmpComments = `http://127.0.0.1:8000/api/users/${id}/comments/`

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
        setFreelancer(response.data)

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода постов:', error)
      })
  }, [requestTmpFreelancers])

  useEffect(() => {
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: requestTmpComments,
      responseType: 'json'
    })
      .then((response) => {
        setComments(response.data)

        return response
      })
      .catch((error) => {
        console.error('Ошибка вывода постов:', error)
      })
  }, [comments])

  const projectsList = comments
    ? comments.map((item) => (
        <>
          <li
            className={`mx-2 max-w-sm rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200 sm:mx-auto
            ${item?.is_positive ? 'bg-green-50' : 'bg-red-400'}`}
          >
            <h3 className="text-xl text-[#4E64F9]">{item?.author}</h3>
            <span className="text-xl text-[#4E64F9]">{item?.pub_date}</span>
            <p className="text-xl text-[#4E64F9]">{item?.description}</p>
          </li>
        </>
      ))
    : 'нет проектов'

  return (
    <div className="mx-auto flex w-fit flex-col gap-10 ">
      {freelancer ? (
        <div
          className="mx-2 flex max-w-sm flex-col gap-2 rounded-3xl border-2 border-blue-200 p-4 shadow-lg shadow-blue-200
             sm:mx-auto"
        >
          <span className="text-base ">Имя: {freelancer?.first_name}</span>
          <span className="text-base ">Фамилия: {freelancer?.last_name}</span>
          <span className="text-base ">Почта: {freelancer?.email}</span>
          <span className="text-base ">Номер телефона: {freelancer?.phone_number}</span>
        </div>
      ) : (
        'такого фрилансера нет'
      )}

      <form
        action=""
        className="mx-auto mb-4 flex flex-col gap-1 rounded-xl bg-white p-4 drop-shadow-xl sm:max-w-sm md:max-w-lg md:p-10"
      >
        <fieldset>Отправить запрос</fieldset>
        <label className="" htmlFor="name">
          Название:
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formRequestData.name}
          onChange={handleRequestFormChange}
        />
        <label className="" htmlFor="redescription">
          Описание:
        </label>
        <Input
          id="redescription"
          name="description"
          type="text"
          value={formRequestData.description}
          onChange={handleRequestFormChange}
        />
        <Button onClick={handleSubmit.bind(null, addRequestUrl, formRequestData)}>
          Отправить запрос
        </Button>
      </form>

      <form
        action=""
        className="mx-auto mb-4 flex flex-col gap-1 rounded-xl bg-white p-4 drop-shadow-xl sm:max-w-sm md:max-w-lg md:p-10"
      >
        <fieldset>Оставить комментарий</fieldset>
        <label className="" htmlFor="description">
          Текст:
        </label>
        <Input
          id="description"
          name="description"
          type="text"
          value={formCommentData.description}
          onChange={handleCommentFormChange}
        />
        <div className="flex items-center justify-evenly">
          <label className="" htmlFor="is_positive_true">
            <input
              checked={isCheckedPositive}
              className="absolute h-12 w-12 rounded-xl opacity-0"
              id="is_positive_true"
              name="is_positive"
              type="checkbox"
              onChange={handleCommentChangeBoolean.bind(null, true)}
            />
            <img
              alt="позитивный комментарий"
              className={`${isCheckedPositive ? 'w-12 rounded-xl bg-green-100 p-2' : 'w-12 p-2'}`}
              src={smileIcon}
            />
          </label>
          <label className="" htmlFor="is_positive_false">
            <input
              checked={isCheckedNegative}
              className="absolute h-12 w-12 rounded-xl opacity-0"
              id="is_positive_false"
              name="is_positive"
              type="checkbox"
              onChange={handleCommentChangeBoolean.bind(null, false)}
            />
            <img
              alt="негативный комментарий"
              className={`${isCheckedNegative ? 'w-12 rounded-xl bg-red-400 p-2' : 'w-12 p-2'}`}
              src={sadIcon}
            />
          </label>
        </div>
        <Button onClick={handleSubmit.bind(null, addCommentUrl, formCommentData)}>
          Добавить комментарий
        </Button>
      </form>
      <ul className="width-full mx-auto flex w-fit flex-col gap-10 ">
        Список комментариве:
        {projectsList}
      </ul>
    </div>
  )
}

export default FreelancerProfile
