import React, { useState , useEffect  } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SignModal from '../components/SignModal';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setIsConnected } from '../reducers/userInfo';


export default function ProfileScreen({ navigation }) {

  const userInfo = useSelector(state => state.userInfo.value);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    navigation.navigate("Suggestions");
  };

  const signModal = 
    <SignModal
      closeSignModal={() => navigation.navigate('Home')} 
      onSignIn={() => { 
        
      }}
      onSignUp={() => {        
        
      }}
    />;

  const userDetails = 
  <View>
    <Text style={{fontSize: 30, color: 'white'}}>User details...</Text>
  </View>;


  const modalToShow = () => {
    if (!userInfo.isConnected) 
      return signModal;
    else 
      return userDetails;
  };


  return (
      <View style={styles.container}>
        {/* <Text style={styles.text}>Hello this is the profile screen!!!</Text> */}
        <Text style={{...styles.text, marginTop: 40}}>
          connected? {userInfo.isConnected ? 'YES' : 'NO'}
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
});

