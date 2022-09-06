


import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { SIZES, TEXT } from "../constants";
import { useData } from '../context';


type BackButtonProps = {
  press: Function
}

type HeaderProps = {
  title: string,
  showBack: boolean
}

function BackButton({press}: BackButtonProps) {
  return (
  <TouchableOpacity onPress={() => press()}>
  <FontAwesome5 name="arrow-left" size={20} color="white"/>
  </TouchableOpacity>
  );
}

export default function Header({title, showBack}: HeaderProps) {
  const { theme } = useData();

  const navigation = useNavigation();

  const HandlePress = () => navigation.goBack();

  return (
  <View style={{...styles.main, backgroundColor: theme.main}}>
    <View style={{...styles.sub, justifyContent: showBack ? "center" : "space-between"}}>
    {showBack && <BackButton press={HandlePress} />}
    <Text style={styles.title_text}>{title}</Text>
    {showBack && <Text style={styles.absent}></Text>}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: 120
  },
  sub: {
    width: "100%",
    position: "absolute",
    bottom: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.small
  },
  title_text: {
    fontSize: TEXT.medium,
    letterSpacing: -1,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  absent: {
    width: 20
  }
});