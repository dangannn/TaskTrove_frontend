import React from 'react'

import nextIcon from '../../assets/images/next-arrow.svg'
import prevIcon from '../../assets/images/prev-arrow.svg'

interface PaginationProps {
  prev: string
  next: string
  setData: any
}

const Pagination = (props: PaginationProps) => {
  return (
    <div className="mx-auto flex w-fit">
      <button
        className="ease w-fit rounded-lg duration-300 hover:bg-blue-200 active:bg-blue-200/60 "
        onClick={props.setData.bind(null, props.prev)}
      >
        <img alt="следующая странциа" className="w-8" src={prevIcon} />
      </button>
      <button
        className="ease w-fit rounded-lg duration-300 hover:bg-blue-200 active:bg-blue-200/60 "
        onClick={props.setData.bind(null, props.next)}
      >
        <img alt="следующая странциа" className="w-8" src={nextIcon} />
      </button>
    </div>
  )
}

export default Pagination