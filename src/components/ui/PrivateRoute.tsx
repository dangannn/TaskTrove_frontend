import { Navigate } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'

import { AUTH_ROUTE } from '../../services/routes'
import { AuthContext } from '../../services/Providers/AuthProvider'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuth } = useContext(AuthContext)

  return <>{isAuth ? children : <Navigate to={AUTH_ROUTE} />}</>
}

export default PrivateRoute
