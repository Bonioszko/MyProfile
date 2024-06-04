import { CardType } from '@/.expo/types/card'
import { View, Text, Linking, Pressable, Image, ToastAndroid } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Link, router } from 'expo-router'
interface CardProps {
  card: CardType
  isOwner?: Boolean
}
export default function Card({ card, isOwner = false }: CardProps) {
  const handlePress = () => {
    router.push({
      pathname: '/card/[id]',
      params: { id: card?.id },
    })
  }

  return (
    <Pressable onPress={handlePress}>
      <View className='flex  min-h-[200px] w-[300px] items-center justify-around rounded-lg bg-third-color p-4'>
        <Text className='text-xl font-bold'>{isOwner ? card?.name : card?.user_name}</Text>
        {!isOwner && (
          <Image
            source={{ uri: `https://api.dicebear.com/8.x/bottts/png?seed=${card?.email}` }}
            className='mb-4 h-16 w-16'
          />
        )}
        <Text className='text-l font-bold'>{card?.email}</Text>
        <Text className='text-l my-2 mb-6 font-bold'>{card?.phone}</Text>
        <View className='flex w-[250px] flex-row justify-between'>
          <FontAwesome
            name='facebook'
            size={24}
            onPress={() =>
              card.facebook
                ? Linking.openURL(card?.facebook)
                : ToastAndroid.show('No facebook link found', ToastAndroid.SHORT)
            }
          />
          <FontAwesome
            name='instagram'
            size={24}
            onPress={() =>
              card.instagram
                ? Linking.openURL(card?.instagram)
                : ToastAndroid.show('No instagram link found', ToastAndroid.SHORT)
            }
          />
          <FontAwesome
            name='linkedin'
            size={24}
            onPress={() =>
              card.linkedin
                ? Linking.openURL(card?.linkedin)
                : ToastAndroid.show('No linkedin link found', ToastAndroid.SHORT)
            }
          />
          <FontAwesome
            name='twitter'
            size={24}
            onPress={() =>
              card.twitter
                ? Linking.openURL(card?.twitter)
                : ToastAndroid.show('No twitter link found', ToastAndroid.SHORT)
            }
          />
        </View>
      </View>
    </Pressable>
  )
}
