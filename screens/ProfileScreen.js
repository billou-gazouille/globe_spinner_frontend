import React, { useState } from "react";
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

  const handleOpenModal = () => {
    setModalVisible(true);
  };


  const handleSubmit = () => {
    navigation.navigate("Suggestions");
  };

  return (
    <view style = {styles.container}>
     <TouchableOpacity onPress={handleOpenModal}>
     <iconName name="user"  />
     </TouchableOpacity>
     <SignModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSignIn={() => {}}
        onSignUp={() => {}}/>


      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.text}>
          Hello this is the profile screen and if you click me you'll go on
          suggestions screen
        </Text>
      </TouchableOpacity>
      
    </view>

  );
}

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

