import { Route, Routes } from 'react-router-dom'
import axios from 'axios'

import axiosInstance from '../services/axiosInstance'

import AuthForm from './ui/AuthForm'
import ProjectsList from './ProjectsList'
import Header from './ui/Header'
import RegisterForm from './ui/RegisterForm'
import FreelancersList from './ui/FreelancersList'
import Home from './Home'
import FreelancerProfile from './ui/FreelancerProfile'
import CustomerProfile from './ui/CustomerProfile'
import FavoriteList from './ui/Favorite_list'
import MyProjectsList from './ui/MyProjectsList'
import ProjectDetails from './ui/ProjectDetails'
import MyRequests from './ui/MyRequests'

function hasJWT() {
  let flag = false

  //check user has JWT token
  localStorage.getItem('token') ? (flag = true) : (flag = false)

  return flag
}

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else delete axiosInstance.defaults.headers.common['Authorization']
  // } else delete axios.defaults.headers.common['Authorization']
}

const token = localStorage.getItem('token')

if (token) {
  setAuthToken(token)
}

function App() {
  return (
    <main className="">
      <section className="">
        {hasJWT() ? <Header /> : ''}
        <Routes>
          {hasJWT() ? (
            <>
              <Route element={<Home />} path="/" />
              <Route element={<ProjectsList />} path="/projects" />
              <Route element={<FreelancersList />} path="/freelancers" />
              <Route element={<FreelancerProfile />} path="/freelancers/:id" />
              <Route element={<CustomerProfile />} path="/profile" />
              <Route element={<FavoriteList />} path="/favorite_list" />
              <Route element={<MyProjectsList />} path="/my_projects" />
              <Route element={<MyRequests />} path="/my_requests" />
              <Route element={<ProjectDetails />} path="/project_details/:id" />
            </>
          ) : (
            <>
              <Route element={<AuthForm />} path="*" />
              <Route element={<RegisterForm />} path="/register" />
            </>
          )}
        </Routes>
      </section>
    </main>
  )
}

export default App
