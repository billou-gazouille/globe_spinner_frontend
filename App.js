import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Ajouter @react-navigation/elements dans le projet
import { HeaderBackButton } from "@react-navigation/elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import ParametersScreen from "./screens/ParametersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SuggestionsScreen from "./screens/SuggestionsScreen";
import { StyleSheet, Text, View } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "Parameters") {
            iconName = "gear";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#e8be4b",
        tabBarInactiveTintColor: "#b2b2b21",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Parameters" component={ParametersScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Suggestions" component={SuggestionsScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
