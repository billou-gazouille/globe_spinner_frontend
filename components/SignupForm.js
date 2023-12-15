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

  const [showFieldsError, setShowFieldsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const checkHasEmptyField = (fields) => {
    for (let field of fields){
      if (!field || field === ' ')
        return true;
    }
    return false;
  };

  const handlePressSubmit = () => {
    if (checkHasEmptyField([
      firstname, 
      lastname, 
      email, 
      password, 
      confirmPassword
    ])){
        setShowFieldsError(true);
        setErrorMsg('Some fields are empty !');
        return;
      }
    if (!EMAIL_REGEX.test(email)) {
      setShowFieldsError(true);
      setErrorMsg('Email is not valid !');
      return;
    }
    if (password !== confirmPassword) {
      setShowFieldsError(true);
      setErrorMsg('passwords do not match !');
      return;
    }
    if (password.length < 5) {
      setShowFieldsError(true);
      setErrorMsg('password must be at least 5 characters long !');
      return;
    }
    submit(firstname, lastname, email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 35, color: 'white'}}>Signup Form</Text> 
      
      {/* {showFieldsError && <Text style={styles.fieldsError}>Some fields contain an error</Text>} */}
      {showFieldsError && <Text style={styles.fieldsError}>{errorMsg}</Text>}

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
            secureTextEntry={true} 
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
            secureTextEntry={true} 
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          >
          </TextInput>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.submitButton}  
        onPress={handlePressSubmit} 
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
  fieldsError: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
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