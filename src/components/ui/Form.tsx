import { useState } from 'react'

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    fetch('http://127.0.0.1:8000/api/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.user.access}`
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        // Обработка успешного сохранения данных
        return data
      })
      .catch((error) => {
        // Обработка ошибки
        console.error('Ошибка при сохранении данных:', error)
      })
  }

  return (
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
  )
}

export default FormComponent
