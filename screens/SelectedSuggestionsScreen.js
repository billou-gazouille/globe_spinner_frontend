import React from "react";

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
// import BackButton from "../components/BackButton";
import { CustomText } from "../components/CustomText";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import GradientFontColor from "../components/GradientFontColor";

const colors = {
  black: "#515151",
  pink: "#EDB8FE",
  purple: "#BA99FE",
  blue: "#3972D9",
};

export default function SelectedSuggestionsScreen({ navigation, route }) {
  const trip = route.params.trip;
  const outboundJourneyType = trip.outboundJourney.type;
  const inboundJourneyType = trip.inboundJourney.type;

  const iconMapping = {
    Train: "train",
    Airplane: "plane",
    Coach: "bus",
  };
  const iconOutbound = iconMapping[outboundJourneyType] || "defaultIconName";
  const iconInbound = iconMapping[inboundJourneyType] || "defaultIconName";
  const formattedDate = (date) => {
    return moment(date).format("DD MMM, HH:mm");
  };

  // console.log("trip", trip);

  const activities = trip.activities.map((e, i) => {
    return (
      <View key={i} style={styles.activity}>
        <CustomText style={styles.activityName}>
          {e.activityBase.name.replace(/\d/g, "")} {"\n"}
          {moment(e.startTime).format("DD MMM")}
        </CustomText>
        <View
          style={[
            styles.activityContent,
            i === trip.activities.length - 1
              ? styles.lastActivityContent
              : null,
          ]}
        >
          <CustomText>
            <FontAwesome name="clock-o" size={25} color={colors.black} />
            {"  "}
            {moment(e.startTime).format("HH:mm")} to{" "}
            {moment(e.endTime).format("HH:mm")}
          </CustomText>
          <CustomText style={{ marginVertical: 10 }}>
            <FontAwesome name="money" size={25} color={colors.black} />
            {"  "}
            {e.price} €
          </CustomText>
          <CustomText>
            <FontAwesome name="map-marker" size={30} color={colors.black} />
            {/* {location} */}
          </CustomText>
        </View>
      </View>
    );
  });

  // payment
  const handleContinueToPaymentPress = () => {
    navigation.navigate("Payment");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/noImage.jpg")}
        style={styles.cityImg}
      ></Image>

      <View style={styles.headingAndSectionPair}>
        <GradientFontColor style={styles.text}>Accommodation</GradientFontColor>
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
        <GradientFontColor style={styles.text}>Transports</GradientFontColor>
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

      <GradientFontColor style={[styles.text, { marginTop: 50 }]}>
        Activities
      </GradientFontColor>
      <View style={styles.activitiesContainer}>{activities}</View>
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
    fontWeight: "bold",
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
    backgroundColor: "#ECECEC",
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
    backgroundColor: colors.blue,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    margin: 50,
  },
  continueToPaymentButtonText: {
    textTransform: "uppercase",
    color: "white",
    fontSize: 16,
    // fontWeight: "bold",
    letterSpacing: 1,
  },
  // ---- ACTIVITIES -----
  activitiesContainer: {
    backgroundColor: "#ECECEC",
    borderRadius: 25,
    minWidth: "90%",
    shadowColor: colors.black,
    elevation: 10,
    marginTop: 10,
  },
  activity: {
    paddingTop: 15,
    paddingHorizontal: 25,
    // display: "block",
  },
  lastActivityContent: {
    borderBottomWidth: 0,
    // paddingVertical: 15,
  },
  activityContent: {
    // marginTop: 10,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderStyle: "dashed",
    borderBottomColor: colors.purple,
  },
  activityName: {
    lineHeight: 28,
    fontWeight: "bold",
  },
});
