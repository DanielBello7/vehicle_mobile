


import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StatusBar, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { SIZES, TEXT } from "../constants";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import InputGroup from '../components/InputGroup';
import SubmitButton from "../components/SubmitButton";
import Error from "../components/Error";


function GoogleBtn() {
  return (
  <TouchableOpacity style={styles.btn2}>
  <FontAwesome name="google" size={24} color="red" style={{marginRight: SIZES.base}}/>
  <Text style={styles.btn_text}>Sign In with google</Text>
  </TouchableOpacity>
  )
}

export default function SignInScreen() {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState({msg: "Value currently unavailable.", show: false});
  
  const HandleNavigation = () => navigation.navigate("Sign-Up" as never);

  const clearForm = () => {
    setEmail("");
    return setPassword("");
  }

  const HandleSubmit = () => {
    if (!email.trim() || !password.trim()) 
      return setError({msg: "Please fill in the required information.", show: true});

    setLoading(true);
    
    setTimeout(() => {
      console.log({email, password});
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
  <SafeAreaView style={styles.main}>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  <KeyboardAvoidingView style={styles.sub} behavior="position">

    <Text style={styles.title}>VVApp.</Text>
    <Text style={styles.sub_title}>Sign In</Text>
    
    <View style={styles.info_box}>
    <Text style={styles.info}>Lorem ipsum dolor sit amet consectetur,</Text>
    <TouchableOpacity style={{marginLeft: 2}} onPress={HandleNavigation}>
    <Text style={styles.signup}>sign up</Text>
    </TouchableOpacity>
    </View>

    {error.show && <Error msg={error.msg}/>}

    <View style={styles.group}>
    <InputGroup title="Email" 
                keyType="email-address" 
                setValue={setEmail} 
                secure={false}
                textContent="emailAddress"
                disabled={isLoading}
                value={email}
                />
    <InputGroup title="Password"
                keyType="default"
                setValue={setPassword}
                textContent="password"
                disabled={isLoading}
                value={password}
                secure
                />
    </View>

    <View style={styles.btn_box}>
    <SubmitButton title="Sign In" 
                  press={HandleSubmit} 
                  isLoading={isLoading} 
                  color="black"
                  txtColor="white"
                  />
    <GoogleBtn />
    </View>

  </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
  </SafeAreaView>
  </React.Fragment>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1, 
    marginTop: StatusBar.currentHeight,
    backgroundColor: "white"
  },
  sub: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SIZES.small
  },
  title: {
    fontSize: 70,
    fontWeight: "bold",
    letterSpacing: -5
  },
  sub_title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    letterSpacing: -1
  },
  group: {
    width: "100%",
    marginTop: SIZES.massive + 20,
  },
  btn_text: {
    fontSize: TEXT.base,
    fontWeight: "bold"
  },
  btn2: {
    borderWidth: 1, 
    paddingVertical: SIZES.base + 2, 
    alignItems: "center", 
    flexDirection: "row",
    justifyContent: "center", 
    marginBottom: SIZES.medium
  },
  btn_box: {
    width: "100%", 
    marginTop: SIZES.medium
  },
  info: {
    color: "lightgray"
  },
  signup: {
    color: "black", 
    textDecorationLine: "underline"
  },
  info_box: {
    flexDirection: 'row', 
    alignItems: "center",
    marginTop: SIZES.base
  }
});