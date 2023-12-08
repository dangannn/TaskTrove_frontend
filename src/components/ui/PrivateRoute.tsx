import { Navigate } from 'react-router-dom'
import React from 'react'

import isAuth from '../../services/isAuth'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return <>{isAuth() ? children : <Navigate to="/auth" />}</>
}

export default PrivateRoute
