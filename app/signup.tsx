import React from 'react'
import { Button, Text, View } from 'react-native'

export default function Signup({ navigation }) {
  return (
    <View className='flex flex-1 flex-col items-center justify-center '>
      <Text className='text-2xl font-bold text-white'>Signup</Text>
      <Button title='Go to SignIn' onPress={() => navigation.navigate('signin')} />
    </View>
  )
}
