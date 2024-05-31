import React, { createContext, useState, useEffect } from 'react'
// import { useColorScheme } from 'react-native'
import { useColorScheme } from 'nativewind'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const ThemeContext = createContext() // Create a context

export const ThemeProvider = ({ children }) => {
  const { colorScheme, setColorScheme } = useColorScheme()
  const [theme, setTheme] = useState(colorScheme || 'light')

  useEffect(() => {
    // Load saved theme from storage
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme')
        if (savedTheme) {
          setTheme(savedTheme)
          setColorScheme(savedTheme)
        }
      } catch (error) {
        console.log('Error loading theme:', error)
      }
    }
    getTheme()
  }, [])

  // useEffect(() => {
  //   // set theme to system selected theme
  //   if (colorScheme) {
  //     setTheme(colorScheme)
  //     se
  //   }
  // }, [colorScheme])

  const toggleTheme = () => {
    let newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    AsyncStorage.setItem('theme', newTheme)
    setColorScheme(newTheme)
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
export default ThemeContext
