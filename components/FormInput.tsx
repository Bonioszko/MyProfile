import { TextInput, View, Text } from 'react-native'

interface FormInputProps {
  input: string
  changeInput: (newText: string) => void
  label: string
}

export default function FormInput({ input, changeInput, label }: FormInputProps) {
  return (
    <View className=' w-full '>
      <Text className=' text-lg font-bold'>{label}</Text>
      <TextInput
        value={input}
        onChangeText={(newText) => changeInput(newText)}
        className='rounded-lg border-2 border-solid border-black p-1'
      ></TextInput>
    </View>
  )
}
