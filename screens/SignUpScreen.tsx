


import React, { useState, useEffect } from "react";
import { View, Text, Keyboard, StatusBar, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from "react-native";
import { SIZES, TEXT } from "../constants";
import SubmitButton from "../components/SubmitButton";
import InputGroup from "../components/InputGroup";
import GeneralHeader from "../components/GeneralHeader";
import Error from "../components/Error";


export default function SignUpScreen() {
  const [isLoading, setLoading] = useState(false);

  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");

  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState({msg: "Value currently unavailable.", show: false});

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    return setConfirm("");
  }

  const HandleSubmit = () => {
    if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim() || !confirm.trim()) return setError({msg: "Fill in the required information", show: true});

    if (password !== confirm) return setError({msg: "Passwords don't match", show: true});

    setLoading(true);

    setTimeout(() => {
      console.log({firstname, lastname, email, password, confirm });
      setLoading(false);
      clearForm();
    }, 5000);
    
    return setError({msg: "", show: false});
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => setError({msg: error.msg, show: false}), 5000);
    return () => clearTimeout(timeoutID);
  }, [error.show]);

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
    <InputGroup title="Firstname"
                keyType="default"
                secure={false}
                setValue={setFirstname}
                textContent="none"
                value={firstname}
                disabled={isLoading}
                />
    <InputGroup title="Lastname"
                keyType="default"
                secure={false}
                setValue={setLastname}
                textContent="none"
                value={lastname}
                disabled={isLoading}
                />
    <InputGroup title="Email"
                keyType="email-address"
                secure={false}
                setValue={setEmail}
                textContent="emailAddress"
                value={email}
                disabled={isLoading}
                />
    <InputGroup title="Password"
                keyType="default"
                secure
                setValue={setPassword}
                textContent="none"
                value={password}
                disabled={isLoading}
                />
    <InputGroup title="Confirm Password"
                keyType="default"
                secure
                setValue={setConfirm}
                textContent="password"
                value={confirm}
                disabled={isLoading}
                />

    <SubmitButton title="Sign Up" 
                  press={HandleSubmit} 
                  isLoading={isLoading} 
                  color="black"
                  txtColor="white"
                  />
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