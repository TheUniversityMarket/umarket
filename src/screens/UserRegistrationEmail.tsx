// import React, { useState } from 'react';
// import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Dimensions } from "react-native"
// import { TextInput } from "react-native";
// import { FontAwesome6 } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { auth } from '../firebase/firebaseConfig'; 
// import { fetchSignInMethodsForEmail } from 'firebase/auth';
// import { getVerificationCode } from '../api/api';

// //const school = "https://images.genius.com/018e964bd737e5d4600162dbcac48ce5.1000x1000x1.png" // School image will vary with different schools if we decide to expand later on.
// const school = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png"

// import { moderateScale, verticalScale, moderateVerticalScale } from '../components/Scaling';
// const width = Dimensions.get('window').width;

// function UserRegistrationEmail({navigation}) {
//     const companyName = "UMarket";
//     const [email, setEmail] = useState('');

//     let buttonSingleProperties = {
//         color1: "#22c55e",
//         color2: "rgb(34 197 94)"
//     }

//     function changeSingleColor() {
//         let x = buttonSingleProperties.color1
//         buttonSingleProperties.color1 = buttonSingleProperties.color2
//         buttonSingleProperties.color2 = x
//     }

//     const handleContinue = () => {
//         checkEmail().then((emailExists) => {
//             if (!emailExists) {
//                 alert("Email already exists. Please enter a new valid school email.");
//                 console.log("Email already exists.");
//                 return;
//             }
//             console.log("Email sent!");
//             getVerificationCode(email);
//             navigation.navigate('UserVerification', { email }); // Correct usage as per type definition
//         } 
//         );
//      };

//     const checkEmail = async () => {
//         try {    
//             const methods = await fetchSignInMethodsForEmail(auth, email);
//             if (methods.length == 0) {
//                 return true;
//             } else {
//                 return false;
//             }
//         } catch (error) {
//             // Handle errors, such as invalid email or network issues
//             console.error("Error checking email:", error);
//             return false;
//         }
//     }
 
//     return (
//         <SafeAreaView style={styles.safeContainer}>
//             <View style={styles.container}>
//                 {/* <ImageBackground source={{uri: school}} style={styles.schoolBackGround}>
//                     <Text style={styles.signUp}>UMarket</Text>
//                 </ImageBackground> */}
//                 <View style={styles.header}>
//                     <Text style={styles.signUp}>UMarket</Text>
//                 </View>
//                 <View style={styles.registrationContainer}>
//                     <Text style={{fontWeight: "bold", fontSize: 25, marginBottom: 17, color:"rgb(17 24 39)"}}>Account Type</Text>
//                     <View style={{flexDirection: "row", gap: 30, marginBottom: verticalScale(3)}}>
//                         <Pressable style={ ({ pressed }) => [
//                         {backgroundColor: buttonSingleProperties.color1, padding: 13,borderRadius: 100, alignItems: "center"},
//                         pressed && {backgroundColor: "rgb(17 24 39)"}
//                         ]} onPress={changeSingleColor}>
//                             <View>
//                                 <FontAwesome5 name="user-alt" size={24} color="white" />
//                             </View>
//                             <View style={{alignItems: "center", marginTop: 3}}>
//                                 <Text style={{fontWeight: "bold", color: "white"}}>Single</Text>
//                             </View>
//                         </Pressable>
//                         <Pressable style={ ({ pressed }) => [
//                         {backgroundColor: "rgb(34 197 94)", padding: 13,borderRadius: 100, alignItems: "center"},
//                         pressed && {backgroundColor: "rgb(17 24 39)"}
//                         ]}>
//                             <View>
//                                 <FontAwesome6 name="user-group" size={24} color="white" />
//                             </View>
//                             <View style={{alignItems: "center", marginTop: 3}}>
//                                 <Text style={{fontWeight: "bold", color: "white"}}>Group</Text>
//                             </View>
//                         </Pressable>
//                     </View>
//                     <TextInput style={styles.emailInput} placeholder="Enter School Email" keyboardType="email-address" onChangeText={setEmail} value={email} placeholderTextColor={"#B3B3B3"}/>
//                     <Pressable style={ ({ pressed }) => [
//                         styles.button,
//                         pressed && {backgroundColor: "green"}
//                         ]}
//                         onPress={handleContinue}>
//                         <Text style={styles.buttonText}>Continue</Text>
//                     </Pressable>
//                 </View>
//             </View>
//         </SafeAreaView>
//     )
// }


// const styles = StyleSheet.create({
//     safeContainer: {
//         flexDirection: "row",
//         flex: 1,
//         backgroundColor: "white"
//     },
//     container: {
//         flex: 1, 
//         justifyContent: "space-between",
//     },
//     header: {
//         height: moderateScale(200),
//         width: "100%",
//         justifyContent: "flex-end",
//         alignItems: "center",
        
