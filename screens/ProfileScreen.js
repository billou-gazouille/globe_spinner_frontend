import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import SignModal from "../components/SignModal";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect, disconnect, loadDetails } from "../reducers/userInfo";

import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import { CustomText } from "../components/CustomText";

const { ipAddress, port } = require('../myVariables');


export default function ProfileScreen({ navigation }) {
  const userInfo = useSelector((state) => state.userInfo.value);

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const dispatch = useDispatch();

  const closeModal = () => {
    setIsSigningIn(false);
    setIsSigningUp(false);
  };

  const handleSubmit = () => {
    navigation.navigate("Suggestions");
  };

  const signIn = async (email, password) => {
    //console.log("handleSubmitSigninForm");
    // setIsSigningIn(false);
    const data = await fetch(`http://${ipAddress}:${port}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((resp) => resp.json());
    //console.log(data);
    if (data.result) {
      dispatch(connect(true));
      setIsSigningIn(false);
      dispatch(loadDetails({
        token: data.token, 
        firstName: data.firstName, 
        lastName: data.lastName, 
        email: data.email,
      }));
      navigation.navigate("Home");
    }
    return data;
  };

  const signUp = async (firstName, lastName, email, password) => {
    // setIsSigningUp(false);
    const data = await fetch(`http://${ipAddress}:${port}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    }).then((resp) => resp.json());
    console.log(data);
    if (data.result) {
      dispatch(connect());
      setIsSigningUp(false);
      //console.log('okkk');
      dispatch(loadDetails({
        token: data.token, 
        firstName, 
        lastName, 
        email
      }));
      navigation.navigate("Home");
    }
    return data;
  };

  const signModal = (
    <SignModal
      closeSignModal={() => navigation.navigate("Home")}
      onSignIn={() => setIsSigningIn(true)}
      onSignUp={() => setIsSigningUp(true)}
    />
  );

  const signinForm = (
    <SigninForm 
      submit={(email, password) => signIn(email, password)} 
      closeModal={closeModal}
    />
  );

  const signupForm = (
    <SignupForm
      submit={(firstName, lastName, email, password) =>
        signUp(firstName, lastName, email, password)
      }
      closeModal={closeModal}
    />
  );

  const HandlePressLogout = () => {
    //console.log("HandlePressLogout");
    dispatch(disconnect());
  };

  const userDetails = (
    <View style={{borderWidth: 1}}>
      {/* <Text style={{ fontSize: 30, color: "black" }}>User details...</Text> */}
      <CustomText style={{color: 'black', fontSize: 36, margin: 40}}>Hello {userInfo.firstname} !</CustomText>
      <CustomText style={{color: 'black', fontSize: 26, margin: 20}}>My account info</CustomText>
      <View style={styles.userDetailsContainer}>
        <CustomText style={styles.userDetail}>first name: {userInfo.firstName}</CustomText>
        <CustomText style={styles.userDetail}>last name: {userInfo.lastName}</CustomText>
        <CustomText style={styles.userDetail}>email: {userInfo.email}</CustomText>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => HandlePressLogout()}
      >
        <Text style={{ fontSize: 16, color: "black" }}>Logout</Text>
        {/* <FontAwesome name='logout' size={25} color='white'/> */}
      </TouchableOpacity>
    </View>
  );



  const modalToShow = () => {
    if (isSigningIn) return signinForm;
    if (isSigningUp) return signupForm;
    if (!userInfo.isConnected) return signModal;
    return userDetails;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text style={{ ...styles.text, marginTop: 40 }}>
        connected? {userInfo.isConnected ? "YES" : "NO"}
      </Text> */}
      {modalToShow()}
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.text}>
          Hello this is the profile screen and if you click me you'll go on
          suggestions screen
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    //justifyContent: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 28,
  },
  logoutButton: {
    width: 60,
    height: 60,
    borderWidth: 1,
  },
  userDetailsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'left',
  },
  userDetail: {
    color: 'black',
    fontSize: 24,
    marginBottom: 20,
  }
});
