


import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TEXT, SIZES } from '../constants';

type SubmitButtonProps = {
  title: string
}

export default function SubmitButton({title}: SubmitButtonProps) {
  return (
  <TouchableOpacity style={styles.btn}>
  <Text style={{...styles.btn_text}}>{title}</Text>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1, 
    paddingVertical: SIZES.small, 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: SIZES.medium,
    backgroundColor: "black"
  },
  btn_text: {
    fontSize: TEXT.base,
    fontWeight: "bold",
    color: "white"
  }
});