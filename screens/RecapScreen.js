import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RecapScreen = () => {
  const destination = "London";
  const accommodation = "Hotel ABC";
  const transport = "Flight XYZ";
  const activities = "Picnic Basket, Spa Kit,Rain Poncho";
  const amountPaid = 1400;

  const navigation = useNavigation();
  const handleOkPress = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/globe_spinner.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <View style={styles.line} />
        <Text style={styles.title}>Recap Trip</Text>
        <View style={styles.line} />

        <Text style={styles.subtitle}>Where to</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{destination}</Text>
        </View>

        <Text style={styles.subtitle}>Accommodation</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{accommodation}</Text>
        </View>

        <Text style={styles.subtitle}>Transport</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{transport}</Text>
        </View>

        <Text style={styles.subtitle}>Activities</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{activities}</Text>
        </View>

        <Text style={styles.subtitle}>Amount Paid:</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{amountPaid} euros</Text>
        </View>

        <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 80,
    backgroundColor: "#D8D0E7",
  },
  backgroundImage: {
    flex: 1,
    width: "550%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: 250,
    height: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: -20,
    marginVertical: 10,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
    marginHorizontal: 5,
    marginVertical: 5,
  },

  subtitle: {
    fontSize: 18,
    flex: 1,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 50,
  },
  infoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
    Color: "#red",
  },
  okButton: {
    position: "right",
    Right: -50,
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    padding: 50,
    marginBottom: 10,
  },
  okButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RecapScreen;
