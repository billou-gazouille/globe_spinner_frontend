import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  Modal,
  Button,
  StatusBar,
} from "react-native";
import DatePickerIOS from "../components/ios/DatePickerIOS";
import DatePickerAndroid from "../components/android/DatePickerAndroid";
import BackButton from "../components/BackButton";
import { CustomText } from "../components/CustomText";
import { useDispatch } from "react-redux";
import { addFiltersToStore } from "../reducers/filters";

export default function FiltersScreen({ navigation }) {
  const [departureLocation, setDepartureLocation] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [budget, setBudget] = useState("");
  const [nbrOfTravelers, setNbrOfTravelers] = useState(null);
  const [transportType, setTransportType] = useState("");

  const dispatch = useDispatch();

  const dispatchFiltersToStore = (filters) => {
    dispatch(addFiltersToStore(filters));
  };

  const handleSubmit = () => {
    const filters = {
      departureLocation,
      budget,
      nbrOfTravelers,
      transportType,
      departureDate,
      returnDate,
    };
    dispatchFiltersToStore(filters);
    console.log(filters);
    navigation.navigate("Suggestions");
  };
  let datePicker = <DatePickerIOS />;
  if (Platform.OS === "android") datePicker = <DatePickerAndroid />;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        {/* {datePicker} */}
        <DatePickerIOS
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={(event, selectedDate) => {
            setDepartureDate(selectedDate || departureDate);
          }}
          onReturnDateChange={(event, selectedDate) => {
            setReturnDate(selectedDate || returnDate);
          }}
        />

        {/* Other Inputs */}
        <TextInput
          style={styles.input}
          value={budget}
          placeholder="Budget"
          keyboardType="numeric"
          onChangeText={setBudget}
        />
        <TextInput
          style={styles.input}
          value={departureLocation}
          placeholder="Departure"
          onChangeText={setDepartureLocation}
        />
        <TextInput
          style={styles.input}
          value={nbrOfTravelers}
          placeholder="Number of people"
          keyboardType="numeric"
          onChangeText={setNbrOfTravelers}
        />
        <TextInput
          style={styles.input}
          value={transportType}
          placeholder="Transport type"
          onChangeText={setTransportType}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <CustomText style={styles.text}>Go!</CustomText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  keyboardAvoidingContainer: {
    width: "100%",
    alignItems: "center",
  },
  dateInput: {
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 60,
    elevation: 4,
    backgroundColor: "#3972D9",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    letterSpacing: 2.5,
    color: "white",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
  },
});
