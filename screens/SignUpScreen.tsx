


import React, { useState } from "react";
import { View, Text, Keyboard, StatusBar, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from "react-native";
import { SIZES, TEXT } from "../constants";
import SubmitButton from "../components/SubmitButton";
import InputGroup from "../components/InputGroup";
import GeneralHeader from "../components/GeneralHeader";
import Error from "../components/Error";


export default function SignUpScreen() {
  const [error, setError] = useState({msg: "Error: Value currently unavailable.", show: false});

  return (
  <React.Fragment>
  <StatusBar barStyle="dark-content" />

  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  <SafeAreaView style={styles.main}>
  <GeneralHeader />
  <KeyboardAvoidingView style={styles.sub} behavior="position">
  <ScrollView>
    <Text style={styles.title}>Sign Up.</Text>
    <Text style={styles.info}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>

    {error.show && <Error msg={error.msg}/>}

    <View style={styles.group}>
    <InputGroup title="Firstname"/>
    <InputGroup title="Lastname"/>
    <InputGroup title="Email"/>
    <InputGroup title="Password"/>
    <InputGroup title="Confirm Password"/>

    <SubmitButton title="Sign Up"/>
    </View>
  </ScrollView>
  </KeyboardAvoidingView>
  </SafeAreaView>
  </TouchableWithoutFeedback>
  </React.Fragment>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight
  },
  sub: {
    width: "100%",
    marginTop: SIZES.large,
    paddingHorizontal: SIZES.small,
    backgroundColor: "white"
  },
  title: {
    fontSize: TEXT.large,
    fontWeight: "bold",
    letterSpacing: -1
  },
  header: {
    width: "100%",
    paddingTop: SIZES.base,
    paddingHorizontal: SIZES.small,
    backgroundColor: "white",
    zIndex: 22
  },
  info: {
    marginTop: SIZES.base,
    color: "lightgray",
    fontSize: TEXT.base,
    width: "100%"
  },
  group: {
    marginTop: SIZES.large
  }
});