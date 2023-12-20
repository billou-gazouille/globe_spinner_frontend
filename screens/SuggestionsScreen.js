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

const { ipAddress, port } = require("../myVariables");

export default function SuggestionsScreen({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [bookmarked, setBookmarked] = useState([false, false]);

  const handleSubmit = () => {
    navigation.navigate("SelectedSuggestionsHomeStack");
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
    const url = `http://${ipAddress}:${port}/users/${userInfo.token}/saveTrip/${tripIndex}`;
    // console.log(url);
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((resp) => resp.json());

    // console.log("fetch response: ", data.savedTrip);
  };

  const [imageURLs, setImageURLs] = useState(["", ""]);

  const regenerateAll = async () => {
    // console.log("regenerateAll");
    setTrips([]);
    const filters = {
      lat: 49,
      lon: 2,
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
      `http://${ipAddress}:${port}/trips/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      }
    ).then((resp) => resp.json());
    // console.log(generatedTtrips);
    if (generatedTtrips.length > 0) {
      setTrips(generatedTtrips);
      setImageURLs(["", ""]);
      for (let i = 0; i < generatedTtrips.length; i++) {
        getPlaceImageURL(i, generatedTtrips[i].destination.name);
      }
    }
  };

  useEffect(() => {
    // console.log('useEffect');
    regenerateAll().then();
  }, []);

  const handlePressRegenerateAll = async () => {
    // console.log("handlePressRegenerateAll");
    regenerateAll().then();
  };

  //console.log(trips);

  const selectTrip = (tripIndex) => {
    console.log("tripIndex: ", tripIndex);
    navigation.navigate("SelectedSuggestionsHomeStack", {
      trip: trips[tripIndex],
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

  const getPlaceImageURL = async (index, placeName) => {
    // console.log(placeName);
    const data = await fetch(
      `https://api.pexels.com/v1/search?query=${placeName}+aerial`,
      {
        headers: {
          Authorization:
            "5t6cWcJQKyLgJsDtnmjZX8fLomdIIvsa46xUgeXPcL5AZMAK4r2GODOm",
        },
      }
    ).then((resp) => resp.json());
    // console.log(data);
    const imageURL = data.photos[0].src.landscape;
    const copy = [...imageURLs];
    copy[index] = imageURL;
    setImageURLs(copy);
    //return imageURL;
  };

  return (
    <View style={styles.container}>
      {trips.length !== 2 && <LoadingWheel />}
      <CustomText style={styles.suggestionsText}>Suggestions</CustomText>
      <View style={styles.cardsContainer}>
        {trips.length === 2 &&
          trips.map((t, i) => {
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
                activities={actvitiesMax3.map((a) =>
                  a.activityBase.name.replace(/\d/g, "")
                )}
                img={
                  imageURLs[i]
                    ? { uri: imageURLs[i] }
                    : require("../assets/noImage.jpg")
                }
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