import React from "react";

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import BackButton from "../components/BackButton";
import { CustomText } from "../components/CustomText";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";

const colors = {
  black: "#515151",
};

export default function SelectedSuggestionsScreen({ navigation, route }) {
  const trip = route.params.trip;
  const outboundJourneyType = trip.outboundJourney.type;
  const inboundJourneyType = trip.inboundJourney.type;

  const iconMapping = {
    Train: "train",
    Airplane: "airplane",
    Coach: "bus",
  };
  const iconOutbound = iconMapping[outboundJourneyType] || "defaultIconName";
  const iconInbound = iconMapping[inboundJourneyType] || "defaultIconName";
  const formattedDate = (date) => {
    return moment(date).format("DD MMM, HH:mm");
  };

  // console.log("trip", trip);

  // payment coucou
  const handleContinueToPaymentPress = () => {
    navigation.navigate("Payment");
  };

  const activity = (name, date, timeStart, timeEnd, price, location) => {
    return (
      <View
        style={{ height: 150, borderBottomWidth: 1, borderStyle: "dashed" }}
      >
        <CustomText style={styles.accommodationName}>
          {name} - {date}
        </CustomText>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, marginLeft: 20 }}>
            <View style={{ marginTop: 15, flexDirection: "row" }}>
              <FontAwesome name="clock-o" size={25} color={colors.black} />
              <CustomText style={{ marginLeft: 10, fontSize: 18 }}>
                {timeStart} to {timeEnd}
              </CustomText>
            </View>
            <View style={{ marginTop: 20, flexDirection: "row" }}>
              <FontAwesome name="money" size={25} color={colors.black} />
              <CustomText style={{ marginLeft: 10, fontSize: 18 }}>
                {price}€
              </CustomText>
            </View>
          </View>
          <View
            style={{
              width: "60%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <FontAwesome name="map-marker" size={30} color={colors.black} />
            <View>
              <CustomText style={{ marginLeft: 10, fontSize: 14 }}>
                {location}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const activities = [
    activity(
      "Amsterdam Museum",
      "1 Mar",
      "14h00",
      "17h00",
      25,
      "Amstel 51, 1018 DR"
    ),
    activity("Some concert", "2 Mar", "10h00", "12h00", 20, "512 Canal Street"),
    activity(
      "Greenshouse effect coffeeshop",
      "3 Mar",
      "15h00",
      "17h00",
      18,
      "Nieuwmarkt 14, 1012 CR"
    ),
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/noImage.jpg")}
        style={styles.cityImg}
      ></Image>

      <View style={styles.headingAndSectionPair}>
        <CustomText style={styles.text}>Accommodation</CustomText>
        <View style={styles.sectionContainer}>
          <CustomText style={styles.accommodationName}>
            {trip.accommodation.accommodationBase.name}
          </CustomText>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <View style={{ marginTop: 15, flexDirection: "row" }}>
                <FontAwesome name="users" size={25} color={colors.black} />
                <CustomText style={{ marginLeft: 10, fontSize: 18 }}>
                  {trip.numberOfTravelers}
                </CustomText>
              </View>
              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <FontAwesome name="clock-o" size={25} color={colors.black} />
                <CustomText style={{ marginLeft: 10, fontSize: 18 }}>
                  {trip.nbrOfNights} nights
                </CustomText>
              </View>
            </View>
            <View
              style={{
                width: "60%",
                height: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <FontAwesome name="map-marker" size={30} color={colors.black} />
              <View>
                <CustomText style={{ marginLeft: 10, fontSize: 14 }}>
                  {trip.accommodation.accommodationBase.address}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.headingAndSectionPair}>
        <CustomText style={styles.text}>Transports</CustomText>
        <View
          style={{
            ...styles.sectionContainer,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "50%",
              borderRightWidth: 1,
              borderStyle: "dashed",
              alignItems: "center",
            }}
          >
            <CustomText
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Outbound
            </CustomText>
            <CustomText style={{ fontSize: 16 }}>
              {trip.departureLocation.name.substring(0, 3).toUpperCase()}{" "}
              <CustomText>&#8594;</CustomText>{" "}
              {trip.destination.name.substring(0, 3).toUpperCase()}
            </CustomText>
            <FontAwesome name={iconOutbound} size={25} color={colors.black} />
            <View style={{ marginTop: 10 }}>
              <CustomText style={{ fontSize: 14 }}>
                Dep: {formattedDate(trip.outboundJourney.departure)}
              </CustomText>
              <CustomText style={{ fontSize: 14 }}>
                Arr: {formattedDate(trip.outboundJourney.arrival)}
              </CustomText>
            </View>
          </View>
          <View style={{ width: "50%", alignItems: "center" }}>
            <CustomText
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Inbound
            </CustomText>
            <CustomText style={{ fontSize: 16 }}>
              {trip.destination.name.substring(0, 3).toUpperCase()}
              <CustomText>&#8594;</CustomText>{" "}
              {trip.departureLocation.name.substring(0, 3).toUpperCase()}
            </CustomText>
            <FontAwesome name={iconInbound} size={25} color={colors.black} />
            <View style={{ marginTop: 10 }}>
              <CustomText style={{ fontSize: 14 }}>
                Dep: {formattedDate(trip.inboundJourney.departure)}
              </CustomText>
              <CustomText style={{ fontSize: 14 }}>
                Arr: {formattedDate(trip.inboundJourney.arrival)}
              </CustomText>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          ...styles.headingAndSectionPair,
          height: activities.length * 150 + 50,
        }}
      >
        <CustomText style={styles.text}>Activities</CustomText>
        <View
          style={{
            ...styles.sectionContainer,
            height: activities.length * 150,
          }}
        >
          {activities}
        </View>
      </View>
      {/* <BackButton navigation={navigation} /> */}

      <TouchableOpacity
        style={styles.continueToPaymentButton}
        onPress={handleContinueToPaymentPress}
      >
        <Text style={styles.continueToPaymentButtonText}>
          Continue to Payment
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    // flex: 1,
    // height: '500%',
    //flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
  },
  cityImg: {
    width: "100%",
    height: 150,
  },
  sectionContainer: {
    width: "95%",
    height: 150,
    marginTop: 10,
    // color: '#ECECEC',
    shadowColor: colors.black,
    elevation: 10,
    backgroundColor: "#DCDCDC",
    borderRadius: 25,
  },
  headingAndSectionPair: {
    width: "100%",
    height: 200,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  accommodationName: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  continueToPaymentButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 50,
  },
  continueToPaymentButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
