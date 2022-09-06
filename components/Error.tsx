


import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES } from '../constants';

type ErrorProps = {
  msg: string
}

export default function Error({msg}: ErrorProps) {
  return (
  <View style={styles.error_box}>
  <Ionicons name="information-circle-outline" size={20} color="red"/>
  <Text style={styles.error}>Error: {msg}</Text>
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