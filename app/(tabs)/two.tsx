import React, { useState, useEffect, useContext } from 'react'
import { Button, View, Text, Pressable } from 'react-native'
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager'
import Modal from 'react-native-modal'
import { useUser } from '@/context/UserContext'
import Card from '@/components/Card'
import { User } from '@/.expo/types/user'
import { Link, router } from 'expo-router'
import axios from 'axios'

type OmitFriends = Omit<User, 'friends'>
export default function TabTwoScreen() {
  const [isScanning, setIsScanning] = useState(false)
  const [isWriting, setIsWriting] = useState(false)
  const [hasNfc, setHasNFC] = useState(false)
  const { user } = useUser()

  const [scannedUser, setScannedUser] = useState<OmitFriends>({
    name: 'not scanned',
    email: 'not scanned',
    phone: 'not scanned',
    facebook: 'not scanned',
    instagram: 'not scanned',
    linkedin: 'not scanned',
    twitter: 'not scanned',
  })
  async function startNfcReading() {
    setIsScanning(true)
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef)
      console.info('NFC tech request successful')
      const tag = await NfcManager.getTag()
      console.warn('Tag found', tag)
    } catch (ex) {
      console.warn('Oops!', ex)
    } finally {
      stopNfc(() => setTimeout(() => setIsScanning(false), 3000))
      router.push({
        pathname: '/card/[id]',
        params: { id: 2 },
      })
    }
  }

  async function startNFCWriting() {
    if (!user) {
      console.warn('No user data to write')
      return
    }

    const ndefRecords = [
      Ndef.textRecord(user.name),
      Ndef.textRecord(user.email),
      Ndef.textRecord(user.phone),
      Ndef.textRecord(user.facebook),
      Ndef.textRecord(user.instagram),
      Ndef.textRecord(user.linkedin),
      Ndef.textRecord(user.twitter),
    ]

    try {
      setIsWriting(true)
      await NfcManager.requestTechnology(NfcTech.Ndef)
      console.info('NFC tech request successful')
      const bytes = Ndef.encodeMessage(ndefRecords)
      await NfcManager.ndefHandler.writeNdefMessage(bytes)
      console.info('NFC message written')
    } catch (ex) {
      console.warn('Oops!', ex)
    } finally {
      stopNfc(() => setIsWriting)
    }
  }

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported()

      setHasNFC(deviceIsSupported)
      console.log(process.env.EXPO_PUBLIC_SERVER_URL)
      if (deviceIsSupported) {
        await NfcManager.start()
      }
    }

    checkIsSupported()
  }, [])

  function stopNfc(setState: React.Dispatch<React.SetStateAction<boolean>>) {
    NfcManager.cancelTechnologyRequest()
    setState(false)
  }

  return (
    <View className='flex flex-1 flex-col items-center justify-center gap-4 dark:bg-black'>
      {hasNfc ? (
        <>
          <Modal isVisible={isScanning || isWriting} className='flex items-center justify-center '>
            <View className='flex h-1/3 w-full items-center justify-between '>
              {/* <Card user={isScanning ? scannedUser : user}></Card> */}
              {isScanning ? (
                <View className='flex h-1/3 w-2/3 items-center justify-center bg-secondary-color dark:bg-secondary-color-dark'>
                  <Text className='text-3xl font-extrabold'>Scanning ...</Text>
                </View>
              ) : (
                <Card user={user}></Card>
              )}
              <Button
                title='Stop scanning'
                onPress={isScanning ? () => stopNfc(setIsScanning) : () => stopNfc(setIsWriting)}
              />
            </View>
          </Modal>
          <Pressable
            className='flex w-1/2 items-center justify-center bg-red-400 p-2 focus:bg-white'
            onPress={startNfcReading}
          >
            <Text className='font-bold text-white'>Scan Someones card</Text>
          </Pressable>
          <Pressable
            className='flex w-1/2 items-center justify-center bg-red-400 p-2'
            onPress={startNFCWriting}
          >
            <Text className='font-bold text-white'>Share Your Card</Text>
          </Pressable>
          {/* <Button title='Scan someones card' disabled={isScanning} className='bg-red-500' />

          <Button title='Share a card' onPress={startNFCWriting} /> */}
        </>
      ) : (
        <Text className='text-white'>Your device does not support NFC</Text>
      )}
    </View>
  )
}
