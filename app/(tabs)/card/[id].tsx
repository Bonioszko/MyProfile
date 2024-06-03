import { View, Text } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { User } from '@/.expo/types/user'
import { FontAwesome } from '@expo/vector-icons'
import PersonalInfoElement from '@/components/PersonalInfoElement'
import SocialInfoElement from '@/components/SocialInfoElement'
import { CardType } from '@/.expo/types/card'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function CardDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [cardData, setCardData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/card/${id}`)
        const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/api/card/${id}`)
        console.log(response.data)
        setCardData(response.data.card)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [id])
  if (!cardData) {
    return <Text>Loading...</Text>
  }
  return (
    <View className='flex flex-1 items-center gap-y-5 bg-main-color dark:bg-main-color-dark'>
      <Text className='pt-4 text-4xl font-bold'>Profile</Text>
      <View className='flex w-full flex-col rounded-lg bg-secondary-color p-2 dark:bg-secondary-color-dark'>
        <Text className='text-2xl font-bold dark:text-white'>Personal information</Text>
        <PersonalInfoElement label='Name' text={cardData.name}></PersonalInfoElement>
        <PersonalInfoElement label='Email' text={cardData.email}></PersonalInfoElement>
        <PersonalInfoElement label='Phone' text={cardData.phone}></PersonalInfoElement>
      </View>
      <View className='flex w-full gap-y-10 rounded-lg bg-secondary-color p-2 dark:bg-secondary-color-dark'>
        <SocialInfoElement icon='facebook' link={cardData.facebook}></SocialInfoElement>
        <SocialInfoElement icon='instagram' link={cardData.instagram}></SocialInfoElement>
        <SocialInfoElement icon='linkedin' link={cardData.linkedin}></SocialInfoElement>
        <SocialInfoElement icon='twitter' link={cardData.twitter}></SocialInfoElement>
      </View>
    </View>
  )
}
