import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { CustomText } from './CustomText';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


const SignModal = ({onClose, onSignIn, onSignUp, closeSignModal }) => {

  const userInfo = useSelector(state => state.userInfo.value);
  console.log(userInfo.isConnected);
  
  //const dispatch = useDispatch();

  return (
    // plus de "Modal" car ça bug vraiment trop
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={closeSignModal}
      >
        <FontAwesome name='close' size={30} color='black'/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <CustomText style={styles.buttonText}>Sign In</CustomText> 
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <CustomText>Don't have an account ?</CustomText> 
        <TouchableOpacity style={styles.button} onPress={onSignUp}>
          <CustomText style={styles.buttonText}>Sign Up</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#3972D9',
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3972D9',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: 'bold',
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

export default SignModal;