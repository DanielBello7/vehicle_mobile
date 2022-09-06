


import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { SIZES } from "../constants";

export default function GeneralHeader() {
  const navigation = useNavigation();

  return (
  <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
  <FontAwesome5 name="arrow-left" size={24}/>
  </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: SIZES.base,
    paddingHorizontal: SIZES.small,
    backgroundColor: "white",
    zIndex: 22
  },
});