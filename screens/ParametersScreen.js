import React from "react";
import { View, Text } from "react-native";

export default function ParametersScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is parameters screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 38,
  },
});
