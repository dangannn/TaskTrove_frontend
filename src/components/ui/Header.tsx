import { Link } from 'react-router-dom'
import { useState } from 'react'

import logoutImg from '../../assets/images/logout.svg'
import profileImg from '../../assets/images/profile.svg'
import burgerMenuImg from '../../assets/images/burger-menu.svg'

const Header = () => {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false)

  const activeMenu = () => {
    setBurgerMenuActive(!burgerMenuActive)
  }
  const logout = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    window.location.href = '/auth'
  }

  return (
    <header
      className="
    mb-4
    min-h-min
    w-full
    bg-[#EFF3FD]
    "
    >
      <nav
        // className='mx-4 md:m-auto flex h-14 sm:flex-row md:max-w-7xl md:flex-row md:items-center justify-between md:justify-between md:px-3'>
        className="flex w-full flex-wrap items-center justify-between bg-[#EFF3FD] p-4"
      >
        <Link className="text-lg font-bold text-[#292D32]" to="/">
          TaskTrove
        </Link>
        <img alt="бургер меню" className="h-5 md:hidden" src={burgerMenuImg} onClick={activeMenu} />
        <div
          // className={`flex w-96 h-min flex-col justify-between items-center rounded-lg bg-white p-2 sm:w-full sm:max-w-sm lg:max-w-2xl ${burgerMenuActive ? '' : 'hidden'} md:block md:flex-row md:justify-evenly md:max-w-md`}>
          className={`w-full grow flex-col md:flex md:max-w-max md:flex-row md:items-center md:gap-2 md:rounded-lg md:bg-white md:p-2 ${
            burgerMenuActive ? '' : 'hidden'
          }`}
        >
          <Link
            className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
            to="/freelancers"
          >
            Фрилансеры
          </Link>
          <Link
            className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
            to="/projects"
          >
            Проекты
          </Link>
          <Link
            className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
            to="/favorite_list"
          >
            Избранное
          </Link>
          <Link
            className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
            to="/my_projects"
          >
            Мои проекты
          </Link>
          <Link
            className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
            to="/my_requests"
          >
            Мои запросы
          </Link>
          <Link
            className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:hidden md:text-base"
            to="/auth"
            onClick={logout}
          >
            Выйти
          </Link>
          <Link
            className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:hidden md:text-base"
            to="/profile"
          >
            Профиль
          </Link>
        </div>
        <div className="hidden gap-2 md:flex">
          <Link className="h-8" to="/auth" onClick={logout}>
            <img alt="выход" className="h-6" src={logoutImg} />
          </Link>
          <Link className="h-8" to="/profile">
            <img alt="профиль" className="h-6" src={profileImg} />
          </Link>
        </div>
      </nav>
      {/*<nav className='flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0'>*/}
      {/*  <div className='flex items-center flex-shrink-0 text-white mr-6'>*/}
      {/*    <a className='text-white no-underline hover:text-white hover:no-underline' href='#'>*/}
      {/*      <span className='text-2xl pl-2'>Brand McBrandface</span>*/}
      {/*    </a>*/}
      {/*  </div>*/}

      {/*  <div className='block lg:hidden'>*/}
      {/*    <button id='nav-toggle'*/}
      {/*            className='flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white'>*/}
      {/*      <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>*/}
      {/*        <title>Menu</title>*/}
      {/*        <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />*/}
      {/*      </svg>*/}
      {/*    </button>*/}
      {/*  </div>*/}

      {/*  <div className='w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0'*/}
      {/*       id='nav-content'>*/}
      {/*    <ul className='list-reset lg:flex justify-end flex-1 items-center'>*/}
      {/*      <li className='mr-3'>*/}
      {/*        <a className='inline-block py-2 px-4 text-white no-underline' href='#'>Active</a>*/}
      {/*      </li>*/}
      {/*      <li className='mr-3'>*/}
      {/*        <a className='inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4'*/}
      {/*           href='#'>link</a>*/}
      {/*      </li>*/}
      {/*      <li className='mr-3'>*/}
      {/*        <a className='inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4'*/}
      {/*           href='#'>link</a>*/}
      {/*      </li>*/}
      {/*      <li className='mr-3'>*/}
      {/*        <a className='inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4'*/}
      {/*           href='#'>link</a>*/}
      {/*      </li>*/}
      {/*    </ul>*/}
      {/*  </div>*/}
      {/*</nav>*/}
    </header>
  )
}

export default Header
