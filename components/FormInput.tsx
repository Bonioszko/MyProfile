import { TextInput, View, Text } from 'react-native'

interface FormInputProps {
  input: string
  changeInput: (newText: string) => void
  label: string
}

export default function FormInput({ input, changeInput, label }: FormInputProps) {
  return (
    <View className='w-full'>
      <Text className='text-lg font-semibold capitalize dark:text-white'>{label}</Text>
      <TextInput
        value={input}
        onChangeText={(newText) => changeInput(newText)}
        className='rounded-lg border border-solid border-gray-700 p-1 px-2 dark:text-white'
        keyboardType={label.toLowerCase() === 'phone' ? 'numeric' : 'default'}
      />
    </View>
  )
}
