


import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ResultsScreen from "../screens/ResultsScreen";
import Header from "../components/Header";


const Stack = createStackNavigator();

function HomeStack() {
  return (
  <Stack.Navigator initialRouteName="Scan" screenOptions={{
    gestureEnabled: false,
    transitionSpec: {
      open: {animation: "timing", config: {duration: 500}},
      close: {animation: "timing", config: {duration: 500}},
    },
    cardStyleInterpolator: ({current: {progress}}) => ({cardStyle: {opacity: progress, transform: [{scale: progress}]}})
  }}>
  <Stack.Screen name="Scan" component={HomeScreen} options={{headerShown: false}}/>
  <Stack.Screen name="Results" component={ResultsScreen} options={{header: () => <Header title="Results" showBack/>}}/>
  </Stack.Navigator>
  );
}

export default HomeStack;