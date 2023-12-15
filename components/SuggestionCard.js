import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { CustomText } from "./CustomText";

export default function SuggestionCard({
    cityName, 
    activities, 
    img, 
    leaveDate, 
    returnDate, 
    price, 
    leaveTransportType, 
    returnTransportType,  
    accommodationType, 
}) {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.cityImgContainer}>
                <CustomText style={{...styles.cityTitle, color: '#ffffff', width:'100%', textAlign: 'center'}}>{cityName}</CustomText>
                <Image source={img} style={styles.cityImg}></Image>
            </View>
            <View style={styles.infosContainer}>                
                <View style={styles.activitiesContainer}>
                    {activities.map((a,i) => <CustomText key={i} style={styles.text}>-{a}</CustomText>)}
                </View>
                <View style={styles.accommodationContainer}>
                    <CustomText>{accommodationType}</CustomText>
                </View>
                <View style={styles.transportsContainer}>
                    <CustomText>{leaveDate}-{returnDate}</CustomText>
                    <CustomText>{leaveTransportType}-{returnTransportType}</CustomText>
                    {/* <CustomText>{price}€</CustomText> */}
                </View>
            </View>
        </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 200,
        // borderWidth: 1,
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
        borderRadius: 25,
        shadowColor: 'black',
        elevation: 5,
        backgroundColor: 'white',
    },
    nunitoText: {
        fontFamily: 'NunitoSans_400Regular',
    },
    cityTitle: {
        fontSize: 24,
        // backgroundColor: 'red',
        position: 'absolute',
        zIndex: 1,
        color: 'black',
    },
    cityImgContainer: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // backgroundColor: 'green',
    },
    cityImg: {
        width: '100%',
        height: '100%',
        //resizeMode: 'contain',
        resizeMode: 'stretch',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    infosContainer: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    activitiesContainer: {
        // width: '50%',
        // width: '33%',
        justifyContent: 'center',
        alignItems: 'left',
    },
    text: {
        fontSize: 12,
    },
    accommodationContainer:{
        // width: '50%',
        // width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    transportsContainer:{
        // width: '50%',
        // width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
