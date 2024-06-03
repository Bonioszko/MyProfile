import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError } from 'axios'
import React, {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ToastAndroid } from 'react-native'

interface AuthContextInterface {
  isLoading: Boolean
  isAuthenticated: Boolean
  signup: (user: { name: String; token: String; email: String }) => void
  signout: () => void
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false)
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  const getAuth = useCallback(async () => {
    try {
      setIsLoading(true)

      // Get auth header from storage if not set
      if (!axios.defaults.headers.common['Authorization']) {
        const user = await AsyncStorage.getItem('user')
        if (user) {
          const token = await JSON.parse(user).token
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
      }

      await axios.get('/api/auth')

      console.log('Authenticated!')

      setIsAuthenticated(true)

      setIsLoading(false)
    } catch (err: any | AxiosError) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          console.log('User not authenticated')
        } else {
          ToastAndroid.show('An unexpected error occured', ToastAndroid.SHORT)
        }
        setIsAuthenticated(false)
        setIsLoading(false)
      } else {
        console.log(err)
        ToastAndroid.show('An unexpected error occured', ToastAndroid.SHORT)
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    getAuth()
  }, [])

  async function signup(user: { name: String; token: String; email: String }) {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
      getAuth()

      await AsyncStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      // Error saving data
    }
  }

  async function signout() {
    try {
      axios.defaults.headers.common['Authorization'] = ''
      await AsyncStorage.removeItem('user')

      getAuth()

      // AsyncStorage.
    } catch (error) {
      // Error saving data
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, signup, signout }}>
      {children}
    </AuthContext.Provider>
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
