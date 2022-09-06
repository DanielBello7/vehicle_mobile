


import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

type SpinnerProps = {
  color: string,
  size: number
}

export default function Spinner({color, size}: SpinnerProps) {

  const rotation = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {toValue: 100, useNativeDriver: true, duration: 800}),
      {iterations: -1}
    ).start();
  }, []);

  return (
  <Animated.View style={{
    transform: [{
      rotate: rotation.interpolate({inputRange: [0, 100], outputRange: ["0deg", "360deg"]}) 
    }]
  }}>
  <FontAwesome5 name="spinner" size={size} color={color} />
  </Animated.View>
  )
}