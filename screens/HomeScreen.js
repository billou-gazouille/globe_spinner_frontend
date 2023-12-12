import React, { useCallback } from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
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
    navigation.navigate("Suggestions");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Image
        source={require("../assets/bendy-dotted-line_2.jpg")}
        style={styles.topLine}
      />
      <Image
        source={require("../assets/globe_spinner.jpg")}
        style={styles.logoImage}
      />
      <Pressable style={styles.travelButton} onPress={handleSubmit}>
        <Text style={styles.text}>TRAVEL</Text>
      </Pressable>
      <Image
        source={require("../assets/line-map.jpg")}
        style={styles.bottomLine}
      />
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
    borderRadius: 50,
    paddingVertical: 25,
    paddingHorizontal: 60,
    elevation: 4,
    backgroundColor: "#3972D9",
    marginTop: 15,
  },
  topLine: {
    marginBottom: 20,
    width: "100%",
    height: "9%",
  },
  bottomLine: {
    marginTop: 20,
    width: "100%",
    height: "21%",
    marginBottom: 10,
  },
});
