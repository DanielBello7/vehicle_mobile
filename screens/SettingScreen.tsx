


import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { SIZES, TEXT } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useData } from '../context';
import Spinner from "../components/Spinner";

function ThemeSelector() {
  const { setTheme } = useData();

  const [currentTheme, setCurrentTheme] = useState("light");

  const HandlePress = (selected: string) => {
    if (selected === "dark" || selected === "light") setTheme(selected === "dark" ? true : false);
    return setCurrentTheme(selected);
  }

  return (
  <View style={styles.theme_box}>
  <Text style={styles.theme_text}>Theme</Text>
  
  <View style={styles.container}>
    <TouchableOpacity style={{...styles.options, borderBottomWidth: 0.2}} onPress={() => HandlePress("system")} activeOpacity={1}>
    <View style={styles.cont}>
      <Ionicons name="apps" size={20}/>
      <Text style={styles.system_text}>System</Text>
    </View>
    <Ionicons name={currentTheme === "system" ? "radio-button-on" : "radio-button-off"} size={20}/>
    </TouchableOpacity>

    <TouchableOpacity style={{...styles.options, borderBottomWidth: 0.2}} onPress={() => HandlePress("dark")} activeOpacity={1}>
    <View style={styles.cont}>
      <Ionicons name="moon" size={20}/>
      <Text style={styles.system_text}>Dark</Text>
    </View>
    <Ionicons name={currentTheme === "dark" ? "radio-button-on" : "radio-button-off"} size={20}/>
    </TouchableOpacity>

    <TouchableOpacity style={styles.options} onPress={() => HandlePress("light")} activeOpacity={1}>
    <View style={styles.cont}>
      <Ionicons name="sunny" size={20}/>
      <Text style={styles.system_text}>Light</Text>
    </View>
    <Ionicons name={currentTheme === "light" ? "radio-button-on" : "radio-button-off"} size={20}/>
    </TouchableOpacity>
  </View>

  <Text style={styles.info}>
  You can change the current theme of the app by selecting any of the above listed options. Select the System option to leave the app using the current theme of the phone.
  </Text>
  </View>
  )
}

function AppInfo() {
  const navigation = useNavigation();

  const HandleNavigation = () => navigation.navigate("About" as never);

  return (
  <View style={styles.theme_box}>
  <Text style={styles.theme_text}>App Info</Text>

  <View style={styles.container}>
    <TouchableOpacity style={styles.options} onPress={HandleNavigation}>
    <View style={styles.cont}>
      <Ionicons name="information-circle-outline" size={24}/>
      <Text style={styles.system_text}>About</Text>
    </View>
    <FontAwesome5 name="angle-right" size={20}/>
    </TouchableOpacity>
  </View>

  <Text style={styles.info}>
  For more information visit our website: vvapp.com
  </Text>
  </View>
  )
}

function Logout() {
  const { setUser } = useData();

  const [isLoading, setLoading] = useState(false);
  
  const HandleLogout = () => {
    setLoading(true);
    return setTimeout(() => {
      setLoading(false);
      setUser(null);
    }, 3000);
  }

  return (
  <View style={{...styles.theme_box, marginBottom: SIZES.massive}}>
  <Text style={styles.theme_text}>Logout</Text>

  <View style={styles.container}>
    <View style={{...styles.options, flexDirection: "column", alignItems: "flex-start"}}>
      <View style={styles.cont}>
      <Ionicons name="trash" size={24} color="red"/>
      <Text style={{...styles.system_text, color: "red", fontWeight: "bold"}}>Logout</Text>
      </View>

      <Text style={styles.info}>
      Logging out would prevent you from 
      accessing the app as data 
      is currently not being retained by the app.
      </Text>      

      <View style={styles.logout_box}>
      <TouchableOpacity style={styles.logout} onPress={HandleLogout}>
      {isLoading ? <Spinner color="red" size={20}/> : <Text style={styles.logout_text}>Logout</Text>}
      </TouchableOpacity>
      </View>
    </View>
  </View>
  </View>
  )
}

export default function SettingSceeen() {
  return (
  <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
  <StatusBar barStyle="dark-content"/>
    
    <View style={{marginBottom: SIZES.massive}}/>

    <ThemeSelector />

    <AppInfo />

    <Logout />

  </ScrollView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: SIZES.large
  },
  theme_box: {
    width: "100%", 
    marginVertical: SIZES.base
  },
  theme_text: {
    fontSize: TEXT.base,
    fontWeight: "bold"
  },
  container: {
    borderWidth: 0.2,
    marginTop: SIZES.small,
    borderRadius: 5,
    backgroundColor: "#faf8f7"
  },
  options: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  system_text: {
    fontSize: TEXT.small,
    marginLeft: 10
  },
  info: {
    marginVertical: SIZES.base,
    lineHeight: 20
  },
  cont: {
    flexDirection: "row",
    alignItems: "center"
  },
  logout_box: {
    width: "100%", 
    alignItems: "flex-end"
  },
  logout: {
    borderWidth: 2, 
    paddingHorizontal: 30, 
    paddingVertical: 10, 
    borderColor: "red", 
    borderRadius: 5,
    backgroundColor: "#edada8"
  },
  logout_text: {
    fontSize: TEXT.base,
    fontWeight: "bold",
    color: "red"
  }
});