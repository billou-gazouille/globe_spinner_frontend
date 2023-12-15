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

import { setIsConnected } from "../reducers/userInfo";

import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";

export default function ProfileScreen({ navigation }) {
  const userInfo = useSelector((state) => state.userInfo.value);

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    navigation.navigate("Suggestions");
  };

<<<<<<< HEAD
  const handleSubmitSigninForm = () => {
    console.log("handleSubmitSigninForm");
=======
  const signIn = async(email, password) => {
    console.log('handleSubmitSigninForm');
>>>>>>> 25e0e332cfc74b80ff820fd8ce8a8646d500c785
    setIsSigningIn(false);
    const data = await fetch('http://192.168.43.25:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password})
    })
      .then(resp => resp.json());
    console.log(data);
    if (data.result){
      dispatch(setIsConnected(true));
      navigation.navigate('Home');
    }
  };

<<<<<<< HEAD
  const handleSubmitSignupForm = async (
    firstname,
    lastname,
    email,
    password
  ) => {
    console.log("handleSubmitSignupForm");
=======
  const signUp = async (firstname, lastname, email, password) => {
    console.log('handleSubmitSignupForm');
>>>>>>> 25e0e332cfc74b80ff820fd8ce8a8646d500c785
    setIsSigningUp(false);
    const data = await fetch("http://192.168.43.25:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email, password }),
    }).then((resp) => resp.json());
    console.log(data);
    if (data.result) {
      dispatch(setIsConnected(true));
      navigation.navigate('Home');
    }
  };

  const signModal = (
    <SignModal
      closeSignModal={() => navigation.navigate("Home")}
      onSignIn={() => setIsSigningIn(true)}
      onSignUp={() => setIsSigningUp(true)}
    />
  );

<<<<<<< HEAD
  const signinForm = <SigninForm submit={handleSubmitSigninForm} />;

  const signupForm = (
    <SignupForm
      submit={(firstname, lastname, email, password) =>
        handleSubmitSignupForm(firstname, lastname, email, password)
      }
    />
  );
=======
  const signinForm = 
    <SigninForm 
      submit={
        (email, password) => signIn(email, password)
      }
    />;

  const signupForm = 
    <SignupForm 
      submit={
        (firstname, lastname, email, password) => 
          signUp(firstname, lastname, email, password)
      }
    />;

  const HandlePressLogout = () => {
    console.log('HandlePressLogout');
    dispatch(setIsConnected(false));
  };
  
>>>>>>> 25e0e332cfc74b80ff820fd8ce8a8646d500c785

  const userDetails = (
    <View>
<<<<<<< HEAD
      <Text style={{ fontSize: 30, color: "white" }}>User details...</Text>
    </View>
  );
=======
      <Text style={{fontSize: 30, color: 'white'}}>User details...</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={() => HandlePressLogout()}>
        <Text style={{fontSize: 16, color: 'white'}}>Logout</Text>
        {/* <FontAwesome name='logout' size={25} color='white'/> */}
      </TouchableOpacity>
    </View>;

>>>>>>> 25e0e332cfc74b80ff820fd8ce8a8646d500c785

  const modalToShow = () => {
    if (isSigningIn) return signinForm;
    if (isSigningUp) return signupForm;
    if (!userInfo.isConnected) return signModal;
    return userDetails;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Text style={styles.text}>Hello this is the profile screen!!!</Text> */}
      <Text style={{ ...styles.text, marginTop: 40 }}>
        connected? {userInfo.isConnected ? "YES" : "NO"}
      </Text>
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
    backgroundColor: "blue",
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
});
