import React, { useContext } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import ThemeContext from '@/context/ThemeContext'
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, true),
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
      <Tabs.Screen
        name='index'
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name='user' color={color} />,
        }}
      />
      <Tabs.Screen
        name='card/[id]'
        options={{
          headerTitle: 'Card',
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  )
}
