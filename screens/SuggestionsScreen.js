import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";

export default function SuggestionsScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("SelectedSuggestions");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.text}>
          Suggestion Screen : click me to go to selected suggestions
        </Text>
      </TouchableOpacity>
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

// ({
//   tabBarIcon: ({ focused, color, size }) => {
//     let iconName = "";

//     if (route.name === "Home") {
//       iconName = "home";
//     } else if (route.name === "Profile") {
//       iconName = "user";
//     } else if (route.name === "Parameters") {
//       iconName = "gear";
//     }

//     let iconBackgroundColor = focused ? "transparent" : "#ba99fe";

//     return <FontAwesome name={iconName} size={size} color={color} />;
//   },
//   tabBarActiveTintColor: "#FFFFFF",
//   tabBarInactiveTintColor: "#CBCBE4",
//   headerShown: false,
// })}
// >
