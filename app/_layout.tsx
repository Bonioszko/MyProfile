import 'react-native-gesture-handler'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useContext } from 'react'
import 'react-native-reanimated'
import { useColorScheme } from '@/components/useColorScheme'
import axios from 'axios'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import Loader from './loader'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabLayout from './(tabs)/_layout'
import ModalScreen from './modal'
import Signin from './signin'
import Signup from './signup'
import { UserProvider } from '@/context/UserContext'
import ThemeContext, { ThemeProvider } from '@/context/ThemeContext'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  axios.defaults.baseURL = 'http:localhost:8080'

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  return (
    <UserProvider>
      <ThemeProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </ThemeProvider>
    </UserProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const authContext = useAuth()
  const { theme, toggleTheme } = useContext(ThemeContext)
  const Stack = createNativeStackNavigator()

  if (authContext.isLoading) {
    // We haven't finished checking for the token yet
    return <Loader />
  }

  return (
    <Stack.Navigator>
      {authContext.isAuthenticated ? (
        <>
          <Stack.Screen
            name='(tabs)'
            component={TabLayout}
            options={{
              headerTitle: 'MyProfile',
              headerStyle: {
                backgroundColor: theme === 'dark' ? '#0077b6' : '#EFFFFD',
              },

              headerRight: () => (
                <View className='flex flex-row items-center justify-center gap-x-4'>
                  <Pressable
                    className='bg-red-400 p-2 focus:bg-white'
                    onPress={authContext.signout}
                  >
                    <Text className='font-bold text-white'>Signout</Text>
                  </Pressable>
                  <Pressable onPress={toggleTheme}>
                    <FontAwesome name='moon-o' size={24}></FontAwesome>
                  </Pressable>
                </View>
              ),
            }}
          />
          <Stack.Screen name='modal' component={ModalScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name='signin'
            component={Signin}
            options={{
              headerStyle: {
                backgroundColor: theme === 'dark' ? '#0077b6' : '#EFFFFD',
              },
              headerRight: () => (
                <Pressable onPress={toggleTheme}>
                  <FontAwesome name='moon-o' size={24}></FontAwesome>
                </Pressable>
              ),
            }}
          />
          <Stack.Screen
            name='signup'
            component={Signup}
            options={{
              headerStyle: {
                backgroundColor: theme === 'dark' ? '#0077b6' : '#EFFFFD',
              },
              headerRight: () => (
                <Pressable onPress={toggleTheme}>
                  <FontAwesome name='moon-o' size={24}></FontAwesome>
                </Pressable>
              ),
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
