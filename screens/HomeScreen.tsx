


import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { TEXT, SIZES } from '../constants';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { useData } from '../context';
import { getCameraPermissionsAsync, requestCameraPermissionsAsync } from 'expo-camera';
import CameraModal from '../modules/CameraModal';
import Error from '../components/Error';

type ScanButtonProps = {
  press: Function
}

type ScannedType = {
  gotten: boolean, 
  data: string | null
}

function TitleBlock() {
  return (
  <View style={styles.title_block}>
  <View style={styles.title_bg}>
    
    <Text style={styles.title_title}>Scan QR Code</Text>
    
    <Text style={styles.text_sub}>
    Lorem ipsum dolor sit amet 
    consectetur adipisicing elit.
    </Text>
  </View>
  </View>
  );
}

function Overlay() {
  return (
  <View style={styles.overlay}>
  <View style={styles.overlay_box}>

    <View style={{...styles.box1, ...styles.overlay_generic}}/>
    <View style={{...styles.box2, ...styles.overlay_generic}}/>
    <View style={{...styles.box3, ...styles.overlay_generic}}/>
    <View style={{...styles.box4, ...styles.overlay_generic}}/>

    <View style={styles.img_box}>
    <AntDesign name="qrcode" size={250}/>
    </View>

  </View>
  </View>
  )
}

function ScanButton({press}: ScanButtonProps) {
  const { theme } = useData();

  return (
  <View style={styles.scan_btn}>
  <TouchableOpacity style={{...styles.btn, backgroundColor: theme.main}} onPress={() => press()}>
  <Text style={styles.btn_text}>SCAN</Text>
  </TouchableOpacity>
  </View>
  )
}

export default function HomeScreen() {
  const {hasData} = useData();

  const [cameraPermission, setCameraPermission] = useState(false);

  const [error, setError] = useState({msg: "", show: false});

  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  const HandleNavigation = () => navigation.navigate("Results" as never);

  const HandleScan = () => {
    if (!cameraPermission) return setError({msg: "Camera permissions required", show: true});
    return setShowModal(true);
  }

  const GetCameraPermissions = async () => {
    const permission = await getCameraPermissionsAsync();
    if (permission.status === "granted") return setCameraPermission(true);
    const getPermission = await requestCameraPermissionsAsync();
    if (getPermission.status === "granted") return setCameraPermission(true);
    return setCameraPermission(false);
  }

  useEffect(() => {
    if (hasData) return HandleNavigation();
  }, [hasData]);

  useEffect(() => {
    const timeoutID = setTimeout(() => setError({msg: error.msg, show: false}), 5000);
    return () => clearTimeout(timeoutID);
  }, [error.show]);

  useEffect(() => {
    GetCameraPermissions();
  }, []);

  return (
  <React.Fragment>
  <StatusBar barStyle="dark-content" />
  <SafeAreaView style={styles.main}>
  <View style={styles.sub}>
    
    {
      error.show &&
      <View style={{paddingHorizontal: SIZES.extraLarge}}>
      <Error msg={error.msg} />
      </View>
    }

    <TitleBlock />

    <Overlay />

    <ScanButton press={HandleScan}/>

    
  </View>
  </SafeAreaView>
  {
    cameraPermission && 
    <CameraModal setShow={setShowModal} show={showModal} />
  }
  </React.Fragment>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white"
  },
  sub: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingTop: SIZES.large
  },
  title: {
    fontSize: TEXT.large,
    paddingHorizontal: SIZES.small
  },
  title_block: {
    paddingHorizontal: SIZES.small,
    marginBottom: SIZES.massive,
    marginTop: SIZES.extraLarge
  },
  title_bg: {
    width: "100%",
    padding: SIZES.small,
    borderRadius: SIZES.base,
    alignItems: "center",
    borderColor: "red",
    backgroundColor: "#faf8f7"
  },
  text_sub: {
    textAlign: "center",
    width: "100%",
    fontSize: TEXT.base,
    marginBottom: SIZES.small
  },
  title_title: {
    fontSize: TEXT.medium,
    marginVertical: SIZES.base,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center"
  },
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
    borderWidth: 8,
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
  img_box: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center"
  },
  scan_btn: {
    marginTop: SIZES.small,
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    paddingHorizontal: 50,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: "#2196F3"
  },
  btn_text: {
    fontSize: TEXT.base,
    fontWeight: "bold",
    color: "white"
  }
});