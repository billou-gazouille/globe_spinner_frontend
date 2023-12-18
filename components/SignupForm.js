import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function SignupForm({submit, closeModal}) {

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

  const handlePressSubmit = async () => {
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
    const response = await submit(firstname, lastname, email, password);
    //console.log(response);
    if (!response.result){
      setShowFieldsError(true);
      setErrorMsg(response.error);
      return;
    }
  };

  return (
    <KeyboardAvoidingView 
      enabled={true}
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity 
          style={styles.closeButton} 
          onPress={closeModal}
        >
          <FontAwesome name='close' size={30} color='black'/>
        </TouchableOpacity>
      
      <Text style={{fontSize: 24, color: 'black'}}>Sign up</Text>
      {showFieldsError && <Text style={styles.fieldsError}>{errorMsg}</Text>}

      <View style={styles.inputsContainer}>
        <View style={styles.textAndInput}>
          <Text style={{fontSize: 20, color: 'black'}}>first name</Text>
          <TextInput 
            placeholder='firstname' 
            style={styles.textInput} 
            value={firstname}
            onChangeText={(text) => setFirstname(text)}
            autoFocus={true}
          >
          </TextInput>
        </View>
        
        <View style={styles.textAndInput}>
          <Text style={{fontSize: 20, color: 'black'}}>last name</Text>
          <TextInput 
            placeholder='lastname' 
            style={styles.textInput} 
            value={lastname}
            onChangeText={(text) => setLastname(text)}
          >
          </TextInput>
        </View>

        <View style={styles.textAndInput}>
          <Text style={{fontSize: 20, color: 'black'}}>email</Text>
          <TextInput 
            placeholder='email' 
            style={styles.textInput} 
            value={email}
            onChangeText={(text) => setEmail(text)}
          >
          </TextInput>
        </View>

        <View style={styles.textAndInput}>
          <Text style={{fontSize: 20, color: 'black'}}>password</Text>
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
          <Text style={{fontSize: 20, color: 'black'}}>confirm password</Text>
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
          <Text style={styles.submitButtonText}>Submit</Text> 
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    //borderWidth: 2,
    //borderColor: 'red',
  },
  fieldsError: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  inputsContainer: {
    width: '100%',
    // height: '40%',
    // borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAndInput: {
    width: '80%',
    // borderWidth: 1,
    // borderColor: "red"
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    fontSize: 20,
    padding: 2,
    color: 'black',
    marginTop: 2,
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
  submitButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#3972D9',
    borderRadius: 25,
    width: 200,
    height: 50,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});