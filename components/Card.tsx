import { User } from '@/.expo/types/user'
import { View, Text, Linking } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
interface CardProps {
  user: User
}
export default function Card({ user }: CardProps) {
  return (
    <View className='min-h-[200px]  min-w-[300px] rounded-lg bg-blue-500 p-4'>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Text>{user.phone}</Text>
      <FontAwesome name='facebook' size={24} onPress={() => Linking.openURL(user.facebook)} />
      <FontAwesome name='instagram' size={24} onPress={() => Linking.openURL(user.instagram)} />
      <FontAwesome name='linkedin' size={24} onPress={() => Linking.openURL(user.linkedin)} />
      <FontAwesome name='twitter' size={24} onPress={() => Linking.openURL(user.twitter)} />
    </View>
  )
}
