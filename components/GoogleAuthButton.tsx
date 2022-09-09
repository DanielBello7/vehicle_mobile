


import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SIZES, TEXT } from '../constants';
import { GOOGLE_CLIENT_ID } from '@env';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Spinner from './Spinner';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession(); //required and important line

type GoogleBtnProps = {
  isLoading: boolean,
  callBack: (data: any) => void,
  preFunction: Function
}

export default function GoogleAuthButton(props: GoogleBtnProps) {

  const {preFunction, callBack, isLoading} = props;

  const [req, res, promptAsync] = Google.useAuthRequest({expoClientId: GOOGLE_CLIENT_ID});

  const HandlePress = async () => {
    preFunction();

    try {
      const response = await promptAsync({showInRecents: true, useProxy: true});
      
      if (response?.type !== "success") return callBack(false);

      const accessToken = response.authentication?.accessToken;

      if (!accessToken) return;

      axios.get("https://www.googleapis.com/userinfo/v2/me", {
        headers: {Authorization: `Bearer ${accessToken}`}
      })
      .then((res) => callBack(res.data))
      .catch((error) => callBack(error));

    } catch (error) {return callBack(error)}
  }

  return (
  <TouchableOpacity style={styles.btn2} 
                    onPress={HandlePress} 
                    disabled={isLoading && true}>
  {
    isLoading 
    ? 
    <Spinner color="black" size={20} />
    : 
    <View style={{flexDirection: "row", alignItems: "center"}}>
    <FontAwesome name="google" size={24} color="red" style={styles.icon}/>
    <Text style={styles.btn_text}>Sign In with google</Text>
    </View>
  }
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  icon: {
    marginRight: SIZES.base
  }
});