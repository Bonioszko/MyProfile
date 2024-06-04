import React, { useContext, useEffect, useState } from 'react'
import { Button, View, Text, Pressable, ScrollView, Image } from 'react-native'
import Modal from 'react-native-modal'
import NfcManager, { NfcTech } from 'react-native-nfc-manager'
import { FontAwesome } from '@expo/vector-icons'
import Card from '@/components/Card'
import { User } from '@/.expo/types/user'
import { CardType } from '@/.expo/types/card'
import { useUser } from '@/context/UserContext'
import FormInput from '@/components/FormInput'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { FetchFriendsContext } from '@/context/FetchFriendsContext'
export default function Profile() {
  const { user } = useAuth()
  const { fetchFriends } = useContext(FetchFriendsContext)
  const [formOpened, setFormOpened] = useState(false)
  const [cardData, setCardData] = useState<CardType | null>(null)
  const [formData, setFormData] = useState({ ...cardData })
  const [friendsCards, setFriendsCards] = useState<CardType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/${user?.email}/cards`)

        setCardData(response.data[0])
      } catch (error) {
        console.log(error.request)
        console.error('Failed to user card:', error)
      }
    }
    fetchData()
  }, [user, formOpened])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/${user?.email}/friends/cards`)
        setFriendsCards(response.data.cards || [])
      } catch (error) {
        console.error('Failed to friend cards:', error)
      }
    }
    fetchData()
  }, [user, fetchFriends])

  const changeInput = (field: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }))
  }
  const saveForm = async () => {
    const cardId = cardData?.id
    const method = cardId ? 'PATCH' : 'POST'
    const url = cardId ? `/api/card/${cardId}` : `/api/card`
    try {
      const response = cardId
        ? await axios.patch(url, { userEmail: user?.email, ...formData })
        : await axios.post(url, { userEmail: user?.email, ...formData })

      const data = await response.data
      console.log('Success:', data)
    } catch (error) {
      console.error('Error:', error)
    }
    // setCardData(formData)
    setFormOpened(false)
  }
  return user ? (
    <ScrollView className=' bg-secondary-color dark:bg-secondary-color-dark'>
      <View className='mt-4 flex items-center justify-center'>
        <Text className=' text-2xl font-bold text-gray-900 dark:text-white'>Hello {user.name}</Text>

        <Image
          source={{ uri: `https://api.dicebear.com/8.x/bottts/png?seed=${user.email}` }}
          className='h-24 w-24'
        />
        <Text className=' text-lg text-gray-900 dark:text-white '>This is your card</Text>
        <Pressable
          className='mt-4 flex items-center justify-center '
          onPress={() => {
            setFormData({ ...cardData })
            setFormOpened(true)
          }}
        >
          <View className='flex  min-w-[300px] items-end p-3'>
            <FontAwesome name='pencil' size={25} color='#6B7280'></FontAwesome>
          </View>
        </Pressable>
        <View className='mb-8 flex w-full items-center justify-center'>
          {cardData ? (
            <Card card={cardData} isOwner></Card>
          ) : (
            <Pressable
              className='rounded-lg bg-white  p-2'
              onPress={() => {
                setFormData({ email: user?.email })
                setFormOpened(true)
              }}
            >
              <Text>Create a card</Text>
            </Pressable>
          )}
        </View>
        <View className='flex flex-col  items-center justify-center gap-y-4 pb-8'>
          <Text className='font-bold text-gray-900 dark:text-white'>Your friends</Text>
          {friendsCards.length > 0 ? (
            friendsCards.map((card) => (
              <View key={card.id}>
                <Card card={card}></Card>
              </View>
            ))
          ) : (
            <Text className='text-xl dark:text-white'>No friends found</Text>
          )}
        </View>
      </View>
      <Modal isVisible={formOpened} className='flex  items-center justify-center'>
        <View className='flex w-full items-center justify-center gap-y-2 rounded-lg bg-main-color p-7 dark:bg-main-color-dark'>
          <Text className='mb-4 text-3xl font-bold'>Update your data</Text>
          <FormInput
            key='name'
            input={formData['name']}
            changeInput={(newText: string) => changeInput('name', newText)}
            label='name'
          />
          <FormInput
            key='email'
            input={formData['email']}
            changeInput={(newText: string) => changeInput('email', newText)}
            label='email'
          />
          <FormInput
            key='phone'
            input={formData['phone']}
            changeInput={(newText: string) => changeInput('phone', newText)}
            label='phone'
          />
          <FormInput
            key='facebook'
            input={formData['facebook']}
            changeInput={(newText: string) => changeInput('facebook', newText)}
            label='facebook'
          />
          <FormInput
            key='instagram'
            input={formData['instagram']}
            changeInput={(newText: string) => changeInput('instagram', newText)}
            label='instagram'
          />
          <FormInput
            key='linkedin'
            input={formData['linkedin']}
            changeInput={(newText: string) => changeInput('linkedin', newText)}
            label='linkedin'
          />
          <FormInput
            key='twitter'
            input={formData['twitter']}
            changeInput={(newText: string) => changeInput('twitter', newText)}
            label='twitter'
          />
          <View className='w-full flex-row justify-around'>
            <Pressable
              onPress={() => setFormOpened(false)}
              className='mt-4 rounded-lg bg-red-500 p-2'
            >
              <Text className='font-bold'>Cancel</Text>
            </Pressable>
            <Pressable onPress={saveForm} className='mt-4 rounded-lg bg-third-color p-2'>
              <Text className='font-bold'>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  ) : null
}
