import { CardType } from '@/.expo/types/card'
import { View, Text, Linking, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Link, router } from 'expo-router'
interface CardProps {
  card: CardType
}
export default function Card({ card }: CardProps) {
  const handlePress = () => {
    router.push({
      pathname: '/card/[id]',
      params: { id: 2 },
    })
  }

  return (
    <Pressable onPress={handlePress}>
      <View className='min-h-[200px]  min-w-[300px] rounded-lg bg-third-color p-4'>
        <Text>{card.name}</Text>
        <Text>{card.email}</Text>
        <Text>{card.phone}</Text>
        <FontAwesome name='facebook' size={24} onPress={() => Linking.openURL(card.facebook)} />
        <FontAwesome name='instagram' size={24} onPress={() => Linking.openURL(card.instagram)} />
        <FontAwesome name='linkedin' size={24} onPress={() => Linking.openURL(card.linkedin)} />
        <FontAwesome name='twitter' size={24} onPress={() => Linking.openURL(card.twitter)} />
      </View>
    </Pressable>
  )
}
