import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
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

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.text}>
          Suggestion Screen : click me to go to selected suggestions
        </Text>
      </TouchableOpacity> */}
      <CustomText style={styles.suggestionsText}>Suggestions</CustomText>
      <View style={styles.cardsContainer}>
        <SuggestionCard 
          cityName='AMSTERDAM' 
          accommodationType='Hotel' 
          leaveTransportType='Train' 
          returnTransportType='Airplane' 
          activities={['Visit Rijsk Museum', 'Red Light District', 'Cycle along the canals']}
          img={require('../assets/noImage.jpg')} 
          leaveDate='16 Feb' 
          returnDate='29 Feb' 
          price={1400} 
        />
        <SuggestionCard 
          cityName='LONDON' 
          accommodationType='airBnB' 
          leaveTransportType='Coach' 
          returnTransportType='Train' 
          activities={['Tour of Greenwich', 'Madam Tussauds', 'Camden Town']}
          img={require('../assets/noImage.jpg')}
          leaveDate='15 Feb' 
          returnDate='28 Feb' 
          price={1200} 
        />
      </View>
      <TouchableOpacity style={styles.regenerateAllButton}>
        <CustomText style={styles.regenerateAllText}>REGENERATE ALL</CustomText>
      </TouchableOpacity>
      <BackButton navigation={navigation} />
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
    width: '90%',
    height: '60%',
    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
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
