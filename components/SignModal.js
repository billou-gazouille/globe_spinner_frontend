import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from 'react-native-vector-icons/FontAwesome';


const SignModal = ({onClose, onSignIn, onSignUp, closeSignModal }) => {

  const userInfo = useSelector(state => state.userInfo.value);
  console.log(userInfo.isConnected);
  
  //const dispatch = useDispatch();

  return (
    // plus de "Modal" car ça bug vraiment trop
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={closeSignModal}
        >
          <FontAwesome name='close' size={30} color='black'/>
        </TouchableOpacity>
        <View style={styles.modalContent}>  
          <TouchableOpacity style={styles.button} onPress={onSignIn}>
            <Text style={styles.buttonText}>Sign In!!!</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  modalContainer: { 
    //flex: 1,   
    width: '90%',
    height: '50%',
    // justifyContent: 'center', 
    justifyContent: 'space-evenly',
    alignItems: 'center', 
    backgroundColor: '#F4F4F4', 
    borderWidth: 3,
    borderColor: 'red',
  },
  modalContent: { 
    backgroundColor: '#F4F4F4',
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'center', 
    borderWidth: 3,
  },
  button: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#BA99FE',
    borderRadius: 5,
    width: '100%',
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