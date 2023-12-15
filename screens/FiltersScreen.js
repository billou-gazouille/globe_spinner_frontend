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
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import BackButton from "../components/BackButton";
import { CustomText } from "../components/CustomText";
import Icon from "react-native-vector-icons/FontAwesome";

export default function FiltersScreen({ navigation }) {
  const [departureLocation, setDepartureLocation] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [returnDate, setReturnDate] = useState(new Date());
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [text, setText] = useState("Empty");
  const [budget, setBudget] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(null);
  const [transportType, setTransportType] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Suggestions");
  };
  const onChangeDepartureDate = (event, setDepartureDate) => {
    const currentDate = setDepartureDate || departureDate;
    setIsPickerShow(Platform.OS === "ios");
    setReturnDate(currentDate);

    let tempDate = new Date(currentDate);
    let formatedDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(formatedDate);

    console("coucou voici la date", formatedDate);
  };

  const showDatePicker = (mode) => {
    setIsPickerShow(true);
    setPickerMode(mode);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <TextInput
          style={styles.input}
          value={departureLocation}
          placeholder="origin"
          onChangeText={(value) => setDepartureLocation(value)}
        />
        <View>
          <TouchableOpacity onPress={() => showDatePicker("date")}>
            <View style={styles.buttonText}>
              <Icon name="calendar" size={20} color="#000" />
            </View>
          </TouchableOpacity>
          <Text>Choose Departure Date</Text>
          <Text>{text}</Text>
          <TouchableOpacity onPress={() => showDatePicker("date")}>
            <View style={styles.buttonText}>
              <Icon name="calendar" size={20} color="#000" />
              <Text>Choose Return Date</Text>
            </View>
          </TouchableOpacity>

          {setIsPickerShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={departureDate}
              mode={mode}
              display="default"
              onChange={onChangeDepartureDate}
            />
          )}
        </View>

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
          value={numberOfPeople}
          placeholder="Number of people"
          keyboardType="numeric"
          onChangeText={setNumberOfPeople}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
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
    width: "100%", // Ensures the container takes full width
    alignItems: "center", // Centers children horizontally
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
