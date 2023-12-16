import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecapScreen = () => {
  const destination = 'London'; 
  const accommodation = 'Hotel ABC'; 
  const transport = 'Flight XYZ'; 
  const activities = 'Picnic Basket, Spa Kit,Rain Poncho'; 
  const amountPaid = 1400; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RECAP TRIP</Text>

      <Text style={styles.subtitle}>Where to</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{destination}</Text>
      </View>

      <Text style={styles.subtitle}>Accommodation</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{accommodation}</Text>
      </View>

      <Text style={styles.subtitle}>Transport</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{transport}</Text>
      </View>

      <Text style={styles.subtitle}>Activities</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{activities}</Text>
      </View>

      <Text style={styles.subtitle}>Amount Paid:</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{amountPaid} euros</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 110,
    backgroundColor: '#D8D0E7',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    flex:1,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom:50,
  },
  info: {
    fontSize: 16,
  },
});

export default RecapScreen;


