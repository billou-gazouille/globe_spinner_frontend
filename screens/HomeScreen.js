import React from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SvgUri from "react-native-svg-uri";

export default function HomeScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("TabNavigator");
  };
  return (
    <View style={styles.container}>
      <SvgUri
        width="200"
        height="200"
        source={require("../assets/globe_spinner.svg")}
      />
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.title}>GLOBE SPINNER</Text>
      </TouchableOpacity>
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
    width: "50%",
    height: "70%",
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
  },
});
