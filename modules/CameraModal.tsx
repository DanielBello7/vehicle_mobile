


import React, { useEffect, useState } from "react";
import { View, Text, Modal, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SIZES, TEXT } from "../constants";
import { BarCodeScanningResult, Camera } from "expo-camera";
import { useData } from "../context";
import { REACT_APP_ENCRYPTION_KEY } from '@env';
import CryptoJS from "react-native-crypto-js";
import Overlay from '../components/Overlay';

type CameraModalProps = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

type HeaderProps = {
  press: Function
}

function Header({press}: HeaderProps) {
  return (
  <View style={styles.header}>
  <TouchableOpacity onPress={() => press()}>
  <AntDesign name="closecircle" size={40} color="white" />
  </TouchableOpacity>
  </View>
  );
}

export default function CameraModal(props: CameraModalProps) {
  const {show, setShow} = props;

  const {setHasData, setData} = useData();

  const [gotten, setGotten] = useState(false);

  const HandlePress = () => setShow(false);

  const HandleScanning = (event: BarCodeScanningResult) => {
    if (gotten) return;
    setGotten(true);
    try {
      const result = CryptoJS.AES.decrypt(event.data, REACT_APP_ENCRYPTION_KEY as string).toString(CryptoJS.enc.Utf8);
      setData(result);
      setHasData(true);
      return setShow(false);
    }
    catch (error) {
      setData("");
      setHasData(true);
      return setShow(false);
    }
  }

  useEffect(() => {
    if (show) return setGotten(false);
  }, [show]);

  return (
  <React.Fragment>
  <StatusBar barStyle={"light-content"}/>
  <Modal visible={show} animationType="slide">
  <Camera style={{flex: 1}} onBarCodeScanned={HandleScanning}/>
  <SafeAreaView style={styles.main}>
  <View style={styles.sub}>
    
    <Header press={HandlePress} />
    
    <View style={styles.sub}>  
      <Text style={styles.top}>Scan QR Code</Text>
      <Text style={styles.title}>Scan the license QR code from your license plate number</Text>
      <Overlay />      
    </View>


  </View>
  </SafeAreaView>
  </Modal>
  </React.Fragment>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  sub: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: SIZES.extraLarge,
    color: "white",
    textAlign: "center",
    fontSize: TEXT.small,
    paddingHorizontal: SIZES.small
  },
  sub_title: {
    borderWidth: 2,
    borderColor: "white",
    width: 300,
    height: 300,
    borderRadius: 10,
    zIndex: 22,
    backfaceVisibility: "hidden"
  },
  header: {
    width: "100%",
    borderColor: "black",
    paddingHorizontal: SIZES.small,
    paddingTop: SIZES.massive
  },
  top: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: -2,
    fontSize: TEXT.large,
    marginBottom: SIZES.large,
    marginTop: -100
  },
  loading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});