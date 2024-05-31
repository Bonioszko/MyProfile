import React from 'react'
import { Pressable, Text, View, Linking } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
interface SocialInfoElementProps {
  icon: string
  link: string
}

export default function SocialInfoElement({ icon, link }: SocialInfoElementProps) {
  return (
    <Pressable onPress={() => Linking.openURL(link)}>
      <View className='my-4 flex  flex-row items-center gap-x-5'>
        <FontAwesome name={icon} size={24}></FontAwesome>
        <Text>{link}</Text>
      </View>
    </Pressable>
  )
}
