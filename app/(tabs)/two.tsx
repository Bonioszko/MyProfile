import React, { useState, useEffect, useContext } from 'react'
import { Button, View, Text, Pressable } from 'react-native'
import NfcManager, { NfcTech, Ndef, nfcManager } from 'react-native-nfc-manager'
import Modal from 'react-native-modal'
import { useUser } from '@/context/UserContext'
import Card from '@/components/Card'
import { User } from '@/.expo/types/user'
import { CardType } from '@/.expo/types/card'
import { Link, router } from 'expo-router'
import axios from 'axios'
import { useAuth } from '@/context/AuthContext'
import { FetchFriendsContext } from '@/context/FetchFriendsContext'
type OmitFriends = Omit<User, 'friends'>
export default function TabTwoScreen() {
  const { toggleFetchFriends } = useContext(FetchFriendsContext)
  const [isScanning, setIsScanning] = useState(false)
  const [isWriting, setIsWriting] = useState(false)
  const [cardData, setCardData] = useState<CardType | null>(null)
  const [hasNfc, setHasNFC] = useState(false)
  const { user } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/api/user/${user?.email}/cards`
        )
        const data = await response.json()

        setCardData(data[0])
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchData()
  }, [user])
  // const [scannedUser, setScannedUser] = useState<OmitFriends>({
  //   name: 'not scanned',
  //   email: 'not scanned',
  //   phone: 'not scanned',
  //   facebook: 'not scanned',
  //   instagram: 'not scanned',
  //   linkedin: 'not scanned',
  //   twitter: 'not scanned',
  // })
  async function startNfcReading() {
    let userEmail = ''
    setIsScanning(true)
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef)
      let tag = await NfcManager.getTag()
      if (tag?.ndefMessage) {
        const content = Ndef.decodeMessage(tag.ndefMessage[0].payload)

        userEmail = content[0].type
      }
      console.log('Tag owner: ', userEmail)

      const response = await axios.post('/api/user/friends', {
        requestorEmail: user?.email,
        friendEmail: userEmail,
      })
      if (response.status === 200) {
        const responseCard = await axios.get(`/api/user/${userEmail}/cards`)
        if (responseCard.status === 200) {
          toggleFetchFriends()
          router.push({
            pathname: '/card/[id]',
            params: { id: responseCard.data[0].id },
          })
        }
      }
    } catch (ex) {
      console.warn('Oops!', ex)
    } finally {
      NfcManager.cancelTechnologyRequest()
      stopNfc(() => setIsScanning(false))
    }
  }

  async function startNFCWriting() {
    if (!user) {
      console.warn('No user data to write')
      return
    }

    const ndefRecords = [Ndef.textRecord('ctt' + user?.email)]

    try {
      setIsWriting(true)
      await NfcManager.requestTechnology(NfcTech.Ndef)

      const bytes = Ndef.encodeMessage(ndefRecords)
      await NfcManager.ndefHandler.writeNdefMessage(bytes)
      console.info('NFC message written')
    } catch (ex) {
      console.warn('Oops!', ex)
    } finally {
      stopNfc(setIsWriting)
    }
  }

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported()

      setHasNFC(deviceIsSupported)
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
    <View className='flex flex-1 flex-col items-center justify-center gap-4 bg-secondary-color dark:bg-secondary-color-dark'>
      {hasNfc ? (
        <>
          <Modal isVisible={isScanning || isWriting} className='flex items-center justify-center '>
            <View className='flex h-1/3 w-full items-center justify-between '>
              {/* <Card user={isScanning ? scannedUser : user}></Card> */}
              {isScanning ? (
                <View className='flex h-1/3 w-2/3 items-center justify-center rounded-lg bg-secondary-color dark:bg-secondary-color-dark '>
                  <Text className='text-3xl font-extrabold dark:text-white'>Scanning ...</Text>
                </View>
              ) : (
                <Card card={cardData}></Card>
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
        <Text className='text-2xl font-bold text-black dark:text-white'>
          Your device does not support NFC
        </Text>
      )}
    </View>
  )
}
