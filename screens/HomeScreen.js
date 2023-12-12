import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
// import SvgUri from "react-native-svg-uri";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function HomeScreen({ navigation }) {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    "KronaOne-Regular": require("../assets/fonts/KronaOne-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleSubmit = () => {
    navigation.navigate("TabNavigator");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* <SvgUri source={require("../assets/globe_spinner.svg")} /> */}
      <Image
        source={require("../assets/globe_spinner.jpg")}
        style={styles.logoImage}
      />
      <Pressable style={styles.travelButton} onPress={handleSubmit}>
        <Text style={styles.text}>TRAVEL</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: "100%",
    height: "50%",
  },
  text: {
    fontFamily: "KronaOne-Regular",
    letterSpacing: 0.25,
    color: "white",
  },
  travelButton: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    color: "#BA99FE",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 60,
    elevation: 4,
    backgroundColor: "#3972D9",
  },
});
