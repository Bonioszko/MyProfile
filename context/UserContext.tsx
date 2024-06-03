import React, { createContext, useState, useContext, ReactNode, ReactElement } from 'react'
import { User } from '@/.expo/types/user'

interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const UserProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<User | null>({
    // name: 'Bartosz Pers',
    email: 'kubabir@outlook.com',
    // phone: '123456789',
    // facebook: 'https://www.facebook.com/bartosz.pers',
    // instagram: 'https://www.instagram.com/bartosz.pers',
    // linkedin: 'https://www.linkedin.com/in/bartosz-pers-1a2b3c4d',
    // twitter: 'https://twitter.com/bartosz.pers',
    // friends: ['38d7932b-4d6f-472a-a279-e1d6820fb9b8', '8f966b39-7879-456e-b8ff-6288161d59cb'],
    // cards: ['a6978a35-b8bd-434e-bc16-423f3d89ec6b'],
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
