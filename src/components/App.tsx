import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'

import axiosInstance from '../services/axiosInstance'
import {
  AUTH_ROUTE,
  CUSTOMER_PROFILE_ROUTE,
  FAVORITE_LIST_ROUTE,
  FREELANCER_PROFILE_ROUTE,
  FREELANCERS_ROUTE,
  MY_PROJECTS_ROUTE,
  MY_REQUESTS_ROUTE,
  PROJECT_DETAILS_ROUTE,
  PROJECTS_ROUTE,
  REGISTER_ROUTE,
  ROOT_ROUTE
} from '../services/routes'

import AuthForm from './ui/AuthForm'
import ProjectsList from './ProjectsList'
import Header from './ui/Header'
import RegisterForm from './RegisterForm'
import FreelancersList from './FreelancersList'
import Home from './Home'
import FreelancerProfile from './FreelancerProfile'
import CustomerProfile from './CustomerProfile'
import FavoriteList from './Favorite_list'
import MyProjectsList from './MyProjectsList'
import ProjectDetails from './ProjectDetails'
import MyRequests from './MyRequests'
import PrivateRoute from './ui/PrivateRoute'
import ErrorPage from './ui/ErrorPage'

export const router = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    element: (
      <PrivateRoute>
        <Header />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROOT_ROUTE,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: CUSTOMER_PROFILE_ROUTE,
        element: (
          <PrivateRoute>
            <CustomerProfile />
          </PrivateRoute>
        )
      },
      {
        path: PROJECTS_ROUTE,
        element: (
          <PrivateRoute>
            <ProjectsList />
          </PrivateRoute>
        )
      },
      {
        path: FREELANCERS_ROUTE,
        element: (
          <PrivateRoute>
            <FreelancersList />
          </PrivateRoute>
        )
      },
      {
        path: FREELANCER_PROFILE_ROUTE,
        element: (
          <PrivateRoute>
            <FreelancerProfile />
          </PrivateRoute>
        )
      },
      {
        path: FAVORITE_LIST_ROUTE,
        element: (
          <PrivateRoute>
            <FavoriteList />
          </PrivateRoute>
        )
      },
      {
        path: MY_PROJECTS_ROUTE,
        element: (
          <PrivateRoute>
            <MyProjectsList />
          </PrivateRoute>
        )
      },
      {
        path: MY_REQUESTS_ROUTE,
        element: (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        )
      },
      {
        path: PROJECT_DETAILS_ROUTE,
        element: (
          <PrivateRoute>
            <ProjectDetails />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: AUTH_ROUTE,
    element: <AuthForm />
  },
  {
    path: REGISTER_ROUTE,
    element: <RegisterForm />
  }
])

const setAuthToken = (token: string) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `${token}`
  } else delete axiosInstance.defaults.headers.common['Authorization']
}

const token = localStorage.getItem('token')

if (token) {
  setAuthToken(token)
}

function App() {
  return (
    <>
      <RouterProvider fallbackElement={<p>Loading...</p>} router={router} />
    </>
  )
}

export default App
