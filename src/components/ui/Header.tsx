import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import styled from 'styled-components'

import logoutImg from '../../assets/images/logout.svg'
import profileImg from '../../assets/images/profile.svg'
import burgerMenuImg from '../../assets/images/burger-menu.svg'
import SunImg from '../../assets/images/sun.svg'
import MoonImg from '../../assets/images/moon.svg'
import {
  AUTH_ROUTE,
  CUSTOMER_PROFILE_ROUTE,
  FAVORITE_LIST_ROUTE,
  FREELANCERS_ROUTE,
  MY_PROJECTS_ROUTE,
  MY_REQUESTS_ROUTE,
  PROJECTS_ROUTE,
  ROOT_ROUTE
} from '../../services/routes'

const HeaderWrapper = styled.header`
  background-color: var(--bg-header);
  width: 100%;
  min-height: min-content;
  margin-bottom: 1rem;
`

const NavWrapper = styled.nav`
  background-color: var(--bg-header);
  display: flex;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

interface MenuWrapperProps {
  burgerMenuActive?: boolean
}

const MenuWrapper = styled.nav<MenuWrapperProps>`
  flex-direction: column;
  width: 100%;
  background-color: var(--bg-card-primary);
  display: ${({ burgerMenuActive }) => (burgerMenuActive ? 'block' : 'none')};

  @media (min-width: 768px) {
    display: flex;
    padding: 0.5rem;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    border-radius: 0.5rem;
    max-width: max-content;
  }
`

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 2rem;
`

const HeaderImg = styled.img`
  height: 2rem;
`

const Header = () => {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('light')

  const changeTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

    document.documentElement.setAttribute('data-theme', newTheme)
    setCurrentTheme(newTheme)
  }

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
      <HeaderWrapper>
        <NavWrapper>
          <Link className="text-lg font-bold text-[#292D32]" to={ROOT_ROUTE}>
            TaskTrove
          </Link>
          <img
            alt="бургер меню"
            className="h-5 md:hidden"
            src={burgerMenuImg}
            onClick={activeMenu}
          />
          <MenuWrapper burgerMenuActive={burgerMenuActive}>
            <Link
              className="block border-2 border-transparent text-center text-xs duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
              to={FREELANCERS_ROUTE}
            >
              Фрилансеры
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
              to={PROJECTS_ROUTE}
            >
              Проекты
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
              to={FAVORITE_LIST_ROUTE}
            >
              Избранное
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
              to={MY_PROJECTS_ROUTE}
            >
              Мои проекты
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:text-base"
              to={MY_REQUESTS_ROUTE}
            >
              Мои запросы
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:hidden md:text-base"
              to={AUTH_ROUTE}
              onClick={logout}
            >
              Выйти
            </Link>
            <Link
              className="block border-2 border-transparent text-center text-xs duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40  md:hidden md:text-base"
              to={CUSTOMER_PROFILE_ROUTE}
            >
              Профиль
            </Link>
          </MenuWrapper>
          <div className="hidden gap-2 md:flex">
            <Link className="h-8" to={AUTH_ROUTE} onClick={logout}>
              <HeaderImg alt="выход" className="h-6" src={logoutImg} />
            </Link>
            <Link className="h-8" to={CUSTOMER_PROFILE_ROUTE}>
              <HeaderImg alt="профиль" className="h-6" src={profileImg} />
            </Link>
            <ToggleButton
              onClick={() => {
                changeTheme()
              }}
            >
              <HeaderImg
                alt="переключение темы"
                src={currentTheme === 'light' ? SunImg : MoonImg}
              />
            </ToggleButton>
          </div>
        </NavWrapper>
      </HeaderWrapper>
      <Outlet />
    </>
  )
}

export default Header
