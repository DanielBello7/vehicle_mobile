


import { StyleSheet, View, Text, TextInput } from 'react-native';
import { SIZES, TEXT } from '../constants';

type InputGroupProps = {
  title: string
}

export default function InputGroup({title}: InputGroupProps) {
  return (
  <View style={styles.input_group}>
  <Text>{title}</Text>
  <TextInput style={styles.input} placeholder={title}/>
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