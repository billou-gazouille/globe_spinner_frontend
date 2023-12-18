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
} from "react-native";
// import DatePickerAndroid from "../components/android/DatePickerAndroid";
import CustomCheckbox from "../components/CustomCheckbox";
import BackButton from "../components/BackButton";
import { CustomText } from "../components/CustomText";
import { useDispatch } from "react-redux";
import { addFiltersToStore } from "../reducers/filters";

// import DatePickerIOS from "../components/ios/DatePickerIOS";

import GradientFontColor from "../components/GradientFontColor";

const transportationMode = ["Train", "Airplane", "Coach"];

export default function FiltersScreen({ navigation }) {
  const { height, width } = useWindowDimensions();

  const [departureLocation, setDepartureLocation] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [budget, setBudget] = useState("");
  const [nbrOfTravelers, setNbrOfTravelers] = useState(1);
  const [transportType, setTransportType] = useState("");

  const [showFieldsError, setShowFieldsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const checkboxes = transportationMode.map((e, i) => (
    <CustomCheckbox key={i} text={e} />
  ));

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
    navigation.navigate("SuggestionsHomeStack");
  };

  const callHandleAndHandlePress = () => {
    const result = handlePressSubmit();
    if (result) {
      handleSubmit();
    }
    console.log(handlePressSubmit());
  };

  const checkHasEmptyField = (fields) => {
    for (let field of fields) {
      if (!field || field === " ") return true;
    }
    return false;
  };

  // let datePicker = <DatePickerIOS />;

  return (
    // <View style={styles.container}>
    //   <Text>
    //     Your<GradientFontColor style={styles.title}>filters</GradientFontColor>
    //   </Text>
    //   {showFieldsError && <Text style={styles.fieldsError}>{errorMsg}</Text>}

    //   <StatusBar style="auto" />
    //   <BackButton />
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === "ios" ? "padding" : "height"}
    //     style={styles.keyboardAvoidingContainer}
    //   >
    //     {/* <View style={styles.date}>
    //       <DatePickerIOS
    //         departureDate={departureDate}
    //         returnDate={returnDate}
    //         onDepartureDateChange={(event, selectedDate) => {
    //           setDepartureDate(selectedDate || departureDate);
    //         }}
    //         onReturnDateChange={(event, selectedDate) => {
    //           setReturnDate(selectedDate || returnDate);
    //         }}
    //       />
    //     </View> */}

    //     {/* <ImageBackground
    //       source={require("../assets/bendy-dotted-line_2.jpg")}
    //       style={styles.background}
    //       resizeMode="cover"
    //     >
    //       <Text>Date</Text>
    //     </ImageBackground> */}

    //     {/* Other Inputs */}
    //     <View style={styles.rowContainer}>
    //       <View style={{ flex: 1, marginRight: 10 }}>
    //         <Text style={styles.text}>What's your budget? (in euros)</Text>
    //         <TextInput
    //           style={styles.input}
    //           value={budget}
    //           placeholder="E.g. 1000"
    //           keyboardType="numeric"
    //           onChangeText={(number) => setBudget(number)}
    //         />
    //       </View>
    //       <View style={{ flex: 1 }}>
    //         <Text style={styles.text}>From where are you leaving?</Text>
    //         <TextInput
    //           style={styles.input}
    //           value={departureLocation}
    //           placeholder="E.g. Davézieux"
    //           onChangeText={(text) => setDepartureLocation(text)}
    //         />
    //       </View>
    //     </View>
    //     <View style={styles.rowContainer}>
    //       <View style={{ flex: 1, marginRight: 10 }}>
    //         <Text style={styles.text}>How many travelers are there?</Text>
    //         <TextInput
    //           style={styles.input}
    //           value={nbrOfTravelers}
    //           keyboardType="numeric"
    //           onChangeText={(number) => setNbrOfTravelers(Number(number))}
    //         />
    //       </View>

    //       <View style={{ flex: 1 }}>
    //         <Text style={styles.text}>
    //           What kind of transportation would you like ?
    //         </Text>
    //         <View>{checkboxes}</View>
    //       </View>
    //     </View>
    //     <TouchableOpacity
    //       onPress={callHandleAndHandlePress}
    //       style={styles.button}
    //     >
    //       <CustomText style={styles.buttonText}>Go!</CustomText>
    //     </TouchableOpacity>
    //   </KeyboardAvoidingView>
    // </View>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your </Text>
        <GradientFontColor style={styles.title}>filters</GradientFontColor>
      </View>

      {/* <StatusBar style="auto" /> */}
      <BackButton />
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      /> */}

      <View style={styles.inputContainerRow}>
        <View style={styles.inputContainer}>
          <CustomText>Departure</CustomText>
          <TextInput
            style={styles.input}
            // onChangeText={handleTextChange}
            // value={"test"}
            placeholder="E.g. Davézieux"
          />
        </View>
      </View>

      <ImageBackground
        source={require("../assets/bendy-dotted-line_2.jpg")}
        style={styles.imageBackground}
      >
        <View style={[styles.sectionTitle, { width: width }]}>
          <CustomText style={styles.sectionTextTitle}>DATES</CustomText>
        </View>
      </ImageBackground>
      <ImageBackground
        source={require("../assets/bendy-dotted-line_2.jpg")}
        style={styles.imageBackground}
      >
        <View style={[styles.sectionTitle, { width: width }]}>
          <CustomText style={styles.sectionTextTitle}>Détails</CustomText>
        </View>
      </ImageBackground>

      <View style={styles.inputContainerRow}>
        <View style={styles.inputContainer}>
          <CustomText>How many people:</CustomText>
          <TextInput
            style={styles.input}
            // onChangeText={handleTextChange}
            // value={"test"}
            placeholder="Type something..."
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomText>Budget:</CustomText>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            // onChangeText={handleTextChange}
            // value={"test"}
            placeholder="Type something..."
          />
        </View>
      </View>

      <View style={styles.inputContainerRow}>
        <CustomText>What kind of transportation would you like ?</CustomText>
        <View style={styles.checkboxes}>{checkboxes}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    marginTop: 60,
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
  imageBackground: {
    // // flex: 1,
    // resizeMode: "contain",
    // justifyContent: "center",
  },
  sectionTextTitle: {
    backgroundColor: "white",
    fontSize: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: -15,
    textTransform: "uppercase",
  },
  inputContainerRow: {
    width: "100%",
    marginVertical: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
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
    // flexDirection: "row",
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 50,
//     fontFamily: "KronaOne_400Regular",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 25,
//   },
//   date: {},
//   rowContainer: {
//     marginTop: 50,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   // rowContainerTwo: {
//   //   // marginTop: 10,
//   //   flexDirection: "row",
//   //   justifyContent: "space-between",
//   // },
//   input: {
//     marginTop: 10,
//     height: 40,
//     margin: 12,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     borderBottomColor: "#515151",
//     padding: 10,
//     borderRadius: 20,
//   },
//   background: {
//     flex: 1,
//     width: "100%",
//     height: "30%",
//     justifyContent: "center",
//   },
//   keyboardAvoidingContainer: {
//     width: "100%",
//     alignItems: "center",
//   },
//   dateInput: {
//     backgroundColor: "#F5FCFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     borderRadius: 50,
//     paddingVertical: 15,
//     paddingHorizontal: 60,
//     elevation: 4,
//     backgroundColor: "#3972D9",
//     marginTop: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     justifyContent: "center",
//     alignItems: "center",
//     color: "white",
//   },
//   text: {
//     fontWeight: "bold",
//     letterSpacing: 0,
//     color: "#515151",
//     fontSize: 17,
//     textAlign: "center",
//     justifyContent: "center",
//   },
// });
