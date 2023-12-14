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

export default function ProfileScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("TabNavigator");
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.text}>Hello this is the profile screen</Text>
      </TouchableOpacity> */}
      <Text style={styles.text}>Hello this is the profile screen</Text>
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
