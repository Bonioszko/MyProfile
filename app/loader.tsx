import React from 'react'
import { Text, View } from 'react-native'

export default function Loader() {
  return (
    <View className='flex flex-1 flex-col items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <Text className='text-2xl font-bold text-white'>Loading</Text>
    </View>
  )
}
