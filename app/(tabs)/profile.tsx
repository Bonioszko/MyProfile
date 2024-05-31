import React, { useState } from 'react'
import { Button, View, Text, Pressable, ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import NfcManager, { NfcTech } from 'react-native-nfc-manager'
import { FontAwesome } from '@expo/vector-icons'
import Card from '@/components/Card'
import { User } from '@/.expo/types/user'
import { useUser } from '@/context/UserContext'
import FormInput from '@/components/FormInput'
export default function TabTwoScreen() {
  const { user, setUser } = useUser()
  const [formData, setFormData] = useState({ ...user })
  const [formOpened, setFormOpened] = useState(false)
  const changeInput = (field: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }))
  }
  const saveForm = () => {
    setUser(formData)
    setFormOpened(false)
  }
  return user ? (
    <ScrollView className=' '>
      <View className='mt-4 flex items-center justify-center'>
        <Text className=' text-2xl font-bold'>Hello {user.name}</Text>
        <Text className=' text-lg '>This is your card</Text>

        <View className='mb-8 flex w-full items-center justify-center'>
          <Pressable onPress={() => setFormOpened(true)}>
            <View className='flex  min-w-[300px] items-end p-3'>
              <FontAwesome name='pencil' size={25}></FontAwesome>
            </View>
          </Pressable>
          <Card user={user}></Card>
        </View>
        <View className='flex flex-col  items-center justify-center gap-y-4 '>
          <Text className='font-bold'>Your friends</Text>
          <View className=''>
            <Card user={user}></Card>
          </View>
          <View className=''>
            <Card user={user}></Card>
          </View>
          <View className=''>
            <Card user={user}></Card>
          </View>
        </View>
      </View>
      <Modal isVisible={formOpened} className='flex  items-center justify-center'>
        <View className='bg-main-color flex w-4/5 items-center justify-center gap-y-1 rounded-lg p-7'>
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
          <View className='w-full flex-row justify-around'>
            <Pressable onPress={saveForm} className='bg-third-color rounded-lg p-2'>
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
