import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  ReactElement,
  useEffect,
} from 'react'
import { User } from '@/.expo/types/user'
import axios, { Axios, AxiosError } from 'axios'

interface AuthContextInterface {
  isLoading: Boolean
  isAuthenticated: Boolean
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false)
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  useEffect(() => {
    async function getAuth() {
      try {
        const res = await axios.get('/api/auth')

        setIsAuthenticated(true)
        setIsLoading(false)
      } catch (err: any | AxiosError) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            console.log('User not authenticated')
            setIsLoading(false)
          }
        } else {
          console.log(err)
        }
      }
    }
    getAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>{children}</AuthContext.Provider>
  )
}

const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
