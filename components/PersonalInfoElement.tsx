import React from 'react'
import { Text, View } from 'react-native'

interface PersonalInfoElementProps {
  label: string
  text: string
}

export default function PersonalInfoElement({ label, text }: PersonalInfoElementProps) {
  return (
    <View className='my-3 flex flex-row items-center gap-x-2'>
      <Text className='text-xl font-semibold'>{label}:</Text>
      <Text className='text-xl'>{text}</Text>
    </View>
  )
}
