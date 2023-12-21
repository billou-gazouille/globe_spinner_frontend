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
import LoadingWheel from "../components/LoadingWheel";
import useFetchSequence from "../hooks/useFetchSequence";

const imagesAPIprefix = 'https://api.pexels.com/v1/search?query=';
const imageAPIoptions = {
  headers: {
    Authorization:
      "5t6cWcJQKyLgJsDtnmjZX8fLomdIIvsa46xUgeXPcL5AZMAK4r2GODOm",
  },
};

const { ipAddress, port } = require("../myVariables");

export default function SuggestionsScreen({ navigation }) {
  const [bookmarked, setBookmarked] = useState([false, false]);

  const [triggerFetchSequence, setTriggerFetchSequence] = useState(false);

  const [filters, setFilters] = useState({
    lat: 49,
    lon: 2,
    budget: 10000,
    nbrOfTravelers: 1,
    departureMinOutbound: "2023-12-18",
    departureMaxOutbound: "2023-12-22",
    departureMinInbound: "2023-12-25",
    departureMaxInbound: "2023-12-29",
    types: ["Airplane", "Coach", "Train"],
  });

  const fetchGenerate = {
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    },
    getNextURL: (requestsProgress) => `${imagesAPIprefix}${requestsProgress[0].data[0].destination.name}+aerial` 
  };

  const fetchPlace1 = {
    options: imageAPIoptions,
    getNextURL: (requestsProgress) => `${imagesAPIprefix}${requestsProgress[0].data[1].destination.name}+aerial` 
  };

  const fetchPlace2 = {
    options: imageAPIoptions
  };

  const requestsSequence = [fetchGenerate, fetchPlace1, fetchPlace2];

  const [
      requestGenerateProgress,
      requestPlace1Progress,
      requestPlace2Progress,
    ] = useFetchSequence({
    firstURL: `http://${ipAddress}:${port}/trips/generate`,
    triggerFirstFetch: triggerFetchSequence,
    requestsSequence: requestsSequence
  });

  console.log('requestGenerateProgress: ', requestGenerateProgress);

  // console.log('requestGenerateProgress.isLoading: ', requestGenerateProgress.isLoading);
  // console.log('requestPlace1Progress.isLoading: ', requestPlace1Progress.isLoading);
  // console.log('requestPlace2Progress.isLoading: ', requestPlace2Progress.isLoading);


  const userInfo = useSelector((state) => state.userInfo.value);

  const toggleBookmarkTrip = async (tripIndex) => {
    if (userInfo.isConnected) {
      const copy = [...bookmarked];
      copy[tripIndex] = !copy[tripIndex];
      setBookmarked(copy);
    }
    const url = `http://${ipAddress}:${port}/users/${userInfo.token}/saveTrip/${tripIndex}`;
    // console.log(url);
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((resp) => resp.json());

    // console.log("fetch response: ", data.savedTrip);
  };

  const regenerateAll = async () => {
    // console.log("regenerateAll");
    setTriggerFetchSequence(prev => !prev);
  };

  const handlePressRegenerateAll = () => {
    // console.log("handlePressRegenerateAll");
    regenerateAll();
  };


  const selectTrip = (tripIndex) => {
    console.log("tripIndex: ", tripIndex);
    navigation.navigate("SelectedSuggestions", { trip: trips[tripIndex] });
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

  const getImage = (index) => {
    let requestPlaceProgress;
    if (index === 0) requestPlaceProgress = requestPlace1Progress;    // place 1
    else if (index === 1) requestPlaceProgress = requestPlace2Progress; // place 2
    if (!requestPlaceProgress.data) return require("../assets/noImage.jpg");
    return ({ uri: requestPlaceProgress.data.photos[0].src.landscape});
  }

  const generatedTrips = requestGenerateProgress.data;

  return (
    <View style={styles.container}>
      {requestGenerateProgress.isLoading && <LoadingWheel />}
      <CustomText style={styles.suggestionsText}>Suggestions</CustomText>
      <View style={styles.cardsContainer}>
        {generatedTrips &&
          generatedTrips.map((t, i) => {
            const actvitiesMax3 =
              t.activities.length <= 3
                ? t.activities
                : t.activities.slice(0, 3);
            return (
              <SuggestionCard
                key={i}
                tripIndex={i}
                cityName={t.destination.name}
                accommodationType={t.accommodation.accommodationBase.type}
                leaveTransportType={t.outboundJourney.type}
                returnTransportType={t.inboundJourney.type}
                activities={actvitiesMax3.map((a) => a.activityBase.name)}
                img={getImage(i)}
                leaveDate={formattedDate(t.outboundJourney.departure)}
                returnDate={formattedDate(t.inboundJourney.arrival)}
                price={1400}
                selectTrip={selectTrip}
                toggleBookmarkTrip={toggleBookmarkTrip}
                isBookmarked={bookmarked[i]}
              />
            );
          })}
      </View>
      <TouchableOpacity
        style={styles.regenerateAllButton}
        onPress={handlePressRegenerateAll}
      >
        <CustomText style={styles.regenerateAllText}>REGENERATE ALL</CustomText>
      </TouchableOpacity>
      {/* <BackButton /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
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
    // borderWidth: 1,
  },
  suggestionsText: {
    fontSize: 28,
    marginBottom: 10,
    marginTop: 20,
  },
  regenerateAllButton: {
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3972D9",
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  regenerateAllText: {
    fontSize: 16,
    color: "white",
  },
});
