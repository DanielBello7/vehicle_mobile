


import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StatusBar, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useData } from "../context";
import { AxiosError } from "axios";
import GoogleAuthButton from "../components/GoogleAuthButton";
import InputGroup from '../components/InputGroup';
import SubmitButton from "../components/SubmitButton";
import Error from "../components/Error";


export default function SignInScreen() {
  const navigation = useNavigation();

  const {axios, setUser} = useData();

  const [isLoading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState({msg: "", show: false, isError: true});
  
  const HandleNavigation = () => navigation.navigate("Sign-Up" as never);

  const clearForm = () => {
    setEmail("");
    return setPassword("");
  }

  const GoogleSubmitCallback = async (data: any) => {
    
    setGoogleLoading(false);
    
    if (data === false) return setError({msg: "Error signing in", show: true, isError: true});
    
    setError({msg: "Logged in", isError: false, show: true});
    
    const google_user = {
      firstname: data.given_name, 
      lastname: data.family_name, 
      email: data.email, 
      _id: data.id
    }
    
    return setTimeout(() => setUser(google_user), 2000);

    // return console.log(data);
  }

  const HandleSubmit = async () => {
    if (!email.trim() || !password.trim()) 
      return setError({msg: "Please fill in the required information.", show: true, isError: true});

    const controller = new AbortController();

    setTimeout(() => controller.abort(), 10000);

    setLoading(true);
    
    axios.post("/auth/login/local", {email, password}, {signal: controller.signal})
    .then((res) => {
      const data = res.data;
      setLoading(false);
      if (!data.success) return setError({msg: "Error logging in", show: false, isError: true});
      const {password, ...signed_user} = data.payload;
      clearForm();
      return signed_user;
    })
    .then((data: any) => {
      setError({msg: "Login successful", show: true, isError: false});
      return setTimeout(() => setUser(data), 2000);
    })
    .catch((error: AxiosError) => {
      setLoading(false);

      if (error.code === "ERR_CANCELED") 
        return setError({msg: "Request timeout", show: true, isError: true});

      if (error.response?.status === 401) 
        return setError({msg: "Invalid credentials", show: true, isError: true});

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
  <SafeAreaView style={styles.main}>
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  <KeyboardAvoidingView style={styles.sub} behavior="position">

    <Text style={styles.title}>VVApp.</Text>
    <Text style={styles.sub_title}>Sign In</Text>
    
    <View style={styles.info_box}>
    <Text style={styles.info}>Please fill in the details below. No account? </Text>
    <TouchableOpacity style={{marginLeft: 2}} onPress={HandleNavigation}>
    <Text style={styles.signup}>sign up</Text>
    </TouchableOpacity>
    </View>

    {error.show && <Error msg={error.msg} isError={error.isError}/>}

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
    <GoogleAuthButton preFunction={() => setGoogleLoading(true)} 
                      isLoading={googleLoading} 
                      callBack={GoogleSubmitCallback}
                      />
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