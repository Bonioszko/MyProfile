import React from 'react'
import { Button, Text, View } from 'react-native'

export default function Signin({ navigation }) {
  return (
    <View className='flex flex-1 flex-col items-center justify-center '>
      <Text className='text-2xl font-bold text-white'>Signin</Text>
      <Button title='Go to SignUp' onPress={() => navigation.navigate('signup')} />
    </View>
  )
}
