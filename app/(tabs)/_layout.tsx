import React, { useContext } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable, Text } from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import { UserProvider } from '@/context/UserContext'
import ThemeContext from '@/context/ThemeContext'
import { View } from '@/components/Themed'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabTwoScreen from './two'
import Profile from './profile'
import CardDetail from './card/[id]'
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { theme, toggleTheme } = useContext(ThemeContext)
  const Tab = createBottomTabNavigator()
  return (
    <UserProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme === 'dark' ? '#22577a' : '#EFFFFD',
          },
          tabBarStyle: {
            backgroundColor: theme === 'dark' ? '#22577a' : '#EFFFFD',
          },
          headerRight: () => (
            <Pressable onPress={toggleTheme}>
              <FontAwesome name='moon-o' size={24}></FontAwesome>
            </Pressable>
          ),
        }}
      >
        {/* <Tab.Screen
          name='index'
          options={{
            title: 'Tab One',
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
            headerRight: () => (
              <Link href='/modal' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name='info-circle'
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        /> */}
        <Tab.Screen
          name='two'
          component={TabTwoScreen}
          options={{
            title: 'Tab Two',
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
          }}
        />
        <Tab.Screen
          name='profile'
          component={Profile}
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
          }}
        />
        <Tab.Screen
          name='card/[id]'
          component={CardDetail}
          options={{
            headerTitle: 'Card',
            tabBarButton: () => null,
          }}
        />
      </Tab.Navigator>
    </UserProvider>
  )
}
