


import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES } from '../constants';

type ErrorProps = {
  msg: string,
  isError?: boolean
}

export default function Error({msg, isError = true}: ErrorProps) {
  return (
  <View style={styles.error_box}>
  <Ionicons name="information-circle-outline" size={20} color={isError ? "red" : "green"}/>
  <Text style={{...styles.error, color: isError ? "red": "green"}}>
    {isError ? "Error:" : "Info:"} {msg}
  </Text>
  </View>
  );
}

const styles = StyleSheet.create({
  error:{
    color: "red",
    fontWeight: "bold",
    marginLeft: 5
  },
  error_box: {
    marginTop: SIZES.base,
    flexDirection: "row", 
    alignItems: "center"
  },
});