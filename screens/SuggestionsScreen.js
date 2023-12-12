import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BackButton from "../components/BackButton";

export default function SuggestionsScreen({ navigation }) {
  return (
    <View>
      <Text>Suggestion Screen</Text>
      <BackButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
  },
});
