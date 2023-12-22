import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  StatusBar,
} from "react-native";

import GradientFontColor from "../components/GradientFontColor";
import { CustomText } from "../components/CustomText";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useSelector } from "react-redux";

export default function UserDetails({ logout }) {
  const userInfo = useSelector((state) => state.userInfo.value);
  const { height, width } = useWindowDimensions();

  //CETTE PARTIE EST COMMENTÉE CAR ELLE FAIT PLANTER LA PROMESSE AU MOMENT DU SIGNIN
  //   useEffect(() => {
  //     fetch(`http://${ipAddress}:${port}/users/${userInfo.token}/savedTrips`)
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         console.log("data: ", data);
  //       });
  //   }, []);

  return (
    <SafeAreaView style={[styles.container, { height }]}>
      <ScrollView contentContainerStyle={[styles.scrollView, { width: width }]}>
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <FontAwesome name="sign-out" size={40} />
        </TouchableOpacity>
        <GradientFontColor style={styles.hello}>
          Hello {userInfo.firstname} !
        </GradientFontColor>
        <View style={styles.userDetailsContainer}>
          <CustomText style={styles.text}>My account info : </CustomText>
          <CustomText style={styles.text}>
            first name: {userInfo.firstName}
          </CustomText>
          <CustomText style={styles.text}>
            last name: {userInfo.lastName}
          </CustomText>
          <CustomText style={styles.text}>email: {userInfo.email}</CustomText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  scrollView: {
    alignItems: "center",
  },
  hello: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    fontFamily: "KronaOne_400Regular",
    fontSize: 40,
  },
  text: {
    color: "black",
    fontSize: 26,
    margin: 20,
  },
  logoutButton: {
    // backgroundColor: "red",
    width: 60,
    height: 60,
    position: "absolute",
    right: -10,
    marginTop: 20,
  },

  userDetailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 60,
  },
});
