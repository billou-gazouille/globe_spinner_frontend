import { useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function DatePickerIOS({
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
}) {
  //! Don't remove the <event> function param or it will crash

  return (
    <View style={styles.container}>
      <Text style={styles.text}>FROM: {moment(departureDate).format("L")}</Text>
      <>
        <DatePicker
          value={departureDate}
          display="default"
          mode="date"
          onChange={onDepartureDateChange}
        />
      </>
      <View style={styles.dates}>
        <Text style={styles.text}>TO: {moment(returnDate).format("L")}</Text>
        <DatePicker
          value={returnDate}
          display="default"
          mode="date"
          onChange={onReturnDateChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  dates: {
    marginTop: 20,
  },
  text: {
    fontFamily: "NunitoSans_400Regular",
  },
});
