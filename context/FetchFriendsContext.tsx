import React from 'react'

export const FetchFriendsContext = React.createContext({
  fetchFriends: false,
  setFetchFriends: () => {},
  toggleFetchFriends: () => {},
})

export const FetchFriendsProvider = ({ children }) => {
  const [fetchFriends, setFetchFriends] = React.useState(false)

  const toggleFetchFriends = () => {
    setFetchFriends((prevState) => !prevState)
  }

  return (
    <FetchFriendsContext.Provider value={{ fetchFriends, setFetchFriends, toggleFetchFriends }}>
      {children}
    </FetchFriendsContext.Provider>
  )
}
