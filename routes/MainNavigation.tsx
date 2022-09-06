


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import SettingStack from "./SettingStack";
import RegistrationScreen from "../screens/RegistrationScreen";
import TabComponent from "../components/TabComponent";
import Header from "../components/Header";


const Tabs = createBottomTabNavigator();

function MainNavigation() {
  return (
  <NavigationContainer>
  <Tabs.Navigator initialRouteName="Home" 
                  screenOptions={({route}) => ({
                    tabBarActiveTintColor: "#2196F3",
                    tabBarLabelStyle: {fontWeight: "bold", letterSpacing: -0.5},
                    tabBarIcon: ({color}) => <TabComponent color={color} 
                                  key={route.name} route={route}/>
                  })}>
  <Tabs.Screen name="Home" component={HomeStack} options={{headerShown: false}}/>
  <Tabs.Screen name="Register" component={RegistrationScreen} options={{header: () => <Header title="Register" showBack={false}/>}}/>
  <Tabs.Screen name="Settings" component={SettingStack} options={{headerShown: false}}/>
  </Tabs.Navigator>
  </NavigationContainer>
  );
}

export default MainNavigation;