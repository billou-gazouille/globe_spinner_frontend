import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

export default function LoadingWheel() {

  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setAngle(prev => prev+5), 10);
    return () => clearInterval(interval);
  },[]);

  return (
    <View style={{...styles.loadingWheel, transform: [{ translateX: -50}, {translateY: -50}, { rotate: `${angle}deg` }]}}
    ></View>
  );
};

const styles = StyleSheet.create({
  loadingWheel: {
    position: "absolute",
    top: '50%',
    left: '50%',  
    zIndex: 100,
    width: 100,
    height: 100,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderRadius: 50,
    borderColor: '#BA99FE',
  },
});