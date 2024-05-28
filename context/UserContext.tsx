import React, { createContext, useState, useContext, ReactNode, ReactElement } from 'react'
import { User } from '@/.expo/types/user'

interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const UserProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<User | null>({
    name: 'Bartosz Pers',
    email: 'test@gmail.com',
    phone: '123456789',
    facebook: 'https://www.facebook.com/bartosz.pers',
    instagram: 'https://www.instagram.com/bartosz.pers',
    linkedin: 'https://www.linkedin.com/in/bartosz-pers-1a2b3c4d',
    twitter: 'https://twitter.com/bartosz.pers',
  })

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }
