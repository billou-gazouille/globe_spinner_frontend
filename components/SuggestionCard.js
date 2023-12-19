import React from "react";
import { View, StyleSheet, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import { CustomText } from "./CustomText";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function SuggestionCard({
    tripIndex,
    cityName, 
    activities, 
    img, 
    leaveDate, 
    returnDate, 
    price, 
    leaveTransportType, 
    returnTransportType,  
    accommodationType, 
    selectTrip, 
    toggleBookmarkTrip,
    isBookmarked,
}) {

    handleBookmarkPress = () => {
        toggleBookmarkTrip(tripIndex);
    };

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => selectTrip(tripIndex)} 
        >
            <View style={styles.cityImgContainer}>
                <FontAwesome 
                    style={styles.bookmark}
                    name='bookmark' 
                    size={50} 
                    color={isBookmarked ? '#EDB8FE' : 'black'}
                    onPress={handleBookmarkPress}
                />
                <CustomText style={{...styles.cityTitle, color: '#ffffff', width:'100%', textAlign: 'center'}}>{cityName}</CustomText>
                <Image source={img} style={styles.cityImg}></Image>
                {/* <ImageBackground source={img} style={{width: 200,height: 100}} imageStyle={{ resizeMode: 'cover' }} overlayColor='#00000088'></ImageBackground> */}
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
        //  borderWidth: 5,
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
    bookmark: {
        position: 'absolute',
        zIndex: 2,
        right: 20,
    },
    cityImg: {
        width: '100%',
        height: '100%',
        //resizeMode: 'contain',
        //resizeMode: 'stretch',
        resizeMode: 'cover',
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
