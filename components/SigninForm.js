import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function SigninForm({submit, closeModal}) {

  //const userInfo = useSelector(state => state.userInfo.value);
  //console.log(userInfo.isConnected);
  
  //const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity 
          style={styles.closeButton} 
          onPress={closeModal}
        >
          <FontAwesome name='close' size={30} color='black'/>
      </TouchableOpacity>

      <Text style={{fontSize: 24, color: 'white'}}>Sign in</Text> 
      
      <View style={styles.inputsContainer}>

        <View style={styles.textAndInput}>
          <Text style={{fontSize: 20, color: 'white'}}>email</Text>
          <TextInput 
            placeholder='email' 
            style={styles.textInput} 
            value={email}
            onChangeText={(text) => setEmail(text)}
          >
          </TextInput>
        </View>

        <View style={styles.textAndInput}>
          <Text style={{fontSize: 20, color: 'white'}}>password</Text>
          <TextInput 
            placeholder='password' 
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          >
          </TextInput>
        </View>

      </View>
      
      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={() => submit(email, password)}
      >
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
  inputsContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAndInput: {
    width: '80%',
    height: '30%',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    fontSize: 20,
    padding: 5,
    color: '#ffffff'
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
  closeButton: {
    width: 40,
    height: 40,
    right: 20,
    top: 20,
    //backgroundColor: 'orange',
    borderWidth: 2,
    position: 'absolute',
    borderRadius: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});