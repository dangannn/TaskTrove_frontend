import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'

import logoutImg from '../../assets/images/logout.svg'
import profileImg from '../../assets/images/profile.svg'
import burgerMenuImg from '../../assets/images/burger-menu.svg'
import {
  AUTH_ROUTE,
  CUSTOMER_PROFILE_ROUTE,
  FAVORITE_LIST_ROUTE,
  FREELANCERS_ROUTE,
  MY_PROJECTS_ROUTE,
  MY_REQUESTS_ROUTE,
  PROJECTS_ROUTE
} from '../../services/routes'

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
    <>
      <header
        className="
    mb-4
    min-h-min
    w-full
    bg-[#EFF3FD]
    "
      >
        <nav className="flex w-full flex-wrap items-center justify-between bg-[#EFF3FD] p-4">
          <Link className="text-lg font-bold text-[#292D32]" to="/">
            TaskTrove
          </Link>
          <img
            alt="бургер меню"
            className="h-5 md:hidden"
            src={burgerMenuImg}
            onClick={activeMenu}
          />
          <div
            className={`w-full grow flex-col md:flex md:max-w-max md:flex-row md:items-center md:gap-2 md:rounded-lg md:bg-white md:p-2 ${
              burgerMenuActive ? '' : 'hidden'
            }`}
          >
            <Link
              className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
              to={FREELANCERS_ROUTE}
            >
              Фрилансеры
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
              to={PROJECTS_ROUTE}
            >
              Проекты
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
              to={FAVORITE_LIST_ROUTE}
            >
              Избранное
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
              to={MY_PROJECTS_ROUTE}
            >
              Мои проекты
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
              to={MY_REQUESTS_ROUTE}
            >
              Мои запросы
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:hidden md:text-base"
              to={AUTH_ROUTE}
              onClick={logout}
            >
              Выйти
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:hidden md:text-base"
              to={CUSTOMER_PROFILE_ROUTE}
            >
              Профиль
            </Link>
          </div>
          <div className="hidden gap-2 md:flex">
            <Link className="h-8" to={AUTH_ROUTE} onClick={logout}>
              <img alt="выход" className="h-6" src={logoutImg} />
            </Link>
            <Link className="h-8" to={CUSTOMER_PROFILE_ROUTE}>
              <img alt="профиль" className="h-6" src={profileImg} />
            </Link>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default Header
