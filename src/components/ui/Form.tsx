import { useState } from 'react'

import axiosInstance from '../../services/axiosInstance'

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await axiosInstance.post('/projects/', formData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        <fieldset>Создать проект:</fieldset>
        <input name="name" type="text" value={formData.name} onChange={handleChange} />
        <textarea name="description" value={formData.description} onChange={handleChange} />
        <button
          className="rounded-sm border-2 border-amber-300 active:bg-amber-300 active:text-black"
          type="submit"
        >
          Отправить
        </button>
      </form>
    </>
  )
}

export default FormComponent
