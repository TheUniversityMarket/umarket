// import React, { useState } from 'react';
// import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Dimensions } from "react-native"
// import { TextInput } from "react-native";
// import { FontAwesome6 } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { verifyCode } from '../api/api';

// //const school = "https://images.genius.com/018e964bd737e5d4600162dbcac48ce5.1000x1000x1.png" // School image will vary with different schools if we decide to expand later on.
// const school = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png"

// const { width, height } = Dimensions.get('window');
// const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

// //Default guideline sizes are based on standard ~5" screen mobile device
// const guidelineBaseWidth = 350;
// const guidelineBaseHeight = 680;

// function scale(size: number) {
//     return shortDimension / guidelineBaseWidth * size;
// }
// function verticalScale(size: number) {
//     return longDimension / guidelineBaseHeight * size;
// }
// function moderateScale(size: number, factor = 0.5) {
//     return size + (scale(size) - size) * factor;
// }
// function moderateVerticalScale(size: number, factor = 0.5) {
//     return size + (verticalScale(size) - size) * factor;
// }

// let buttonProperties = {
//     color1: "rgb(17 24 39)",
//     color2: "rgb(34 197 94)"
// }

// function changeColor() {
//     let x = buttonProperties.color1
//     buttonProperties.color1 = buttonProperties.color2
//     buttonProperties.color2 = x
// }

// function UserVerification({ navigation, route }) {
//     const companyName = "UMarket";
//     const { email } = route.params;

//     const [verificationCode, setVerificationCode] = useState('');

//     console.log(email);

//     const handleContinue = () => {
//         verifyCode(email, verificationCode).then((response) => {
//             if (response === true) {
//                 navigation.navigate('AccountInformation', { email });
//             } else {
//                console.error("Error verifying code");
//             }
//         }
//         );
//       };

//           return (
//             <SafeAreaView style={styles.safeContainer}>
//             <View style={{flex: 1, backgroundColor: "rgb(34 197 94)", width: "100%", height: "100%"}}>

//             </View>
//             <View style={styles.container}>
//                     {/* <ImageBackground source={{uri: school}} style={styles.schoolBackGround}>
//                         <Text style={styles.signUp}>UMarket</Text>
//                     </ImageBackground> */}
//                     <View style={styles.header}>
//                         <Text style={styles.signUp}>UMarket</Text>
//                     </View>
//                     <View style={styles.registrationContainer}>
//                         <Text style={{fontWeight: "bold", fontSize: moderateScale(25), marginBottom: 17, color:"rgb(17 24 39)"}}>Verification Code</Text>
//                         <View style={{ gap: 3, marginBottom: verticalScale(17)}}>
//                             <TextInput style={styles.verificationCode} placeholder="Enter Verification Code" keyboardType="email-address" placeholderTextColor={"#B3B3B3"} onChangeText={setVerificationCode} value={verificationCode}/>
//                             <Pressable style={ ({ pressed }) => [
//                             styles.button,
//                             pressed && {backgroundColor: "green"}
//                             ]}
//                             onPress={handleContinue}>
//                             <Text style={styles.buttonText}>Continue</Text>
//                         </Pressable>
//                         </View>
//                     </View>
//                 </View>
//         </SafeAreaView>
//         )
//     }


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
//         flex: 1,
//         //borderWidth: 10,
//         //borderColor: "red",
//         backgroundColor: "white",
//         paddingHorizontal: moderateScale(74),
//         paddingTop: moderateVerticalScale(44),
//         alignItems: "center",
//         //justifyContent: "center",
//     },
//     verificationCode: {
//         height: 40,
//         borderWidth: 1,
//         borderColor: "#e5e7eb",
//         width: moderateScale(250),
//         paddingTop: 4,
//         fontSize: 15,
//         paddingLeft: 5,
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

// export default UserVerification

import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions, Image, useWindowDimensions } from "react-native"
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { getVerificationCode } from '../api/api';
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react"
import { Alert } from 'react-native';
import { verifyCode } from '../api/api';

// firebase imports
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from '../firebase/firebaseConfig';


const { width, height } = Dimensions.get('window');

function UserVerification( {navigation, route} ) {

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

  const [password, setPassword] = useState('');

    const { email } = route.params;

    const [verificationCode, setVerificationCode] = useState('');

    console.log(email);

    const handleContinue = () => {
            verifyCode(email, verificationCode).then((response) => {
                if (response === true) {
                    navigation.navigate('AccountInformation', { email });
                } else {
                console.error("Error verifying code");
                }
            }
        );
    };
  
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
                          <Text style={{fontSize: 17, paddingBottom: 2}}>Enter Verification Code:</Text>
                          <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <TextInput style={styles.inputCont} placeholder="Enter Verification Code" keyboardType="email-address" placeholderTextColor={"#B3B3B3"} onChangeText={setVerificationCode} value={verificationCode}/>
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

export default UserVerification