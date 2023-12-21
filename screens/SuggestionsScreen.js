import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
// import BackButton from "../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import SuggestionCard from "../components/SuggestionCard";
import { CustomText } from "../components/CustomText";
import LoadingWheel from "../components/LoadingWheel";
import useFetchGenerate from "../hooks/useFetchGenerate";

const { ipAddress, port } = require("../myVariables");

export default function SuggestionsScreen({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [bookmarked, setBookmarked] = useState([false, false]);
  const userInfo = useSelector((state) => state.userInfo.value);
  const filtersFromStore = useSelector((state) => state.filters.value);

  //console.log("userInfo:", filtersFromStore);

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

  const [triggerFetchGenerate, setTriggerFetchGenerate] = useState(false);

  const {
    generatedTrips,
    isLoadingGenerate,
    errorGenerate,
    place1,
    isLoadingPlace1,
    errorPlace1,
    place2,
    isLoadingPlace2,
    errorPlace2,
  } = useFetchGenerate({
    generateRouteURL: `http://${ipAddress}:${port}/trips/generate`,
    generateFilters: filtersFromStore,
    triggerFirstFetch: triggerFetchGenerate,
  });

  //console.log(generatedTrips);

  const regenerateAll = () => {
    //console.log('regenerateAll');
    setTriggerFetchGenerate((prev) => !prev);
  };

  const handlePressRegenerateAll = () => {
    // console.log("handlePressRegenerateAll");
    regenerateAll();
  };

  const getImage = (index) => {
    let place;
    if (index === 0) place = place1;
    else if (index === 1) place = place2;
    if (!place) return require("../assets/default_city.jpg");
    return { uri: place.photos[0].src.landscape };
  };

  const selectTrip = (tripIndex) => {
    navigation.navigate("SelectedSuggestionsHomeStack", {
      trip: generatedTrips[tripIndex],
      img: getImage(tripIndex),
      tripIndex: tripIndex,
      toggleBookmarkTrip: toggleBookmarkTrip,
      isBookmarked: bookmarked[tripIndex],
    });
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

  const preventRegenerate =
    isLoadingGenerate || isLoadingPlace1 || isLoadingPlace2;
  const rgBtnColor = preventRegenerate ? "#C2C2C2" : "#3972D9";

  return (
    <View style={styles.container}>
      {isLoadingGenerate && <LoadingWheel />}
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
        disabled={preventRegenerate}
        style={{ ...styles.regenerateAllButton, backgroundColor: rgBtnColor }}
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
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
  },
  regenerateAllText: {
    fontSize: 16,
    color: "white",
  },
});
