import React from 'react'

import nextIcon from '../../assets/images/next-arrow.svg'
import prevIcon from '../../assets/images/prev-arrow.svg'

interface IPaginationProps {
  prev: string
  next: string
  setData: any
}

const Pagination = ({ prev, next, setData }: IPaginationProps) => {
  return (
    <div className="mx-auto flex w-fit">
      <button
        className={`ease w-fit rounded-lg duration-300 hover:bg-blue-200 active:bg-blue-200/60 ${
          prev == '' ? 'invisible' : ''
        }`}
        onClick={setData.bind(null, prev)}
      >
        <img
          alt="следующая странциа"
          className={`w-8 ${prev == '' ? 'invisible' : ''}`}
          src={prevIcon}
        />
      </button>
      <button
        className={`ease w-fit rounded-lg duration-300 hover:bg-blue-200 active:bg-blue-200/60 ${
          next == '' ? 'invisible' : ''
        }`}
        onClick={setData.bind(null, next)}
      >
        <img
          alt="следующая странциа"
          className={`w-8 ${next == '' ? 'invisible' : ''}`}
          src={nextIcon}
        />
      </button>
    </div>
  )
}

export default Pagination
