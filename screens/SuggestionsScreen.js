import React, { useEffect, useState } from "react";
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
  const [trips, setTrips] = useState([null, null]);
  const [bookmarked, setBookmarked] = useState([false, false]);

  const handleSubmit = () => {
    navigation.navigate("SelectedSuggestions");
  };

  const userInfo = useSelector((state) => state.userInfo.value);

  const toggleBookmarkTrip = async (tripIndex) => {
    //console.log("bookmared trip with index" + tripIndex);
    //console.log(userInfo);

    if (userInfo.isConnected) {
      const copy = [...bookmarked];
      copy[tripIndex] = !copy[tripIndex];
      setBookmarked(copy);
    }
    const url = `http://10.0.2.210:3000/users/${userInfo.token}/saveTrip/${tripIndex}`;
    console.log(url);
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((resp) => resp.json());

    console.log("fetch response: ", data.savedTrip);
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

  const regenerateAll = async () => {
    console.log("regenerateAll");
    const filters = {
      budget: 10000,
      nbrOfTravelers: 1,
      departureMinOutbound: "2023-12-18",
      departureMaxOutbound: "2023-12-22",
      departureMinInbound: "2023-12-25",
      departureMaxInbound: "2023-12-29",
      types: ["Airplane", "Coach", "Train"],
    };
    const generatedTtrips = await fetch(
      //DON'T FORGET TO CHANGE YOUR IP ADRESS
      "http://10.0.2.210:8081/trips/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      }
    ).then((resp) => resp.json());
    console.log(generatedTtrips[0]);
    if (generatedTtrips.length > 0) {
      setTrips(generatedTtrips);
    }
    setReceivedImageURLs(false);
  };

  useEffect(() => {
    regenerateAll().then();
  }, []);

  const handlePressRegenerateAll = async () => {
    console.log("handlePressRegenerateAll");
    regenerateAll();
  };

  //console.log(trips);

  const selectTrip = (tripIndex) => {
    console.log("tripIndex: ", tripIndex);
    // navigation.navigate('SelectedSuggestions', {
    //   screen: 'SelectedSuggestions',
    //   params: { trip: trips[tripIndex] }
    // }
    navigation.navigate("SelectedSuggestions", { trip: trips[tripIndex] });
    //navigation.navigate('SelectedSuggestions', { hello: 'hello' });
  };

  const formattedDate = (stringDate) => {
    const date = new Date(stringDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Note: Months are zero-based, so we add 1
    // Format the result as "dd/mm"
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}`;
  };

  const [imageURLs, setImageURLs] = useState(["", ""]);
  const [receivedImageURLs, setReceivedImageURLs] = useState(false);

  const getPlaceImageURL = async (index, placeName) => {
    console.log(placeName);
    const data = await fetch(
      `https://api.pexels.com/v1/search?query=${placeName}+aerial`,
      {
        headers: {
          Authorization:
            "5t6cWcJQKyLgJsDtnmjZX8fLomdIIvsa46xUgeXPcL5AZMAK4r2GODOm",
        },
      }
    ).then((resp) => resp.json());
    //console.log(data);
    const imageURL = data.photos[0].src.landscape;
    const copy = [...imageURLs];
    //console.log(copy);
    copy[index] = imageURL;
    setImageURLs(copy);
    setReceivedImageURLs(true);
    //return imageURL;
  };

  if (trips[0] !== null && trips[1] !== null) {
    trips.forEach((t, i) => {
      if (!receivedImageURLs) getPlaceImageURL(i, t.destination.name);
    });
  }

  return (
    <View style={styles.container}>
      <CustomText style={styles.suggestionsText}>Suggestions</CustomText>
      <View style={styles.cardsContainer}>
        {trips[0] !== null &&
          trips[1] !== null &&
          trips.map((t, i) => (
            <SuggestionCard
              key={i}
              tripIndex={i}
              cityName={t.destination.name}
              accommodationType={t.accommodation.accommodationBase.type}
              leaveTransportType={t.outboundJourney.type}
              returnTransportType={t.inboundJourney.type}
              activities={t.activities.map((a) => a.activityBase.name)}
              //img={require("../assets/noImage.jpg")}
              //img={{uri: getPlaceImageURL(t.destination.name)}}
              img={{ uri: imageURLs[i] }}
              //img={{uri: getPlaceImageURL(i, t.destination.name)}}
              leaveDate={formattedDate(t.outboundJourney.departure)}
              returnDate={formattedDate(t.inboundJourney.arrival)}
              price={1400}
              selectTrip={selectTrip}
              toggleBookmarkTrip={toggleBookmarkTrip}
              isBookmarked={bookmarked[i]}
            />
          ))}
        {/* <SuggestionCard
          tripIndex={0}
          cityName="AMSTERDAM"
          accommodationType="Hotel"
          leaveTransportType="Train"
          returnTransportType="Airplane"
          activities={[
            "Visit Rijsk Museum",
            "Red Light District",
            "Cycle along the canals",
          ]}
          img={require("../assets/noImage.jpg")}
          leaveDate="16 Feb"
          returnDate="29 Feb"
          price={1400}
          selectTrip={selectTrip}
          toggleBookmarkTrip={toggleBookmarkTrip}
          isBookmarked={bookmarked[0]}
        />

        <SuggestionCard
          tripIndex={1}
          cityName="LONDON"
          accommodationType="airBnB"
          leaveTransportType="Coach"
          returnTransportType="Train"
          activities={["Tour of Greenwich", "Madam Tussauds", "Camden Town"]}
          img={require("../assets/noImage.jpg")}
          leaveDate="15 Feb"
          returnDate="28 Feb"
          price={1200}
          selectTrip={selectTrip}
          toggleBookmarkTrip={toggleBookmarkTrip}
          isBookmarked={bookmarked[1]}
        /> */}
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
    fontFamily: "NunitoSans_400Regular",
  },
  cardsContainer: {
    width: "100%",
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
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3972D9",
    borderRadius: 25,
    marginTop: 20,
  },
  regenerateAllText: {
    fontSize: 16,
    color: "white",
  },
});
