import { TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'

import NfcManager, { NfcTech } from 'react-native-nfc-manager'
NfcManager?.start()
export default function TabTwoScreen() {
  const [isScanning, setIsScanning] = useState(false)

  async function readNdef() {
    setIsScanning(true)
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef)

      console.info('NFC tech request successful')
      const tag = await NfcManager.getTag()

      console.warn('Tag found', tag)
    } catch (ex) {
      console.warn('Oops!', ex)
    } finally {
      setIsScanning(false)
      NfcManager.cancelTechnologyRequest()
    }
  }
  return (
    <View className='flex-1 items-center justify-center bg-blue-800'>
      <Text className='text-2xl font-bold '>Tab Two</Text>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
      {isScanning && <Text>Scanning...</Text>}
      <View lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <EditScreenInfo path='app/(tabs)/two.tsx' />
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
