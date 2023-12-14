import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";

// Il faut enregistrer les filtres dans le store de redux

export default function FiltersScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("Suggestions");
  };
  return (
    <View>
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text>Go!</Text>
      </TouchableOpacity>
    </View>
  );
}
