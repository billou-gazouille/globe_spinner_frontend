import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import ParametersScreen from "./screens/ParametersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SuggestionsScreen from "./screens/SuggestionsScreen";
import { View } from "react-native";
import SelectedSuggestionsScreen from "./screens/SelectedSuggestionScreen";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filters from "./reducers/filters";
import FiltersScreen from "./screens/FiltersScreen";

const store = configureStore({
  reducer: { filters },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  let iconBackgroundColor = "#ba99fe";
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "Parameters") {
            iconName = "gear";
          }

          return (
            <View
              style={{
                backgroundColor: focused ? "rgba(255,255,255,0.33)" : null,
                justifyContent: "space-between",
                alignItems: "center",
                height: "90%",
                width: "70%",
                borderRadius: 10,
                paddingVertical: 10,
                // paddingBottom: 8,
                // paddingTop: 8,
                marginTop: 10,
              }}
            >
              <FontAwesome name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarActiveBackgroundColor: iconBackgroundColor,
        tabBarInactiveTintColor: "#CBCBE4",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#ba99fe" },
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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Suggestions" component={SuggestionsScreen} />
        <Stack.Screen name="Filters" component={FiltersScreen} />
        <Stack.Screen
          name="SelectedSuggestions"
          component={SelectedSuggestionsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
