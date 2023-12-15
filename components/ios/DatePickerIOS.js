import { useState } from "react";
import { Text } from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import moment from "moment";

export default function DatePickerIOS({
  departureDate,
  returnDate,
  onDepartureDateChange,
  onReturnDateChange,
}) {
  //! Don't remove the <event> function param or it will crash
  // function onDepartureDateChange(event, selectedDate) {
  //   setDepartureDate(selectedDate || departureDate); // Use selectedDate or current state if null
  // }

  // function onReturnDateChange(event, selectedDate) {
  //   setReturnDate(selectedDate || returnDate); // Use selectedDate or current state if null
  // }

  return (
    <>
      <Text>Departure date selected: {moment(departureDate).format("L")}</Text>
      <DatePicker
        value={departureDate}
        display="default"
        mode="date"
        onChange={onDepartureDateChange}
      />
      <Text>Return date selected: {moment(returnDate).format("L")}</Text>
      <DatePicker
        value={returnDate}
        display="default"
        mode="date"
        onChange={onReturnDateChange}
      />
    </>
  );
}
