import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";

const BackButton = () => {
  const navigation = useNavigation();
  const handleBackClick = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleBackClick()}>
        <Icon name="chevron-left" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 15,
    zIndex: 99,
  },
});
export default BackButton;
