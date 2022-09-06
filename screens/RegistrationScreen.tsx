


import React, { useState } from "react";
import { TouchableWithoutFeedback, ScrollView, View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from "react-native";
import { SIZES, TEXT } from "../constants";
import { useData } from "../context";
import NewCodeModal from "../modules/NewCodeModal";
import Error from '../components/Error';

type InputGroupProps = {
  title: string
}

function ScreenInfo() {
  return (
  <View style={styles.screen_box}>
  <Text style={styles.screen_text}>
  Lorem ipsum dolor sit amet, 
  consectetur adipisicing elit. 
  Cum, dicta saepe error officia
  </Text>
  </View>
  )
}

function InputGroup({title}: InputGroupProps) {
  const { theme } = useData();
  
  return (
  <View style={styles.input_group}>
  <Text style={{...styles.title, color: theme.main}}>{title}</Text>
  <TextInput style={styles.input} placeholder={title}/>
  </View>
  )
}

function SubmitButton() {
  const { theme } = useData();

  return (
  <TouchableOpacity style={{...styles.btn, backgroundColor: theme.main}}>
  <Text style={styles.btn_text}>Submit</Text>
  </TouchableOpacity>
  )
}

export default function RegistrationScreen() {
  const [showModal, setShowModal] = useState(!false);

  const [error, setError] = useState({msg: "Error: Value currently unavailable.", show: false});

  return (
  <React.Fragment>
  <StatusBar barStyle="light-content" />
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  <KeyboardAvoidingView style={styles.main} behavior="position">
  <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
    <ScreenInfo />

    <View style={styles.input_group_box}>
    <InputGroup title="Firstname"/>
    <InputGroup title="Lastname"/>
    <InputGroup title="Email"/>
    <InputGroup title="License Plate"/>

    <SubmitButton />

    {error.show && <Error msg={error.msg} />}
    </View>
  </ScrollView>
  </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
  <NewCodeModal isVisible={showModal} setVisible={setShowModal}/>
  </React.Fragment>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: SIZES.large
  },
  screen_box: {
    width: "100%", 
    marginVertical: SIZES.extraLarge
  },
  screen_text: {
    fontSize: TEXT.base
  },
  input_group: {
    width: "100%",
    marginBottom: SIZES.medium
  },
  input_group_box: {
    width: "100%",
    paddingBottom: 50
  },
  input: {
    borderWidth: 1, 
    fontSize: TEXT.base,
    width: "100%",
    backgroundColor: "#faf8f7",
    marginTop: SIZES.base,
    paddingVertical: SIZES.small,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  title: {
    fontSize: TEXT.base,
    letterSpacing: -0.5
  },
  btn: {
    width: "100%",
    marginTop: SIZES.small,
    borderRadius: 5,
    padding: 16,
    paddingVertical: 18,
  },
  btn_text: {
    fontSize: TEXT.base,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  error: {
    width: "100%", 
    marginTop: SIZES.small,
    flexDirection: "row",
    alignItems: "center"
  },
  error_text: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 5
  }
});