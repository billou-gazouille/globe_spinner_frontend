import React, { useState } from "react";
import {
  View,Image ,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import  {MaterialIcons , FontAwesome , Entypo}  from '@expo/vector-icons';
import BackButton from "../components/BackButton";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [checked, setChecked] = useState(false);
  

  // const handlePayPress = () => {
  //   navigation.navigate('Recap');
  // };


  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />

      <View style={[styles.subtitleContainer, { height: 60 }]}>

        <MaterialIcons name="person" size={24} color="#333"/>
        <Text style={styles.subtitle}>Bank Card User</Text>
      </View>
      <TextInput style={styles.input} placeholder="Enter your name" />

      <View style={styles.subtitleContainer}>
        <FontAwesome name="credit-card" size={24} color="#333" />
        <Text style={styles.subtitle}>Card Number</Text>
      </View>
      <TextInput style={styles.input} placeholder="Enter card number" />

      <View style={styles.subtitleContainer}>
        <Entypo name="calendar" size={24} color="#333" />
        <Text style={styles.subtitle}>Expiry Date</Text>
      </View>
      <TextInput style={styles.input} placeholder="MM/YYYY" />

      <View style={styles.subtitleContainer}>
        <FontAwesome name="barcode" size={24} color="#333" />
        <Text style={styles.subtitle}>Code</Text>
      </View>
      <TextInput style={styles.input} placeholder="CVV" />

      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={checked}
          onValueChange={setChecked}
        />
        <Text style={styles.checkboxLabel}>
          Do you want to save your bank card details?</Text>
          </View>

<Text style={styles.amountText}>Amount: 1400 euros</Text>

<TouchableOpacity style={styles.payButton} onPress={handlePayPress}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/bendy-dotted-line_2.jpg')}
        style={styles.mapImage}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 70,
    backgroundColor: "#E6E1F1",
    flex: 1,
    position: "relative",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,

},
subtitle: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  marginBottom: 5,
},
subtitleIcon: {
    marginRight: 4,
  },
  fontAwesomeIcon: {
color : "#EDB8FE",

},
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  Checkbox: {
    borderWidth: 50,
    borderColor: "#3972D9",
    borderRadius: 100,
    backgroundColor: "#BA99FE",
  },
  checkbox: {
    marginLeft: 8,
    padding : 10
  },
 
  amountText: {
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10, 
    padding : 5,
    color : "#3972D9",
    backgroundColor : "#E6E1F1"
  },
  payButton: {
    backgroundColor: "#856DB7",
    borderRadius: 5,
    paddingVertical: 15,
    marginTop: 10,
   
  },
  payButtonText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",

  },
  mapImage: {
    width: '190%', 
    height: 100,   
    resizeMode: 'contain', 
    marginTop: 5, 
    marginLeft: -80,

  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
 
  },
  customText: {
    fontFamily: 'KronaOne-Regular',
    fontSize: 24,
  }
});

export default PaymentScreen;
