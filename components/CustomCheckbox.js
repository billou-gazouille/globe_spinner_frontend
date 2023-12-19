import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { View } from "react-native";

const CustomCheckbox = ({ selectTransportationMode, text }) => {
  return (
    <BouncyCheckbox
      size={25}
      fillColor="#ba99fe"
      unfillColor="#FFFFFF"
      text={text}
      isChecked={true}
      iconStyle={{ borderColor: "#FFFFFF", marginVertical: 5 }}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{
        fontFamily: "NunitoSans_400Regular",
        textDecorationLine: "none",
        // marginTop: 15,
        marginVertical: 5,
        fontSize: 18,
        color: "#515151",
      }}
      onPress={() => selectTransportationMode(text)}
    />
  );
};

export default CustomCheckbox;
