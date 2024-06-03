import React, { useContext } from 'react'
import { Pressable, Text, View, Linking, ToastAndroid } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import ThemeContext from '@/context/ThemeContext'
interface SocialInfoElementProps {
  icon: string
  link: string
}

export default function SocialInfoElement({ icon, link }: SocialInfoElementProps) {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Pressable onPress={() => (link ? Linking.openURL(link) : null)}>
      <View className='my-4 flex flex-row items-center gap-x-5'>
        <FontAwesome name={icon} size={24} color={theme === 'dark' ? '#22577a' : 'FFFFFF'} />
        <Text className='dark:text-white'>{link}</Text>
      </View>
    </Pressable>
  )
}
