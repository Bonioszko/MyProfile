import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import React, { useState } from 'react'
import {
  Button,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'

export default function Signup({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useAuth()

  async function signUp() {
    try {
      const data = {
        name,
        email,
        password,
      }
      const res = await axios.post('/api/user', data)

      console.log(`Signup successful for ${email}`)

      auth.signup({ email: email, name: name, token: res.data.token })
    } catch (err) {
      console.log(err)
      ToastAndroid.show('An unexpected error occured', ToastAndroid.SHORT)
    }
  }

  return (
    <View className='bg-gray-50 dark:bg-gray-900'>
      <View className='mx-auto flex h-screen flex-col items-center px-2 py-8'>
        <View className='space-y-4'>
          <Text className='w-[75vw] text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white'>
            Create an account
          </Text>
          <View className='space-y-4 md:space-y-6'>
            <View>
              <Text className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                Your name
              </Text>
              <TextInput
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                placeholder='John'
                value={name}
                onChangeText={setName}
              />
            </View>
            <View>
              <Text className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                Your email
              </Text>
              <TextInput
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                placeholder='name@company.com'
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View>
              <Text className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                Password
              </Text>
              <TextInput
                placeholder='••••••••'
                secureTextEntry
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Pressable
              className='w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium  hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              onPress={signUp}
            >
              <Text className='text-center text-white'>Create an account</Text>
            </Pressable>
            <View>
              <Text className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                className='font-medium hover:underline'
                onPress={() => navigation.navigate('signin')}
              >
                <Text className='text-blue-600 dark:text-blue-500'>Login here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
