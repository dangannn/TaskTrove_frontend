import { Link } from 'react-router-dom'

import logoutImg from '../../assets/images/logout.svg'
import profileImg from '../../assets/images/profile.svg'

const Header = () => {
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
    h-24
    w-full
    bg-[#EFF3FD]
    py-5
    "
    >
      <div className=" m-auto flex h-14 sm:flex-row md:max-w-7xl md:flex-row md:items-center md:justify-evenly md:px-3">
        <Link className="mr-10 text-lg font-bold text-[#292D32]" to="/">
          TaskTrove
        </Link>
        <div className="flex w-96 flex-col justify-between rounded-lg bg-white p-2 sm:w-full sm:max-w-sm sm:flex-row md:max-w-md lg:max-w-2xl">
          <Link
            className="border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40 sm:w-40 sm:text-base"
            to="/freelancers"
          >
            Фрилансеры
          </Link>
          <Link
            className="border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40 sm:w-40 sm:text-base"
            to="/projects"
          >
            Проекты
          </Link>
          <Link
            className="border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40 sm:w-40 sm:text-base"
            to="/favorite_list"
          >
            Избранное
          </Link>
          <Link
            className="border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40 sm:w-40 sm:text-base"
            to="/my_projects"
          >
            Мои проекты
          </Link>
          <Link
            className="border-2 border-transparent text-center text-xs text-[#292D32] duration-150 ease-in hover:border-b-2 hover:border-b-[#783EFD]/40 sm:w-40 sm:text-base"
            to="/my_requests"
          >
            Мои запросы
          </Link>
        </div>
        <div className="flex gap-2">
          <Link className="h-8" to="/auth" onClick={logout}>
            <img alt="выход" className="h-6" src={logoutImg} />
          </Link>
          <Link className="h-8" to="/profile">
            <img alt="профиль" className="h-6" src={profileImg} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
