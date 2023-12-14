import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function SigninForm({submit}) {

  //const userInfo = useSelector(state => state.userInfo.value);
  //console.log(userInfo.isConnected);
  
  //const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 35, color: 'white'}}>Signin Form</Text> 
      <TouchableOpacity style={styles.submitButton} onPress={submit}>
          <Text style={{fontSize: 25, color: 'white'}}>Submit</Text> 
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  submitButton: {
    width: 250,
    height: 50,
    right: 20,
    top: 20,
    //backgroundColor: 'orange',
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 50,
  },
});