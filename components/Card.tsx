import { User } from '@/.expo/types/user'
import { View, Text, Linking, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Link, router } from 'expo-router'
interface CardProps {
  user: User
}
export default function Card({ user }: CardProps) {
  const handlePress = () => {
    router.push({
      pathname: '/card/[id]',
      params: { id: 2 },
    })
  }

  return (
    <Pressable onPress={handlePress}>
      <View className='bg-third-color  min-h-[200px] min-w-[300px] rounded-lg p-4'>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
        <FontAwesome name='facebook' size={24} onPress={() => Linking.openURL(user.facebook)} />
        <FontAwesome name='instagram' size={24} onPress={() => Linking.openURL(user.instagram)} />
        <FontAwesome name='linkedin' size={24} onPress={() => Linking.openURL(user.linkedin)} />
        <FontAwesome name='twitter' size={24} onPress={() => Linking.openURL(user.twitter)} />
      </View>
    </Pressable>
  )
}
