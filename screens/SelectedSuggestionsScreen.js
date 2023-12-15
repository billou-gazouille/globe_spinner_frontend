import React from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import BackButton from "../components/BackButton";

export default function SelectedSuggestionsScreen({ navigation, route }) {
  
  console.log(route.params);

  const {trip} = route.params;
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Selected Suggestions Screen</Text>
      <Text style={styles.text}>{trip}</Text>
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
