


import { StyleSheet, View, Text, TextInput } from 'react-native';
import { SIZES, TEXT } from '../constants';


type InputGroupProps = {
  title: string,
  value: string,
  secure: boolean,
  disabled: boolean
  keyType: "email-address" | "default",
  textContent: "password" | "emailAddress" | "none"
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function InputGroup({title, secure, setValue, value, keyType, textContent, disabled}: InputGroupProps) {
  return (
  <View style={styles.input_group}>
  <Text>{title}</Text>
  <TextInput style={styles.input} 
             placeholder={title} 
             value={value}
             onChangeText={text => setValue(text)}
             autoCapitalize="none"
             keyboardType={keyType}
             editable={!disabled ? true : false}
             autoComplete="off"
             autoCorrect={false}
             secureTextEntry={secure}
             autoFocus={false}
             returnKeyType="done"
             textContentType={textContent}
             clearButtonMode="always"
             />
  </View>
  )
}

const styles = StyleSheet.create({
  input_group: {
    width: "100%",
    marginBottom: SIZES.medium
  },
  input: {
    borderWidth: 2, 
    fontSize: TEXT.base,
    width: "100%",
    paddingVertical: SIZES.small,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: "#faf8f7",
    marginTop: 5,
    borderRightWidth: 0
  }
});