


import { createStackNavigator } from "@react-navigation/stack";
import SettingSceeen from "../screens/SettingScreen";
import AboutScreen from "../screens/AboutScreen";
import Header from "../components/Header";


const Stack = createStackNavigator();

function SettingStack() {
  return (
  <Stack.Navigator initialRouteName="Setting">
  <Stack.Screen name="Setting" component={SettingSceeen} options={{header: () => <Header title="Settings" showBack={false}/>}}/>
  <Stack.Screen name="About" component={AboutScreen} options={{headerShown: false}}/>
  </Stack.Navigator>
  );
}

export default SettingStack;