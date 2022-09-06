


import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TEXT, SIZES } from '../constants';
import Spinner from './Spinner';

type SubmitButtonProps = {
  title: string,
  press: Function,
  isLoading: boolean,
  color: string,
  txtColor: string
}

export default function SubmitButton({title, press, isLoading, color, txtColor}: SubmitButtonProps) {
  return (
  <TouchableOpacity style={{...styles.btn, backgroundColor: color}} onPress={() => press()} disabled={isLoading && true}>
  {isLoading ? <Spinner color='white' size={20}/> : <Text style={{...styles.btn_text, color: txtColor}}>{title}</Text>}
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: SIZES.medium, 
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