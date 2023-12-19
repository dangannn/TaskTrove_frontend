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
  background-color: var(--blue);
  width: 100%;
  min-height: min-content;
  margin-bottom: 1rem;
`

const NavWrapper = styled.nav`
  background-color: var(--blue);
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }
`

const NavLinkWrapper = styled(Link)`
  display: block;
  padding: 0.1rem;
  border-radius: 0.1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: center;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);

  &:hover {
    color: var(--text-primary-light);
    background-color: var(--light-blue);
  }

  &:active {
    color: var(--text-primary-light);
    background-color: var(--blue);
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0.3rem;
    border-radius: 0.5rem;
  }
`

const Logo = styled(NavLinkWrapper)`
  color: var(--text-primary-light);
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0.1rem;
    border-radius: 0.1rem;
  }
`
const ChangedLink = styled(NavLinkWrapper)`
  @media (min-width: 768px) {
    display: none;
  }
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

type Theme = 'dark' | 'light'

const Header = () => {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>('light')

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
          <Logo to={ROOT_ROUTE}>TaskTrove</Logo>
          <img
            alt="бургер меню"
            className="h-5 md:hidden"
            src={burgerMenuImg}
            onClick={activeMenu}
          />
          <MenuWrapper burgerMenuActive={burgerMenuActive}>
            <NavLinkWrapper to={FREELANCERS_ROUTE}>Фрилансеры</NavLinkWrapper>
            <NavLinkWrapper to={PROJECTS_ROUTE}>Проекты</NavLinkWrapper>
            <NavLinkWrapper to={FAVORITE_LIST_ROUTE}>Избранное</NavLinkWrapper>
            <NavLinkWrapper to={MY_PROJECTS_ROUTE}>Мои проекты</NavLinkWrapper>
            <NavLinkWrapper to={MY_REQUESTS_ROUTE}>Мои запросы</NavLinkWrapper>
            <ChangedLink to={AUTH_ROUTE} onClick={logout}>
              Выйти
            </ChangedLink>
            <ChangedLink to={CUSTOMER_PROFILE_ROUTE}>Профиль</ChangedLink>
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
