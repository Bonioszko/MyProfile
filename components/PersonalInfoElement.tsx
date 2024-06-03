import React from 'react'
import { Text, View } from 'react-native'

interface PersonalInfoElementProps {
  label: string
  text: string
}

export default function PersonalInfoElement({ label, text }: PersonalInfoElementProps) {
  return (
    <View className='my-3 flex flex-row items-center gap-x-2 dark:text-white'>
      <Text className='text-xl font-semibold dark:text-white'>{label}:</Text>
      <Text className='text-xl dark:text-white'>{text}</Text>
    </View>
  )
}
