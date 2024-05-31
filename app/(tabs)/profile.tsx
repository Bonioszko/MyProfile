import React, { useState } from 'react'
import { Button, View, Text, Pressable } from 'react-native'
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
    <View className='flex flex-1 flex-col items-center justify-center '>
      <Text className=' text-2xl font-bold'>Hello {user.name}</Text>
      <Text className=' text-lg '>This is your card</Text>

      <View className='flex h-3/5 w-full items-center justify-center '>
        <Pressable onPress={() => setFormOpened(true)}>
          <View className='flex  min-w-[300px] items-end p-3'>
            <FontAwesome name='pencil' size={25}></FontAwesome>
          </View>
        </Pressable>
        <Card user={user}></Card>
      </View>
      <Modal visible={formOpened} className='flex  items-center justify-center'>
        <View className='flex  w-2/3 items-center justify-center '>
          {Object.keys(formData).map((field) => (
            <FormInput
              key={field}
              input={formData[field]}
              changeInput={(newText: string) => changeInput(field, newText)}
            />
          ))}
          <Pressable onPress={saveForm}>
            <Text>button</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  ) : null
}
