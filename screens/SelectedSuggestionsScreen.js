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
import BackButton from "../components/BackButton";
import { CustomText } from "../components/CustomText";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SelectedSuggestionsScreen({ navigation, route }) {
  const trip = route.params.trip;

  // payment
  const handleContinueToPaymentPress = () => {
    navigation.navigate("PaymentScreen");
  };
  console.log("############################");
  console.log(trip);

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
              <FontAwesome name="clock-o" size={25} color="black" />
              <CustomText style={{ marginLeft: 10, fontSize: 18 }}>
                {timeStart} to {timeEnd}
              </CustomText>
            </View>
            <View style={{ marginTop: 20, flexDirection: "row" }}>
              <FontAwesome name="money" size={25} color="black" />
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
            <FontAwesome name="map-marker" size={30} color="black" />
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
            Hostel Espresso City Center
          </CustomText>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <View style={{ marginTop: 15, flexDirection: "row" }}>
                <FontAwesome name="users" size={25} color="black" />
                <CustomText style={{ marginLeft: 10, fontSize: 18 }}>
                  3
                </CustomText>
              </View>
              <View style={{ marginTop: 20, flexDirection: "row" }}>
                <FontAwesome name="clock-o" size={25} color="black" />
                <CustomText style={{ marginLeft: 10, fontSize: 18 }}>
                  4 nights
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
              <FontAwesome name="map-marker" size={30} color="black" />
              <View>
                <CustomText style={{ marginLeft: 10, fontSize: 14 }}>
                  Overtoom 57, 1054 HC
                </CustomText>
                <CustomText style={{ marginLeft: 10, fontSize: 14 }}>
                  Amsterdam, Netherlands
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
              LYS <CustomText>&#8594;</CustomText> AMS
            </CustomText>
            <FontAwesome name="train" size={25} color="black" />
            <View style={{ marginTop: 10 }}>
              <CustomText style={{ fontSize: 14 }}>
                Dep: 16 Feb, 10:30
              </CustomText>
              <CustomText style={{ fontSize: 14 }}>
                Arr: 16 Feb, 14:50
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
              AMS <CustomText>&#8594;</CustomText> LYS
            </CustomText>
            <FontAwesome name="plane" size={25} color="black" />
            <View style={{ marginTop: 10 }}>
              <CustomText style={{ fontSize: 14 }}>
                Dep: 29 Feb, 18:40
              </CustomText>
              <CustomText style={{ fontSize: 14 }}>
                Arr: 29 Feb, 20:50
              </CustomText>
            </View>
          </View>
        </View>
      </View>

      <View style={{... styles.headingAndSectionPair, height: activities.length*150+50}}>
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

      {/* <Text style={styles.text}>Selected Suggestions Screen</Text> */}
      {/* <CustomText style={styles.text}>{trip}</CustomText> */}
      <BackButton navigation={navigation} />

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
    flex: 1,
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
    shadowColor: "black",
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
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  continueToPaymentButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
