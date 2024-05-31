import { View, Text } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { User } from '@/.expo/types/user'

export default function CardDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const user: User = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    facebook: 'johndoe',
    instagram: 'johndoe',
    linkedin: 'johndoe',
    twitter: 'johndoe',
  }
  return (
    <View className='bg-main-color dark:bg-main-color-dark flex-1'>
      <Text className='mb-2 text-lg'>Name: {user.name}</Text>
      <Text className='mb-2 text-lg'>Email: {user.email}</Text>
      <Text className='mb-2 text-lg'>Phone: {user.phone}</Text>
      <Text className='mb-2 text-lg'>Facebook: {user.facebook}</Text>
      <Text className='mb-2 text-lg'>Instagram: {user.instagram}</Text>
      <Text className='mb-2 text-lg'>LinkedIn: {user.linkedin}</Text>
      <Text className='mb-2 text-lg'>Twitter: {user.twitter}</Text>
    </View>
  )
}
