import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const CustomCheckbox = ({ onPress, text }) => {
  return (
    <BouncyCheckbox
      size={25}
      fillColor="#ba99fe"
      unfillColor="#FFFFFF"
      text={text}
      iconStyle={{ borderColor: "#FFFFFF" }}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{
        fontFamily: "NunitoSans_400Regular",
        textDecorationLine: "none",
        marginTop: 15,
        fontSize: 18,
        color: "#515151",
      }}
      onPress={onPress}
    />
  );
};

export default CustomCheckbox;
