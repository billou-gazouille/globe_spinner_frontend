import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function SigninForm({submit, closeModal}) {

  //const userInfo = useSelector(state => state.userInfo.value);
  //console.log(userInfo.isConnected);
  
  //const dispatch = useDispatch();

  const [showFieldsError, setShowFieldsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const checkHasEmptyField = (fields) => {
    for (let field of fields){
      if (!field || field === ' ')
        return true;
    }
    return false;
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePressSubmit = async () => {
    if (checkHasEmptyField([email, password])){
      setShowFieldsError(true);
      setErrorMsg('Some fields are empty !');
      return;
    }
    const response = await submit(email, password);
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

      <Text style={{fontSize: 24, color: 'black'}}>Sign in</Text> 
      {showFieldsError && <Text style={styles.fieldsError}>{errorMsg}</Text>}
      
      <View style={styles.inputsContainer}>

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
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
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
    </KeyboardAvoidingView>
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
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  inputsContainer: {
    width: '100%',
    height: '25%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAndInput: {
    width: '80%',
    // height: '30%',
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