


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";


const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Sign-In">
    <Stack.Screen name="Sign-In" component={SignInScreen}/>
    <Stack.Screen name="Sign-Up" component={SignUpScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;