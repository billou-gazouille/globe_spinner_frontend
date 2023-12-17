// import React from "react";
// import { View, StyleSheet, Text, StatusBar, Image, ScrollView } from "react-native";
// import BackButton from "../components/BackButton";
// import { CustomText } from "../components/CustomText";
// import FontAwesome from "react-native-vector-icons/FontAwesome";


// export default function SelectedSuggestionsScreen({ navigation, route }) {
  
//   console.log(route.params);

//   const {trip} = route.params;
  
//   return (
    
//     <ScrollView contentContainerStyle={styles.container}>
//       <StatusBar style="auto" />
//       <Image source={require('../assets/noImage.jpg')} style={styles.cityImg}></Image>
      
//       <View style={styles.headingAndSectionPair}>
//         <CustomText style={styles.text}>Accommodation</CustomText>
//         <View style={styles.accommodationDetailsContainer}>
//           <CustomText style={styles.accommodationName}>Hostel Espresso City Center</CustomText>
//           <View style={{flex: 1, flexDirection: 'row', width: '40%'}}>
//             <View style={{flex: 1}}>
//               <View style={{marginLeft: 40, marginTop: 15, flexDirection: 'row'}}>
//                 <FontAwesome name='users' size={25} color='black'/>
//                 <CustomText style={{marginLeft: 10, fontSize: 18}}>3</CustomText>
//               </View>
//               <View style={{marginLeft: 40, marginTop: 20, flexDirection: 'row'}}>
//                 <FontAwesome name='timer' size={25} color='black'/>
//                 <CustomText style={{marginLeft: 10, fontSize: 18}}>4 nights</CustomText>
//               </View>
//             </View>
//             {/* <View style={{marginLeft: 40, marginTop: 20}}>
//               <FontAwesome name='map-marker' size={25} color='black'/>
//               <CustomText style={{marginLeft: 10, fontSize: 16}}>Overtoom 57, 1054 HC</CustomText>
//             </View> */}
//             <FontAwesome name='map-marker' size={25} color='black'/>
//           </View>
//         </View>
//       </View>

//       <View style={styles.headingAndSectionPair}>
//         <CustomText style={styles.text}>Activities</CustomText>
//         <View style={styles.accommodationDetailsContainer}>
//         </View>
//       </View>

//       <View style={styles.headingAndSectionPair}>
//         <CustomText style={styles.text}>Transports</CustomText>
//         <View style={styles.accommodationDetailsContainer}>
//         </View>
//       </View>

//       {/* <Text style={styles.text}>Selected Suggestions Screen</Text> */}
//       <CustomText>Sisi is a cutie</CustomText>
//       <CustomText style={styles.text}>{trip}</CustomText>
//       <BackButton navigation={navigation} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 28,
//   },
//   cityImg: {
//     width: '100%',
//     height: 150,
//   },
//   accommodationDetailsContainer: {
//     width: '95%',
//     height: 150,
//     // color: '#ECECEC',
//     shadowColor: 'black',
//     elevation: 10,
//     backgroundColor: '#DCDCDC',
//     borderRadius: 25,
//   },
//   headingAndSectionPair: {
//     width: '100%',
//     height: 200,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 40,
//   },
//   accommodationName: {
//     fontSize: 18,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
// });
