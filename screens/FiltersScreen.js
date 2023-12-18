import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Text,
  StatusBar,
} from "react-native";
// import DatePickerAndroid from "../components/android/DatePickerAndroid";
import BackButton from "../components/BackButton";
import { CustomText } from "../components/CustomText";
import { useDispatch } from "react-redux";
import { addFiltersToStore } from "../reducers/filters";
import DatePickerIOS from "../components/ios/DatePickerIOS";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function FiltersScreen({ navigation }) {
  const [departureLocation, setDepartureLocation] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [budget, setBudget] = useState("");
  const [nbrOfTravelers, setNbrOfTravelers] = useState(1);
  const [transportType, setTransportType] = useState("");

  const [showFieldsError, setShowFieldsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let bouncyCheckboxRef = null;
  const [checkboxState, setCheckboxState] = useState(false);

  const dispatch = useDispatch();

  const handlePressSubmit = () => {
    if (
      checkHasEmptyField([
        // departureDate,
        // returnDate,
        departureLocation,
        budget,
        nbrOfTravelers,
        // transportType,
      ])
    ) {
      setShowFieldsError(true);
      setErrorMsg("Some fields are empty !");
      return false;
    }
    setShowFieldsError(false);
    return true;
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
    dispatch(addFiltersToStore(filters));
    // console.log("coucou je suis là");
    navigation.navigate("Suggestions");
  };

  const callHandleAndHandlePress = () => {
    const result = handlePressSubmit();
    if (result) {
      handleSubmit();
    }
    console.log(handlePressSubmit());
  };

  const checkHasEmptyField = (fields) => {
    for (let field of fields){
      if (!field || field === ' ')
        return true;
    }
    return false;
  };

  // let datePicker = <DatePickerIOS />;
  // if (Platform.OS === "android") datePicker = <DatePickerAndroid />;

  return (
    <View style={styles.container}>
      {showFieldsError && <Text style={styles.fieldsError}>{errorMsg}</Text>}

      <StatusBar style="auto" />
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        {/* <DatePickerIOS
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={(event, selectedDate) => {
            setDepartureDate(selectedDate || departureDate);
          }}
          onReturnDateChange={(event, selectedDate) => {
            setReturnDate(selectedDate || returnDate);
          }}
        /> */}

        {/* Other Inputs */}
        <Text style={styles.text}> What's your budget ? (in euros)</Text>
        <TextInput
          style={styles.input}
          value={budget}
          placeholder="E.g. 1000"
          keyboardType="numeric"
          onChangeText={(number) => setBudget(number)}
        />
        <Text style={styles.text}> From where are you leaving ?</Text>
        <TextInput
          style={styles.input}
          value={departureLocation}
          placeholder="E.g. Aveizieux"
          onChangeText={(text) => setDepartureLocation(text)}
        />
        <Text style={styles.text}>How many travellers are there ?</Text>
        <TextInput
          style={styles.input}
          value={nbrOfTravelers}
          // placeholder="E.g. 3"
          keyboardType="numeric"
          onChangeText={(number) => setNbrOfTravelers(Number(number))}
        />
        <View>
          <Text style={styles.text}>
            What kind of transportation would you like
          </Text>
          <View>
            <Text>Train</Text>
            <BouncyCheckbox
              style={{ marginTop: 16 }}
              ref={(ref) => (bouncyCheckboxRef = ref)}
              isChecked={checkboxState}
              disableText
              // disableBuiltInState
              onPress={() => setCheckboxState(!checkboxState)}
            />
          </View>
        </View>
        {/* <TextInput
          style={styles.input}
          value={transportType}
          placeholder="E.g. train"
          onChangeText={(text) => setTransportType(text)}
        /> */}
        <TouchableOpacity
          onPress={callHandleAndHandlePress}
          style={styles.button}
        >
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
    letterSpacing: 0.5,
    color: "#ba99fe",
    fontSize: 11,
    textAlign: "center",
    justifyContent: "center",
  },
  transportCheckBox: {
    justifyContent: "center",
    textAlign: "center",
  },
  fieldsError: {
    fontSize: 20,
    marginBottom: 20,
    color: 'red',
    fontWeight: 'bold',
  },
});
