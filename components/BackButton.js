import React from "react";
import { View, Button, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const BackButton = ({ navigation }) => {
  const handleBackClick = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleBackClick}>
        <Icon name="chevron-left" size={20} color="#000" />{" "}
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
