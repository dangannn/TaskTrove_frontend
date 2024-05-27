import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
} from './services/routes'

import AuthForm from './components/ui/AuthForm/AuthForm'
import ProjectsList from './pages/ProjectsList'
import Header from './components/ui/Header'
import RegisterForm from './pages/RegisterForm'
import FreelancersList from './pages/FreelancersList'
import Index from './pages/Home'
import FreelancerProfile from './pages/FreelancerProfile'
import CustomerProfile from './pages/CustomerProfile'
import FavoriteList from './pages/Favorite_list'
import MyProjectsList from './pages/MyProjectsList'
import ProjectDetails from './pages/ProjectDetails'
import MyRequests from './pages/MyRequests'
import PrivateRoute from './components/ui/PrivateRoute'
import ErrorPage from './components/ui/ErrorPage'

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
            <Index />
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

function App() {
  return (
    <>
      <RouterProvider fallbackElement={<p>Loading...</p>} router={router} />
    </>
  )
}

export default App
