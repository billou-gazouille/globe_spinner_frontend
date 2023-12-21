import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
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

const { ipAddress, port } = require("../myVariables");

import {
  useFonts,
  NunitoSans_400Regular,
} from "@expo-google-fonts/nunito-sans";

export default function UserDetails({ logout }) {
  const userInfo = useSelector((state) => state.userInfo.value);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    fetch(`http://${ipAddress}:${port}/users/${userInfo.token}/savedTrips`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("data: ", data);
      });
  }, []);

  const HandlePressLogout = () => {
    //console.log("HandlePressLogout");
    logout();
  };

  return (
    <SafeAreaView style={[styles.container, { height }]}>
      <ScrollView contentContainerStyle={[styles.scrollView, { width: width }]}>
        <StatusBar style="auto" />
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => HandlePressLogout()}
        >
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