//     },
//     // schoolBackGround: {
//     //     height: moderateScale(200),
//     //     width: "100%",
//     //     justifyContent: "center",
//     //     alignItems: "center",
//     // },
//     signUp: {
//         fontSize: moderateScale(65),
//         color: "rgb(34 197 94)",
//         fontWeight: "bold",
//     },
//     registrationContainer: {
//         backgroundColor: "white",
//         paddingHorizontal: moderateScale(74),
//         paddingTop: moderateVerticalScale(44),
//         alignItems: "center",
//     },
//     emailInput: {
//         height: 40,
//         borderWidth: 1,
//         borderColor: "#e5e7eb",
//         width: moderateScale(250),
//         paddingTop: 4,
//         fontSize: 15,
//         paddingLeft: 5
//     },
//     button: {
//         borderRadius: 3,
//         alignItems: "center",
//         width: moderateScale(250),
//         backgroundColor: "#22c55e",
//         padding: 7,
//         marginBottom: moderateVerticalScale(600),
//         marginTop: verticalScale(7),
//     },
//     buttonText: {
//         fontWeight: "bold",
//         color: "white",
//         fontSize: 22,
//     },
// })

// export default UserRegistrationEmail

import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions, Image, useWindowDimensions } from "react-native"
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { getVerificationCode } from '../api/api';
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react"
import { Alert } from 'react-native';
//import { scale, verticalScale, moderateScale, moderateVerticalScale } from '../components/Scaling';

// firebase imports
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from '../firebase/firebaseConfig';


const { width, height } = Dimensions.get('window');

function UserRegistrationEmail( {navigation} ) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const {height, width, scale, fontScale} = useWindowDimensions();
  const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

  //Default guideline sizes are based on standard ~5" screen mobile device
  const guidelineBaseWidth = 350;
  const guidelineBaseHeight = 680;

  function scaleIt(size: number) {
      return shortDimension / guidelineBaseWidth * size;
  }
  function verticalScale(size: number) {
      return longDimension / guidelineBaseHeight * size;
  }
  function moderateScale(size: number, factor = 0.5) {
      return size + (scaleIt(size) - size) * factor;
  }
  function moderateVerticalScale(size: number, factor = 0.5) {
      return size + (verticalScale(size) - size) * factor;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleContinue = () => {
        checkEmail().then((emailExists) => {
            if (!emailExists) {
                alert("Email already exists. Please enter a new valid school email.");
                console.log("Email already exists.");
                return;
            }
            console.log("Email sent!");
            getVerificationCode(email);
            navigation.navigate('UserVerification', { email }); // Correct usage as per type definition
        } 
        );
        };

    const checkEmail = async () => {
        try {    
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods.length == 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            // Handle errors, such as invalid email or network issues
            console.error("Error checking email:", error);
            return false;
        }
    }
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: (width < 600) ? "white" : "rgb(34 197 94)"}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 1, backgroundColor: "transparent"}}></View> 

      <View style={{flex: 7, flexDirection: "row"}}>


            <View style={{flex: 1, backgroundColor: "transparent"}}></View> 

            <View style={{flex: 7, alignItems: "center", justifyContent: "center", backgroundColor: "white", minWidth: 350, maxWidth: 800, minHeight: 575, borderRadius: 20, borderWidth: 3, borderColor: (width < 600) ? "white" : "rgb(34 197 94)"}}>
              <View style={{width: "90%", flex: 1, justifyContent: "center"}}>

                  <View style={{alignItems: "center", justifyContent: "center"}}>
                    <Text style={{color: "rgb(34 197 94)", fontSize: moderateScale(43), fontWeight: "bold"}} adjustsFontSizeToFit={true} numberOfLines={1}>
                      UMarket
                    </Text>
                  </View>

                  <View style={{flexDirection: "row"}}>

                    <View style={{flex: 1}}></View>

                    <View style={{minWidth: 300}}>

                      <View style={{flex: 1, marginTop: 30}}>
                          <Text style={{fontSize: 17, paddingBottom: 2}}>Enter Email:</Text>
                          <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <TextInput style={styles.inputCont} placeholder="Enter School Email" keyboardType="email-address" onChangeText={setEmail} value={email} placeholderTextColor={"#B3B3B3"}/>
                          </View>
                      </View>

                      <Pressable style={ ({ pressed }) => [
                        {
                          marginTop: 20,
                          borderRadius: 3,
                          alignItems: "center",
                          maxWidth: 375,
                          backgroundColor: "#22c55e",
                          padding: 10,
                          fontSize: 22,
                        },
                        pressed && {backgroundColor: "green"}
                      ]} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Continue</Text>
                      </Pressable>

                    </View>

                    <View style={{flex: 1}}></View>

                  </View>
                
              </View>
            </View>

            <View style={{flex: 1, backgroundColor: "transparent"}}></View>


      </View>

      <View style={{flex: 1, backgroundColor: "transparent"}}></View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputCont: {
    maxWidth: 375,
    flex: 1,
    borderWidth: 1, 
    padding: 20, 
    borderRadius: 10, 
    //marginTop: 3,
    borderColor: "#E5E4E2",
    fontSize: 17,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
    borderRadius: 3,
  },
})

export default UserRegistrationEmail