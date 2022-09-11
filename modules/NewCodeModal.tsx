


import React, { useState, useEffect, useRef } from "react";
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { Modal, SafeAreaView, View, Text, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { SIZES, TEXT } from "../constants";
import { requestPermissionsAsync, getPermissionsAsync, saveToLibraryAsync } from 'expo-media-library';
import { useData } from '../context';
import * as fileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import QRCode from 'react-native-qrcode-svg';

type NewCodeModalProps = {
  data: string,
  isVisible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type CodeBoxProps = {
  data: string,
  img: any
}

type OverlayProps = {
  data: string,
  img: any
}

type BackButtonProps = {
  press: Function
}

type HeaderProps = {
  HeaderFunction: Function
}

type OptionsProps = {
  img: any
}

async function GetURL(item: any): Promise<string> {
  const a: string = await new Promise((resolve, reject) => {
    item.toDataURL((data: any) => resolve(data));
  });
  return a;
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

function Overlay({data, img}: OverlayProps) {
  const { theme } = useData();

  return (
  <View style={styles.overlay}>
  <View style={styles.overlay_box}>

    <View style={{...styles.box1, ...styles.overlay_generic, borderColor: theme.main}}/>
    <View style={{...styles.box2, ...styles.overlay_generic, borderColor: theme.main}}/>
    <View style={{...styles.box3, ...styles.overlay_generic, borderColor: theme.main}}/>
    <View style={{...styles.box4, ...styles.overlay_generic, borderColor: theme.main}}/>

    <View style={styles.img_box}>
    <QRCode value={data} size={250} getRef={img} />
    </View>

  </View>
  </View>
  )
}

function Options({img}: OptionsProps) {
  const {theme} = useData();

  const [error, setError] = useState({msg: "", show: false});
  
  const PermissionConfirm = async () => {
    const permission = await getPermissionsAsync();
    if (permission.status === "granted") return true;

    const askPermission = await requestPermissionsAsync();
    if (askPermission.status === "granted") return true;

    return false;
  }

  const SaveToPhone = async () => {
    const permission = await PermissionConfirm();
    
    if (!permission) return setError({msg: "Permissions required", show: true});

    const newCode = await GetURL(img.current);

    const path = fileSystem.cacheDirectory + `user-code${Math.random()}.png`;

    fileSystem.writeAsStringAsync(path, newCode, {encoding: 'base64'})
    .then(() => saveToLibraryAsync(path))
    .then(() => setError({msg: "Image saved", show: true}))
    .catch((error) => setError({msg: "Error. Try again.", show: true}));
  }

  const ShareCode = async () => {
    const permission = await PermissionConfirm();

    if (!permission) return setError({msg: "Permissions required", show: true});

    const code = await GetURL(img.current);

    const path = fileSystem.cacheDirectory + `user-code${Math.random()}.png`;

    fileSystem.writeAsStringAsync(path, code, {encoding: 'base64'})
    .then(() => Sharing.shareAsync(path))
    .catch((error) => setError({msg: error.message, show: true}));
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => setError({msg: "", show: false}), 4000);
    return () => clearTimeout(timeoutID);
  }, [error.show]);
  
  return (
  <View style={styles.cont_main}>
  <View style={styles.options}>
  <TouchableOpacity style={{...styles.button, backgroundColor: theme.main}} onPress={SaveToPhone}>
  <FontAwesome name="download" size={20} color="white"/>
  </TouchableOpacity>

  <TouchableOpacity style={{...styles.button, backgroundColor: theme.main}} onPress={ShareCode}>
  <FontAwesome name="share-square-o" size={20} color="white"/>
  </TouchableOpacity>
  </View>

  {error.show && <Text style={styles.warning}>{error.msg}</Text>}
  </View>
  );
}

function CodeBox({data, img}: CodeBoxProps) {
  return (
  <View style={styles.code_box}>
  <Text style={styles.info_text}>
  This is your QR Code. 
  You can download it 
  or share anywhere.
  </Text>

  <Overlay data={data} img={img}/>

  <Options img={img}/>
  </View>
  )
}

export default function NewCodeModal({isVisible, setVisible, data}: NewCodeModalProps) {
  const { theme } = useData();

  const CodeRef = useRef();

  return (
  <React.Fragment>
  <StatusBar barStyle="light-content" />
  <Modal visible={isVisible} animationType="slide">
  <SafeAreaView style={{...styles.main, backgroundColor: theme.main}}>

    <Header HeaderFunction={() => setVisible(false)}/>

    <View style={styles.sub}>
    <CodeBox data={data} img={CodeRef}/>
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
    fontSize: TEXT.small,
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
    marginTop: SIZES.base,
    marginBottom: SIZES.massive
  },
  img_box: {
    width: 350,
    height: 350,
    alignItems: "center",
    justifyContent: "center"
  },
  options: {
    width: "60%",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  button: {
    padding: 15,
    borderRadius: 500
  },
  cont_main: {
    marginBottom: SIZES.massive,
    alignItems: "center",
    justifyContent: "center"
  },
  warning: {
    marginTop: SIZES.large,
    fontSize: TEXT.base,
    fontWeight: "bold"
  }
}); 