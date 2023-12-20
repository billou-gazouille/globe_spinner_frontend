import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  StatusBar,
  ImageBackground,
  useWindowDimensions,
  Alert,
  SafeAreaView,
} from "react-native";
// import DatePickerAndroid from "../components/android/DatePickerAndroid";
import CustomCheckbox from "../components/CustomCheckbox";
import { CustomText } from "../components/CustomText";
import { useDispatch, useSelector } from "react-redux";
import { addFiltersToStore } from "../reducers/filters";

import DatePickerIOS from "../components/ios/DatePickerIOS";

import GradientFontColor from "../components/GradientFontColor";

const transportationMode = ["Train", "Airplane", "Coach"];

export default function FiltersScreen({ navigation }) {
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();
  // const filtersFromStore = useSelector((state) => state.filters.value);

  const [departureLocation, setDepartureLocation] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [budget, setBudget] = useState("");
  const [nbrOfTravelers, setNbrOfTravelers] = useState(1);
  const [transportType, setTransportType] = useState([
    "Train",
    "Airplane",
    "Coach",
  ]);

  const selectTransportationMode = (type) => {
    if (!transportType.includes(type)) {
      setTransportType((prevTypes) => [...prevTypes, type]);
    } else {
      setTransportType((prevTypes) => prevTypes.filter((e) => e !== type));
    }
  };
  const checkboxes = transportationMode.map((e, i) => (
    <CustomCheckbox
      key={i}
      text={e}
      selectTransportationMode={selectTransportationMode}
    />
  ));

  const handleSubmit = () => {
    const filters = {
      departureLocation,
      budget,
      nbrOfTravelers,
      transportType,
      departureDate,
      returnDate,
    };

    dispatch(addFiltersToStore({ filters }));
    console.log(
      "************************************************************",
      { filters },
      "************************************************************"
    );
    navigation.navigate("SuggestionsHomeStack");
  };

  const checkHasEmptyField = (fields) =>
    fields.some((field) => !field || field === "" || field.length === 0);

  const handlePressSubmit = () => {
    const requiredFields = [
      departureLocation,
      budget,
      nbrOfTravelers,
      transportType,
      departureDate,
      returnDate,
    ];
    console.log("coucou", departureDate, returnDate);
    if (checkHasEmptyField(requiredFields)) {
      return Alert.alert("Some fields are missing!");
    }
    return true;
  };

  const callHandleAndHandlePress = () => {
    const result = handlePressSubmit();
    if (result) {
      handleSubmit();
    }
    // console.log("handlePressSubmit", handlePressSubmit());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="auto" />
        {/* <BackButton /> */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your </Text>
          <GradientFontColor style={styles.title}>filters</GradientFontColor>
        </View>

        <View style={styles.inputDepartureContainerRow}>
          <View style={styles.inputContainer}>
            <CustomText>Departure</CustomText>
            <TextInput
              style={styles.input}
              // onChangeText={handleTextChange}
              // value={"test"}
              placeholder="E.g. Davézieux"
              onChangeText={(text) => setDepartureLocation(text)}
            />
          </View>
        </View>

        <CustomText style={styles.travelText}>How will you travel?</CustomText>

        <View style={styles.checkboxes}>{checkboxes}</View>
        <ImageBackground
          source={require("../assets/bendy-dotted-line_2.jpg")}
          style={styles.imageBackground}
        >
          <View style={[styles.sectionTitle, { width: width }]}>
            <CustomText style={styles.sectionTextTitle}>DATES</CustomText>
          </View>
          <View style={styles.date}></View>
        </ImageBackground>
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
        <ImageBackground
          source={require("../assets/bendy-dotted-line_2.jpg")}
          style={styles.imageBackground}
        >
          <View style={[styles.sectionTitle, { width: width }]}>
            <CustomText style={styles.sectionTextTitle}>Details</CustomText>
          </View>
        </ImageBackground>

        <View style={styles.inputContainerRow}>
          <View style={styles.inputContainer}>
            <CustomText>How many people:</CustomText>
            <TextInput
              style={styles.input}
              // onChangeText={handleTextChange}
              // value={"test"}
              keyboardType="numeric"
              placeholder="E.g. 3"
              onChangeText={(number) => setNbrOfTravelers(Number(number))}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomText>Budget:</CustomText>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              // onChangeText={handleTextChange}
              // value={"test"}
              placeholder="E.g. 300€"
              onChangeText={(number) => setBudget(number)}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={callHandleAndHandlePress}
          style={styles.button}
        >
          <CustomText style={styles.buttonText}>Go!</CustomText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "white",
    // paddingBottom: 130,
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  title: {
    fontFamily: "KronaOne_400Regular",
    fontSize: 40,
    color: "#515151",
  },
  sectionTitle: {
    marginTop: 25,
    alignItems: "center",
  },

  sectionTextTitle: {
    backgroundColor: "white",
    fontSize: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    textTransform: "uppercase",
  },
  inputDepartureContainerRow: {
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainerRow: {
    width: "100%",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItemps: "baseline",
    flexWrap: "wrap",
  },
  inputContainer: {
    width: "43%",
  },
  input: {
    fontSize: 16,
    borderBottomColor: "#BA99FE",
    borderBottomWidth: 2,
    paddingVertical: 5,
    marginTop: 10,
  },
  checkboxes: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  travelText: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  fieldsError: {
    fontSize: 20,
    marginBottom: 20,
    color: "red",
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 60,
    elevation: 3,
    backgroundColor: "#3972D9",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});
