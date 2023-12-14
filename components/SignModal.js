import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SignModal = ({ visible, onClose, onSignIn, onSignUp }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true} 
      visible={visible}
    >
      <View style={styles.modalContainer}>  
        <View style={styles.modalContent}>  
          <TouchableOpacity style={styles.button} onPress={onSignIn}>
            <Text style={styles.buttonText}>Sign In</Text> // Lorsqu'il est pressé, la fonction onSignIn est appelée.
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { 
    flex: 1,   
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F4F4F4', 
  },
  modalContent: { 
    backgroundColor: '#F4F4F4',
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'center', 
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
});

export default SignModal;