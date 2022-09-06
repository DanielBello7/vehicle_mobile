


import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, ScrollView, View, Text, StatusBar, StyleSheet, TextInput, KeyboardAvoidingView, Keyboard } from "react-native";
import { SIZES, TEXT } from "../constants";
import { useData } from "../context";
import { VehicleDataType } from "../global.types";
import { REACT_APP_ENCRYPTION_KEY } from '@env';
import CryptoJS from "react-native-crypto-js";
import NewCodeModal from "../modules/NewCodeModal";
import Error from '../components/Error';
import SubmitButton from '../components/SubmitButton';

type InputGroupProps = {
  title: string,
  value: string,
  disabled: boolean,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  keyType: "email-address" | "default",
  textContent: "password" | "emailAddress" | "none"
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

function InputGroup({title, keyType, setValue, textContent, value, disabled}: InputGroupProps) {
  const { theme } = useData();
  
  return (
  <View style={styles.input_group}>
  <Text style={{...styles.title, color: theme.main}}>{title}</Text>
  <TextInput style={styles.input} 
             placeholder={title}
             value={value}
             onChangeText={text => setValue(text)}
             autoCapitalize="none"
             keyboardType={keyType}
             autoComplete="off"
             editable={!disabled ? true : false}
             autoCorrect={false}
             autoFocus={false}
             returnKeyType="done"
             textContentType={textContent}
             clearButtonMode="always"
             />
  </View>
  )
}

export default function RegistrationScreen() {
  const {theme, user} = useData();
  
  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");

  const [license, setLicense] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [qrData, setQrData] = useState("");

  const [error, setError] = useState({msg: "Value currently unavailable.", show: false});

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    return setLicense("");
  }

  const HandleSubmit = () => {
    if (!firstname.trim() || !lastname.trim() || !email.trim() || !license.trim()) 
      return setError({msg: "Please fill in all required information.", show: true});
    
    setLoading(true);

    const today = new Date().toLocaleDateString("en-us", {dateStyle: "full"});

    const new_submission: VehicleDataType = {
      _id: "aoueoba-aoeubaob-aoeuoa",
      img: "",
      dateCreated: today,
      firstname: firstname,
      lastname: lastname,
      email: email,
      license: license,
      isVerified: false,
      registeredBy: user ? user.email : "guest@gmail.com"
    }

    const result = JSON.stringify(new_submission);
    
    const newItem = CryptoJS.AES.encrypt(result, REACT_APP_ENCRYPTION_KEY as string).toString();

    setQrData(newItem);
    
    setTimeout(() => {
      setShowModal(true);
      
      clearForm();
      
      setLoading(false);
    }, 2000);

    return setError({msg: error.msg, show: false});
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => setError({msg: error.msg, show: false}), 5000);
    return () => clearTimeout(timeoutID);
  }, [error.show]);

  return (
  <React.Fragment>
  <StatusBar barStyle="light-content" />
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  <KeyboardAvoidingView style={styles.main} behavior="position">
  <ScrollView style={{height: "100%"}} showsVerticalScrollIndicator={false}>
    <ScreenInfo />

    <View style={styles.input_group_box}>
    <InputGroup title="Firstname"
                keyType="default"
                setValue={setFirstname}
                textContent="none"
                value={firstname}
                disabled={isLoading}
                />
    <InputGroup title="Lastname"
                keyType="default"
                setValue={setLastname}
                textContent="none"
                value={lastname}
                disabled={isLoading}
                />
    <InputGroup title="Email"
                keyType="email-address"
                setValue={setEmail}
                textContent="emailAddress"
                value={email}
                disabled={isLoading}
                />
    <InputGroup title="License Plate"
                keyType="default"
                setValue={setLicense}
                textContent="none"
                disabled={isLoading}
                value={license}
                />
    <View style={{marginBottom: 20}}/>

    <SubmitButton isLoading={isLoading} 
                  press={HandleSubmit} 
                  color={theme.main}
                  title="Submit"
                  txtColor="white"
                  />

    {error.show && <Error msg={error.msg} />}
    </View>
  </ScrollView>
  </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
  <NewCodeModal isVisible={showModal} setVisible={setShowModal} data={qrData}/>
  </React.Fragment>
  );
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