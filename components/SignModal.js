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
            <Text style={styles.buttonText}>Sign In</Text> 
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
  modalContainer: { //utilisé pour styliser le conteneur global de la modalité, en lui donnant une couleur de fond grise et en centrant son contenu verticalement et horizontalement.
    flex: 1, //  occupera toute la hauteur disponible de son parent.
    justifyContent: 'center', //  centre le contenu verticalement dans le conteneur.
    alignItems: 'center', // centre le contenu horizontalement dans le conteneur.
    backgroundColor: '#F4F4F4', //définit la couleur de fond du conteneur
  },
  modalContent: { //  le contenu spécifique de la modalité, en lui donnant une couleur de fond grise, un remplissage autour du contenu, des coins arrondis et en centrant le contenu horizontalement.
    backgroundColor: '#F4F4F4',
    padding: 20, // remplissage de 20 unités autour du contenu de la modalité, créant ainsi un espace entre le contenu et les bords de la modalité
    borderRadius: 10, // arrondit les coins du contenu avec un rayon de 10 unités, créant ainsi des coins arrondis.
    alignItems: 'center', // centre le contenu horizontalement dans le conteneur de contenu.
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