import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import SuggestionCard from "../components/SuggestionCard";
import { CustomText } from "../components/CustomText";

export default function SuggestionsScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("SelectedSuggestions");
  };

  //on importe les filtres depuis le store de Redux
  //on fetch les [trips] avec les filtres dans un useEffect pour re render la page suggestion
  //on map sur les [trips] afin d'afficher le contenu des 2 [trips] qui correspondent aux filtres

  //Recupération des filtered [trips] depuis le store de Redux avec useSelector
  //const tripSuggestions = trips[0].map((data, i) => {
  //   return (
  //    <TripContainer  key{i} {...data} />
  //   )
  // })

  const [trips, setTrips] = useState([null, null]);

  const handlePressRegenerateAll = async () => {
    console.log('handlePressRegenerateAll');
    const data = await fetch("http://192.168.43.25:3000/trips/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ /* Mettre ici les filtres */ }),
    }).then((resp) => resp.json());
    console.log(data);
    if (data.result) {
      console.log('noice');
      // setTrips(...)
    }
    setTrips([{trip0: 'TRIP 0'}, {trip1: 'TRIP 1'}]);
  };

  console.log(trips);

  const selectTrip = (tripIndex) => {
    console.log('tripIndex: ', tripIndex);
    navigation.navigate('SelectedSuggestions', { 
      screen: 'SelectedSuggestions',  
      params: { trip: trips[tripIndex] }
    }
    );
  };

  return (
    <View style={styles.container}>
      <CustomText style={styles.suggestionsText}>Suggestions</CustomText>
      <View style={styles.cardsContainer}>
        <SuggestionCard 
          tripIndex={0} 
          cityName='AMSTERDAM' 
          accommodationType='Hotel' 
          leaveTransportType='Train' 
          returnTransportType='Airplane' 
          activities={['Visit Rijsk Museum', 'Red Light District', 'Cycle along the canals']}
          img={require('../assets/noImage.jpg')} 
          leaveDate='16 Feb' 
          returnDate='29 Feb' 
          price={1400} 
          selectTrip={selectTrip}
        />
        <SuggestionCard 
          tripIndex={1} 
          cityName='LONDON' 
          accommodationType='airBnB' 
          leaveTransportType='Coach' 
          returnTransportType='Train' 
          activities={['Tour of Greenwich', 'Madam Tussauds', 'Camden Town']}
          img={require('../assets/noImage.jpg')}
          leaveDate='15 Feb' 
          returnDate='28 Feb' 
          price={1200} 
          selectTrip={selectTrip} 
        />
      </View>
      <TouchableOpacity 
        style={styles.regenerateAllButton} 
        onPress={handlePressRegenerateAll} 
      >
        <CustomText style={styles.regenerateAllText}>REGENERATE ALL</CustomText>
      </TouchableOpacity>
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nunitoText: {
    fontFamily: 'NunitoSans_400Regular',
  },
  cardsContainer: {
    width: '100%',
    // height: '60%',
    justifyContent: "space-between",
    alignItems: "center",
    //  borderWidth: 1,
  },
  suggestionsText: {
    fontSize: 28,
    marginBottom: 20,
  },
  regenerateAllButton: {
    width: '50%',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#3972D9',
    borderRadius: 25,
    marginTop: 20,
  },
  regenerateAllText: {
    fontSize: 16,
    color: 'white',
  },
});
