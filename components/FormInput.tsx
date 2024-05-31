import { TextInput, View } from 'react-native'

export default function FormInput({ input, changeInput }) {
  return (
    <View className='w-full border-2 border-solid border-black'>
      <TextInput value={input} onChangeText={(newText) => changeInput(newText)}></TextInput>
    </View>
  )
}
