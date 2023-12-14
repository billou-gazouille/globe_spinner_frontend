import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// Il faut enregistrer les filtres dans le store de redux

export default function FiltersScreen({ navigation }) {
  const [departureLocation, setDepartureLocation] = useState("");
  const [inboundDate, setInboundDate] = useState(dayjs());
  const [outboundDate, setOutboundDate] = useState(dayjs());
  const [budget, setBudget] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(null);
  const [transportType, setTransportType] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Suggestions");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={departureLocation}
        onChangeText={(value) => setDepartureLocation(value)}
      />
      {/* https://github.com/farhoudshapouran/react-native-ui-datepicker */}
      <DateTimePicker
        style={styles.dateInput}
        value={inboundDate}
        onValueChange={(date) => setInboundDate(date)}
      />
      <DateTimePicker
        style={styles.dateInput}
        value={outboundDate}
        onValueChange={(date) => setOutboundDate(date)}
      />
      <TextInput
        style={styles.input}
        value={budget}
        keyboardType="numeric"
        onChangeText={setBudget}
      />
      <TextInput
        style={styles.input}
        value={numberOfPeople}
        keyboardType="numeric"
        onChangeText={setNumberOfPeople}
      />
      <TextInput
        style={styles.input}
        value={transportType}
        onChangeText={setTransportType}
      />
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text>Go!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  dateInput: {
    backgroundColor: "#F5FCFF",
  },
});
