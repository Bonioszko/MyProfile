import { View, Text } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { User } from '@/.expo/types/user'
import { FontAwesome } from '@expo/vector-icons'
import PersonalInfoElement from '@/components/PersonalInfoElement'
import SocialInfoElement from '@/components/SocialInfoElement'

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
    <View className='flex flex-1 items-center gap-y-5 bg-main-color dark:bg-main-color-dark'>
      <Text className='pt-4 text-4xl font-bold'>Profile</Text>
      <View className='flex w-full flex-col rounded-lg bg-secondary-color p-2 dark:bg-secondary-color-dark'>
        <Text className='text-2xl font-bold'>Personal information</Text>
        <PersonalInfoElement label='Name' text={user.name}></PersonalInfoElement>
        <PersonalInfoElement label='Email' text={user.email}></PersonalInfoElement>
        <PersonalInfoElement label='Phone' text={user.phone}></PersonalInfoElement>
      </View>
      <View className='flex w-full gap-y-10 rounded-lg bg-secondary-color p-2 dark:bg-secondary-color-dark'>
        <SocialInfoElement icon='facebook' link={user.facebook}></SocialInfoElement>
        <SocialInfoElement icon='instagram' link={user.instagram}></SocialInfoElement>
        <SocialInfoElement icon='linkedin' link={user.linkedin}></SocialInfoElement>
        <SocialInfoElement icon='twitter' link={user.twitter}></SocialInfoElement>
      </View>
    </View>
  )
}
