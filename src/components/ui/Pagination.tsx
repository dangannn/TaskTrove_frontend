import React from 'react'

import nextIcon from '../../assets/images/next-arrow.svg'
import prevIcon from '../../assets/images/prev-arrow.svg'

interface IPaginationProps {
  setPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  totalPage: number
}

const Pagination = ({ setPage, currentPage, totalPage }: IPaginationProps) => {
  return (
    <div className="mx-auto flex w-fit">
      <button
        className={`ease w-fit rounded-lg duration-300 hover:bg-blue-200 active:bg-blue-200/60 ${
          currentPage === 1 ? 'invisible' : ''
        }`}
        onClick={() => {
          setPage((prev) => prev - 1)
        }}
      >
        <img
          alt="следующая странциа"
          className={`w-8 ${currentPage === 1 ? 'invisible' : ''}`}
          src={prevIcon}
        />
      </button>
      <button
        className={`ease w-fit rounded-lg duration-300 hover:bg-blue-200 active:bg-blue-200/60 ${
          totalPage === currentPage ? 'invisible' : ''
        }`}
        onClick={() => {
          setPage((prev) => prev + 1)
        }}
      >
        <img
          alt="следующая странциа"
          className={`w-8 ${totalPage === currentPage ? 'invisible' : ''}`}
          src={nextIcon}
        />
      </button>
    </div>
  )
}

export default Pagination
