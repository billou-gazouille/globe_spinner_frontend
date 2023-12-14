import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  onDateChange,
} from "react-native";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// Il faut enregistrer les filtres dans le store de redux

export default function FiltersScreen({ navigation }) {
  const [departureLocation, setDepartureLocation] = useState("");
  const [inboundDate, setInboundDate] = useState(Date);
  const [outboundDate, setOutboundDate] = useState(Date);
  const [budget, setBudget] = useState(500);
  const [numberofPeople, setNumberOfPeople] = useState(null);
  const [transportType, setTransportType] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Suggestions");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.departureInput}
        onChangeText={(value) => setDepartureLocation(value)}
      />
      <TextInput
        style={styles.dateInput}
        onDateChange={(date) => setInboundDate(date)}
      />
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text>Go!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  departureInput: {},
});
