


import React, { useState, useEffect } from "react";
import { View, Text, Keyboard, StatusBar, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from "react-native";
import { SIZES, TEXT } from "../constants";
import { AxiosError } from "axios";
import { useData } from "../context";
import { useNavigation } from "@react-navigation/native";
import SubmitButton from "../components/SubmitButton";
import InputGroup from "../components/InputGroup";
import GeneralHeader from "../components/GeneralHeader";
import Error from "../components/Error";


export default function SignUpScreen() {
  const navigation = useNavigation();

  const {axios, setUser} = useData();

  const [isLoading, setLoading] = useState(false);

  const [firstname, setFirstname] = useState("");

  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");

  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState({msg: "", show: false, isError: true});

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    return setConfirm("");
  }

  const HandleSubmit = () => {
    if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim() || !confirm.trim()) return setError({msg: "Fill in the required information", show: true, isError: true});

    if (password !== confirm) return setError({msg: "Passwords don't match", show: true, isError: true});

    setLoading(true);

    const controller = new AbortController();

    setTimeout(() => controller.abort(), 10000);

    axios.post("/auth/", {firstname, lastname, email, password}, {signal: controller.signal})
    .then((res) => {
      const data = res.data;
      setLoading(false);
      const {password, ...res_user} = data.payload.user;
      return res_user;
    })
    .then((data) => {
      clearForm();
      setError({msg: "User registered", show: true, isError: false});
      setTimeout(() => navigation.goBack(), 2000);
      return setTimeout(() => setUser(data), 3000);
    })
    .catch((error: AxiosError) => {
      setLoading(false);
      
      if (error.code === "ERR_CANCELED") 
        return setError({msg: "Request timeout", show: true, isError: true});

      if (error.response?.status === 400) 
        return setError({msg: "Email already registered", show: true, isError: true});

      console.log(error);
      return setError({msg: error.message, show: true, isError: true});
    });
  }

  useEffect(() => {
    const timeoutID = setTimeout(() => setError({msg: error.msg, show: false, isError: true}), 5000);
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

    {error.show && <Error msg={error.msg} isError={error.isError}/>}

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