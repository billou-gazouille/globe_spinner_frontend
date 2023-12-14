import React, { useState , useEffect  } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import SignModal from '../components/SignModal';


export default function ProfileScreen({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
// Vérifier ici si l'utilisateur a un token (vous devrez adapter cela en fonction de votre logique)
const userHasToken = checkIfUserHasToken(); 
// Mettre à jour l'état en conséquence
setHasToken(userHasToken);
}, []);

  

  const handleOpenModal = () => {
    if (!hasToken) {
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    navigation.navigate("Suggestions");
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleOpenModal}>
          <Ionicons name="person" size={30} color="white" />
        </TouchableOpacity>
        <SignModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onSignIn={() => {
           
            setHasToken(true);
            handleCloseModal();
          }}
          onSignUp={() => {
            
            setHasToken(true);
            handleCloseModal();
          }}
        />

      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.text}>
          Hello this is the profile screen and if you click me you'll go on
          suggestions screen
        </Text>
      </TouchableOpacity>
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 38,
  },
});

