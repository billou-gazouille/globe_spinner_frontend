import { Text as CustomTextKrona, StyleSheet } from "react-native";
import { useFonts, KronaOne } from "@expo-google-fonts/krona-one";

export const CustomText = ({ style, ...props }) => {
  const [fontsLoaded] = useFonts({
    KronaOne,
  });

  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }
  return <CustomTextKrona style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "KronaOne-Regular",
  },
});
