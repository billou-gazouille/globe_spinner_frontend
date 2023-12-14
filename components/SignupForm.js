import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function SignupForm({submit}) {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 35, color: 'white'}}>Signup Form</Text> 
      
      <View style={styles.inputsContainer}>
        <View style={styles.textAndInput}>
          <Text style={{fontSize: 20, color: 'white'}}>first name</Text>
          <TextInput 
            placeholder='firstname' 
            style={styles.textInput} 
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
          >
          </TextInput>
        </View>
        
        <View style={styles.textAndInput}>
          <Text style={{fontSize: 20, color: 'white'}}>last name</Text>
          <TextInput 
            placeholder='lastname' 
            style={styles.textInput} 
            value={lastname}
            onChangeText={(text) => setLastname(text)}
          >
          </TextInput>
        </View>

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

        <View style={styles.textAndInput}>
          <Text style={{fontSize: 20, color: 'white'}}>confirm password</Text>
          <TextInput 
            placeholder='confirm password' 
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          >
          </TextInput>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.submitButton}  
        onPress={() => submit(firstname, lastname, email, password)} 
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
    justifyContent: 'space-evenly', 
    alignItems: 'center',
  },
  inputsContainer: {
    width: '100%',
    height: '40%',
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
    margin: 100,
  },
});