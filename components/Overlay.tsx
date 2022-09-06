


import { View, StyleSheet } from "react-native";
import { SIZES } from "../constants";

export default function Overlay() {
  return (
  <View style={styles.overlay}>
  <View style={styles.overlay_box}>

  <View style={{...styles.box1, ...styles.overlay_generic}}/>
  <View style={{...styles.box2, ...styles.overlay_generic}}/>
  <View style={{...styles.box3, ...styles.overlay_generic}}/>
  <View style={{...styles.box4, ...styles.overlay_generic}}/>

  </View>
  </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    marginVertical: SIZES.massive,
    paddingHorizontal: SIZES.massive + 10,
  },
  overlay_box: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  overlay_generic: {
    borderWidth: 6,
    width: 25,
    height: 25,
    position: "absolute",
    borderColor: "white"
  },
  box1: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0
  },
  box2: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0
  },
  box3: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0
  },
  box4: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0
  }
});