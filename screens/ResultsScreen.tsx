


import React from "react";
import { View, Text, StyleSheet, StatusBar, Image, ScrollView } from "react-native";
import { SIZES, TEXT, assets } from "../constants";
import { AntDesign } from '@expo/vector-icons';

type DetailValueProps = {
  title: string,
  value: string  
}

function Profile() {
  return (
  <View style={styles.profile}>
  <View style={styles.img_box}>
    <Image source={assets.user} style={styles.img} resizeMode="contain" />
  </View>
  <Text style={styles.name}>Mark Jordan</Text>
  <Text style={styles.validation}>Verified User</Text>
  </View>
  )
}

function Code() {
  return (
  <View style={styles.code_box}>
  <View style={styles.qr_box}>
  <AntDesign name="qrcode" size={150}/>
  </View>
  </View>
  )
}

function DetailValue({title, value}: DetailValueProps) {
  return (
  <View style={styles.detail_value_box}>
  <Text style={styles.name}>{value}</Text>
  <Text style={styles.validation}>{title}</Text>
  </View>
  )
}

function Details() {
  return (
  <View style={styles.details_box}>
  <DetailValue title="Validation Number" value="AUAOUB-AOUBEX-213A-E" />
  <DetailValue title="Full Name" value="Mark Jordan" />
  <DetailValue title="License Plate" value="AXD-HJI-2239" />
  <DetailValue title="Email" value="mark@gmail.com" />
  </View>
  )
}

export default function MoreDetailsScreen() {
  return (
  <React.Fragment>
  <StatusBar barStyle="light-content" />
  <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>

    <Profile />
    <Code />
    <Details />

  </ScrollView>
  </React.Fragment>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  profile: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.medium
  },
  img_box: {
    width: 70,
    height: 70,
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.base
  },
  name: {
    fontWeight: "bold",
    fontSize: TEXT.small
  },
  validation: {
    color: "#2196F3",
    fontWeight: "bold",
    letterSpacing: -0.5
  },
  img: {
    width: "100%",
    height: "100%"
  },
  code_box: {
    width: "100%",
    marginBottom: SIZES.medium,
    alignItems: "center",
    justifyContent: "center"
  },
  qr_box: {
    width: 150,
    height: 150,
  },
  details_box: {
    width: "100%"
  },
  detail_value_box: {
    alignItems: "center",paddingVertical: SIZES.base
  },
  last: {
    height: 100
  }
});