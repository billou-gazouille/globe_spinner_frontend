// import { Text as CustomTextKrona, StyleSheet } from "react-native";
// import { useFonts, KronaOne } from "@expo-google-fonts/krona-one";

// export const CustomText = ({ style, ...props }) => {
//   const [fontsLoaded] = useFonts({
//     KronaOne,
//   });

//   if (!fontsLoaded) {
//     return <Text>Loading</Text>;
//   }
//   return <CustomTextKrona style={[styles.text, style]} {...props} />;
// };

// const styles = StyleSheet.create({
//   text: {
//     fontFamily: "KronaOne-Regular",
//   },
// });

import { Text as CustomRNText, StyleSheet } from "react-native";
import { useFonts, KronaOne_400Regular } from "@expo-google-fonts/krona-one";
import { NunitoSans_400Regular } from "@expo-google-fonts/nunito-sans";

export const CustomText = ({ style, ...props }) => {
  const [fontsLoaded] = useFonts({
    KronaOne_400Regular,
    NunitoSans_400Regular,
  });

  if (!fontsLoaded) {
    return <CustomRNText>:hourglass_flowing_sand:</CustomRNText>; // or loading spinner
  }

  return <CustomRNText style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "NunitoSans_400Regular",
    // Add other fonts/styles if needed
  },
});
