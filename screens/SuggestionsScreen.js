import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";

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
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => handleSubmit()}>
        <Text style={styles.text}>
          Suggestion Screen : click me to go to selected suggestions
        </Text>
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
  text: {
    fontSize: 28,
  },
});
