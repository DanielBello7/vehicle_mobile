


import {ParamListBase, RouteProp} from "@react-navigation/native";
import {Ionicons} from '@expo/vector-icons';
import {View} from "react-native";

type TabComponentProps = {
  color: string,
  route: RouteProp<ParamListBase, string>
}

export default function TabComponent(props: TabComponentProps) {
  const {route, color} = props;

  let size = 24;

  const handleTabIcon = (route: string) => {
    switch (route) {
      case 'Home':
        return <Ionicons name="home" 
                         size={size} 
                         color={color}/>
      case 'Register':
        return <Ionicons name="clipboard" 
                         size={size} 
                         color={color}/>
      case 'Settings':
        return <Ionicons name="cog" 
                         size={30} 
                         color={color}/>
    }
  }

  return <View>{handleTabIcon(route.name)}</View>
}