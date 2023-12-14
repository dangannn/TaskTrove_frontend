import { Navigate } from 'react-router-dom'
import React from 'react'

import isAuth from '../../services/isAuth'
import { AUTH_ROUTE } from '../../services/routes'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return <>{isAuth() ? children : <Navigate to={AUTH_ROUTE} />}</>
}

export default PrivateRoute
