import React, { useState } from 'react';
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet, Image ,KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GradienFontColor from "../components/GradientFontColor";



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
          <FontAwesome name='close' size={20} color='black'/>
      </TouchableOpacity>

      <View style={styles.header}>
          <GradienFontColor>
            <Text style={styles.signInText}>Sign in</Text>
          </GradienFontColor>
        </View>
 
      {showFieldsError && <Text style={styles.fieldsError}>{errorMsg}</Text>}
      
      <View style={styles.inputsContainer}>

        <View style={styles.textAndInput}>
        <FontAwesome name="user" size={40} color="#BA99FE" />
        <View style={styles.textInputContainer}>
          <TextInput 
            placeholder='email' 
            style={styles.textInput} 
            value={email}
            onChangeText={(text) => setEmail(text)}
          >
          </TextInput>
          </View>
        </View>

        <View style={styles.textAndInput}>
        <FontAwesome name="lock" size={40} color="#BA99FE" />
        <View style={styles.textInputContainer}>
          <TextInput 
            placeholder='password' 
            
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
          >
          </TextInput>
        </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handlePressSubmit}
      >
          <Text style={{fontSize: 25, color: 'white'}}>Submit</Text> 
      </TouchableOpacity>
      <Image source={require('../assets/line-map.jpg')} style={styles.headerImage} />
 
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  headerImage: {
    width: '100%', 
    height: 60,   
    resizeMode: 'stretch', 
    marginTop : 50,
    
  },
  container: {
    flex: "1",
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    backgroundColor : "#ECE8F2",
    
  },

  fieldsError: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  
  inputsContainer: {
    width: '100%',
    height: '30%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection : 20,

  },
  textAndInput: {
    width: '80%',
  height: '30%',
    marginBottom:70,
    color: "red"
  },

  textInputContainer: {
    backgroundColor: 'white', 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',

  },

  inputLabel: {
    fontSize: 18,
    color: '#BA99FE',
    marginBottom: 20,
    fontFamily: "KronaOne_400Regular",
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  textInput: {
    width: "50%",
    borderWidth: 0,
    fontSize: 15,
    padding: 5,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: "KronaOne_400Regular",
  },
  submitButton: {
    width: 250,
    height: 50,
    top: 20,
    borderWidth: 1,
    borderRadius: 60,
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 50,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#3972D9',
marginTop:30,

  },
  closeButton: {
    width: 30,
    height: 30,
    right: 20,
    top: 20,
    borderWidth: 1,
    position: 'absolute',
    
    borderRadius: 5,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  
  submitButtonText: {
   
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "KronaOne_400Regular",
    marginTop : 10,
  },
  signInText: {
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "KronaOne_400Regular",
    marginTop: 50,
    marginBottom: 30,
    color : "#3972D9"
  },
});