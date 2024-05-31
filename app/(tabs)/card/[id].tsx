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
    <View className='bg-main-color dark:bg-main-color-dark flex flex-1 items-center gap-y-5'>
      <Text className='pt-4 text-4xl font-bold'>Profile</Text>
      <View className='bg-secondary-color dark:bg-secondary-color-dark flex w-2/3 flex-col rounded-lg p-2'>
        <Text className='text-2xl font-bold'>Personal informations</Text>
        <PersonalInfoElement label='Name' text={user.name}></PersonalInfoElement>
        <PersonalInfoElement label='Email' text={user.email}></PersonalInfoElement>
        <PersonalInfoElement label='Phone' text={user.phone}></PersonalInfoElement>
      </View>
      <View className='bg-secondary-color dark:bg-secondary-color-dark flex w-2/3 gap-y-10 rounded-lg p-2'>
        <SocialInfoElement icon='facebook' link={user.facebook}></SocialInfoElement>
        <SocialInfoElement icon='instagram' link={user.instagram}></SocialInfoElement>
        <SocialInfoElement icon='linkedin' link={user.linkedin}></SocialInfoElement>
        <SocialInfoElement icon='twitter' link={user.twitter}></SocialInfoElement>
      </View>
    </View>
  )
}
