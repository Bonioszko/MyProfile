import React, { useEffect, useState } from 'react'
import { Button, View, Text, Pressable, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import NfcManager, { NfcTech } from 'react-native-nfc-manager'
import { FontAwesome } from '@expo/vector-icons'
import Card from '@/components/Card'
import { User } from '@/.expo/types/user'
import { CardType } from '@/.expo/types/card'
import { useUser } from '@/context/UserContext'
import FormInput from '@/components/FormInput'
export default function TabTwoScreen() {
  const { user, setUser } = useUser()
  const [formData, setFormData] = useState({ ...user })
  const [formOpened, setFormOpened] = useState(false)
  const [cardData, setCardData] = useState<CardType | null>(null)
  const [friendsCards, setFriendsCards] = useState<CardType[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/${user?.email}/cards`
        )
        const data = await response.json()

        setCardData(data[0])
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [user, formOpened])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/user/${user?.email}/friends/cards`
        )
        const data = await response.json()

        setFriendsCards(data.cards)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [user])

  const changeInput = (field: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }))
  }
  const saveForm = async () => {
    const cardId = cardData?.id
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/card/${cardId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('Success:', data)
    } catch (error) {
      console.error('Error:', error)
    }
    // setCardData(formData)
    setFormOpened(false)
  }
  return user ? (
    <ScrollView className=' bg-secondary-color dark:bg-secondary-color-dark'>
      <View className=' mt-4 flex items-center justify-center'>
        <Text className=' text-2xl font-bold'>Hello {user.name}</Text>
        <Text className=' text-lg '>This is your card</Text>

        <View className='mb-8 flex w-full items-center justify-center'>
          <Pressable onPress={() => setFormOpened(true)}>
            <View className='flex  min-w-[300px] items-end p-3'>
              <FontAwesome name='pencil' size={25}></FontAwesome>
            </View>
          </Pressable>
          {cardData ? <Card card={cardData}></Card> : <Text>'create a card'</Text>}
        </View>
        <View className='flex flex-col  items-center justify-center gap-y-4 '>
          <Text className='font-bold'>Your friends</Text>
          {friendsCards.length > 0 ? (
            friendsCards.map((card) => (
              <View>
                <Card key={card.id} card={card}></Card>
              </View>
            ))
          ) : (
            <Text>Your friends does not have cards</Text>
          )}
        </View>
      </View>
      <Modal isVisible={formOpened} className='flex  items-center justify-center'>
        <View className='flex w-4/5 items-center justify-center gap-y-1 rounded-lg bg-main-color p-7'>
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
            label='facebook'
          />
          <View className='w-full flex-row justify-around'>
            <Pressable onPress={saveForm} className='rounded-lg bg-third-color p-2'>
              <Text className='font-bold'>Submit</Text>
            </Pressable>
            <Pressable onPress={() => setFormOpened(false)} className='rounded-lg bg-red-500 p-2'>
              <Text className='font-bold'>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  ) : null
}
