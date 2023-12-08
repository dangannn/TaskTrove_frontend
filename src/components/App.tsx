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
  REGISTER_ROUTE
} from '../services/routes'

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
import PrivateRoute from './ui/PrivateRoute'
import ErrorPage from './ui/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Header />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Home />,
          </PrivateRoute>
        )
      },
      {
        path: CUSTOMER_PROFILE_ROUTE,
        element: (
          <PrivateRoute>
            <CustomerProfile />,
          </PrivateRoute>
        )
      },
      {
        path: PROJECTS_ROUTE,
        element: (
          <PrivateRoute>
            <ProjectsList />,
          </PrivateRoute>
        )
      },
      {
        path: FREELANCERS_ROUTE,
        element: (
          <PrivateRoute>
            <FreelancersList />,
          </PrivateRoute>
        )
      },
      {
        path: FREELANCER_PROFILE_ROUTE,
        element: (
          <PrivateRoute>
            <FreelancerProfile />,
          </PrivateRoute>
        )
      },
      {
        path: FAVORITE_LIST_ROUTE,
        element: (
          <PrivateRoute>
            <FavoriteList />,
          </PrivateRoute>
        )
      },
      {
        path: MY_PROJECTS_ROUTE,
        element: (
          <PrivateRoute>
            <MyProjectsList />,
          </PrivateRoute>
        )
      },
      {
        path: MY_REQUESTS_ROUTE,
        element: (
          <PrivateRoute>
            <MyRequests />,
          </PrivateRoute>
        )
      },
      {
        path: PROJECT_DETAILS_ROUTE,
        element: (
          <PrivateRoute>
            <ProjectDetails />,
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
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else delete axiosInstance.defaults.headers.common['Authorization']
}

const token = localStorage.getItem('token')

if (token) {
  setAuthToken(token)
}

function App() {
  return <RouterProvider fallbackElement={<p>Loading...</p>} router={router} />
}

export default App
