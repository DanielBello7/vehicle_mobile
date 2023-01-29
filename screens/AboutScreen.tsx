


import React from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { SIZES, TEXT } from "../constants";
import { useData } from "../context";
import GeneralHeader from "../components/GeneralHeader";

export default function AboutScreen() {
  const { theme } = useData();
  
  return (
  <SafeAreaView style={{...styles.main, backgroundColor: theme.white}}>
  <StatusBar barStyle="dark-content" />
    <View style={{marginTop: SIZES.large}} />
    <GeneralHeader />

    <View style={styles.sub}>
    <Text style={styles.title}>VVApp.</Text>
    <Text style={{...styles.sub_title, color: theme.gray}}>Visit us at vvapp.com</Text>
    </View>
    
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  title: {
    fontSize: TEXT.extraLarge,
    fontWeight: "bold",
    letterSpacing: -5
  },
  sub_title: {
    fontSize: TEXT.base,
    marginTop: SIZES.base,
    textAlign: "center"
  },
  sub: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.extraLarge
  }
});