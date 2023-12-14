import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { CustomText } from "../components/CustomText";

export default function HomeScreen({ navigation }) {
  const { height, width } = useWindowDimensions();

  const handleSubmit = () => {
    navigation.navigate("Filters");
  };

  return (
    <View style={[styles.container, { height }]}>
      {/* <Image
        source={require("../assets/bendy-dotted-line_2.jpg")}
        style={styles.topLine}
      /> */}
      <Image
        source={require("../assets/globe_spinner.jpg")}
        style={styles.logoImage}
      />
      <Pressable style={styles.travelButton} onPress={handleSubmit}>
        <CustomText style={styles.text}>TRAVEL</CustomText>
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
    marginTop: -50,
    width: "80%",
    height: "50%",
    resizeMode: "contain",
  },
  text: {
    fontWeight: "bold",
    letterSpacing: 2.5,
    color: "white",
    fontSize: 16,
  },
  travelButton: {
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 60,
    elevation: 4,
    backgroundColor: "#3972D9",
    marginTop: -20,
  },
  topLine: {
    marginBottom: 20,
    width: "100%",
    height: "9%",
  },
  bottomLine: {
    marginTop: 20,
    width: "100%",
    position: "absolute",
    zIndex: -1,
    bottom: 0,
    height: "22%",
    resizeMode: "contain",
  },
});
