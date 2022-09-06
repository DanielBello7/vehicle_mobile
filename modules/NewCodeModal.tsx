


import React from "react";
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Modal, SafeAreaView, View, Text, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { SIZES, TEXT } from "../constants";
import { useData } from '../context';

type NewCodeModalProps = {
  isVisible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type BackButtonProps = {
  press: Function
}

type HeaderProps = {
  HeaderFunction: Function
}

function BackButton({press}: BackButtonProps) {
  return (
  <TouchableOpacity onPress={() => press()}>
  <FontAwesome5 name="times" size={24} color="white"/>
  </TouchableOpacity>
  );
}

function Header({HeaderFunction}: HeaderProps) {
  return (
  <View style={styles.header}>
    <BackButton press={() => HeaderFunction()}/>
    <Text style={styles.text_1}>QR Code</Text>
    <Text style={styles.absent}></Text>
  </View>
  )
}

function Overlay() {
  const { theme } = useData();

  return (
  <View style={styles.overlay}>
  <View style={styles.overlay_box}>

    <View style={{...styles.box1, ...styles.overlay_generic, borderColor: theme.main}}/>
    <View style={{...styles.box2, ...styles.overlay_generic, borderColor: theme.main}}/>
    <View style={{...styles.box3, ...styles.overlay_generic, borderColor: theme.main}}/>
    <View style={{...styles.box4, ...styles.overlay_generic, borderColor: theme.main}}/>

    <View style={styles.img_box}>
    <AntDesign name="qrcode" size={300}/>
    </View>

  </View>
  </View>
  )
}

function CodeBox() {
  return (
  <View style={styles.code_box}>
  <Text style={styles.info_text}>
  Lorem ipsum dolor sit 
  amet consectetur, adipisicing 
  elit. Voluptas voluptatum 
  </Text>

  <Overlay />
  </View>
  )
}

export default function NewCodeModal({isVisible, setVisible}: NewCodeModalProps) {
  const { theme } = useData();

  return (
  <React.Fragment>
  <StatusBar barStyle="light-content" />
  <Modal visible={isVisible} animationType="slide">
  <SafeAreaView style={{...styles.main, backgroundColor: theme.main}}>

    <Header HeaderFunction={() => setVisible(false)}/>

    <View style={styles.sub}>
    <CodeBox />
    </View>

  </SafeAreaView>
  </Modal>
  </React.Fragment>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  sub: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
    paddingHorizontal: SIZES.small
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.small,
    paddingTop: SIZES.massive
  },
  text_1: {
    fontSize: TEXT.medium,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: -0.5,
    color: "white"
  },
  absent: {
    marginLeft: 10
  },
  code_box: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: SIZES.massive,
    paddingHorizontal: SIZES.large
  },
  info_text: {
    width: "100%",
    textAlign: "center",
    fontSize: TEXT.base,
    marginBottom: SIZES.large
  },
  overlay_box: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  overlay_generic: {
    borderWidth: 5,
    width: 25,
    height: 25,
    position: "absolute"
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
  },
  overlay: {
    width: "100%",
    marginVertical: SIZES.massive,
  },
  img_box: {
    width: 350,
    height: 350,
    alignItems: "center",
    justifyContent: "center"
  }
});