import React, { createContext, ReactNode, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

interface IContext {
  isAuth: boolean
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
  customerId: number
  extractUserIdFromToken: () => void
}

export const AuthContext = createContext<IContext>({} as IContext)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [customerId, setCustomerId] = useState<number>(0)
  const extractUserIdFromToken = () => {
    try {
      const token = localStorage.getItem('token') || ''
      const decodedToken = jwt_decode(token)

      setCustomerId(decodedToken.user_id)
    } catch (error) {
      console.log('Invalid token')

      return null
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true)
      extractUserIdFromToken()
    }
  }, [])
  const value = { isAuth, setIsAuth, customerId, extractUserIdFromToken }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
