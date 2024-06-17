// import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Dimensions, Alert } from "react-native"
// import { useState } from 'react';
// import { TextInput } from "react-native";
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, db } from '../firebase/firebaseConfig';
// import React from "react";

// //const school = "https://images.genius.com/018e964bd737e5d4600162dbcac48ce5.1000x1000x1.png" // School image will vary with different schools if we decide to expand later on.
// const school = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png"

// // resizing imports
// const { width, height } = Dimensions.get('window');
// import {scale, verticalScale, moderateScale, moderateVerticalScale} from '../components/Scaling';

// let buttonProperties = {
//     color1: "rgb(17 24 39)",
//     color2: "rgb(34 197 94)"
// }

// function changeColor() {
//     let x = buttonProperties.color1
//     buttonProperties.color1 = buttonProperties.color2
//     buttonProperties.color2 = x
// }

// function AccountInformation({ navigation, route }) {
//     const companyName = "UMarket";
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [password, setPassword] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const { email } = route.params;

//     console.log(email);

//     const handleSignUp = async () => {
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//         try {
//             await setDoc(doc(db, "users", user.uid), {
//                 firstName,
//                 lastName,
//                 email,
//                 phoneNumber,
//                 dateJoined: new Date()
//             });
//             console.log("Document successfully written");
//         } catch (error) {
//             console.error("Error writing document: ", error);
//         }

//         navigation.navigate('Listings'); // Navigate to home after registration
        
//     } catch (error: any) {
//             Alert.alert("Error", error.message);
//         }
//     };

//     return (
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

//                         <View style={{ gap: 3, marginBottom: verticalScale(17)}}>



//                             <View style={{alignItems: "flex-start", width: "100%"}}>
//                                 <Text style={{fontWeight: "bold", fontSize: moderateScale(13), marginBottom: 17, color:"rgb(17 24 39)"}}>First Name</Text>
//                             </View>
//                             <TextInput style={styles.verificationCode} placeholder="First Name" onChangeText={setFirstName} value={firstName} keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>



//                             <View style={{alignItems: "flex-start", width: "100%", marginTop: 10}}>
//                                 <Text style={{fontWeight: "bold", fontSize: moderateScale(13), marginBottom: 17, color:"rgb(17 24 39)"}}>Last Name</Text>
//                             </View>
//                             <TextInput style={styles.verificationCode} placeholder="Last Name" onChangeText={setLastName} value={lastName} keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>

//                             <View style={{alignItems: "flex-start", width: "100%", marginTop: 10}}>
//                                 <Text style={{fontWeight: "bold", fontSize: moderateScale(13), marginBottom: 17, color:"rgb(17 24 39)"}}>Phone Number</Text>
//                             </View>
//                             <TextInput style={styles.verificationCode} placeholder="Phone Number" onChangeText={setPhoneNumber} value={phoneNumber} keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>


//                             <View style={{alignItems: "flex-start", width: "100%", marginTop: 10}}>
//                                 <Text style={{fontWeight: "bold", fontSize: moderateScale(13), marginBottom: 17, color:"rgb(17 24 39)"}}>Password</Text>
//                             </View>
//                             <TextInput style={styles.verificationCode} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry placeholderTextColor={"#B3B3B3"}/>


                            
//                             <Pressable style={ ({ pressed }) => [
//                                 styles.button,
//                                 pressed && {backgroundColor: "green"}
//                                 ]}
//                                 onPress={handleSignUp}>
//                                 <Text style={styles.buttonText}>Create Account</Text>
//                             </Pressable>
//                         </View>
//                     </View>
//                 </View>
//         </SafeAreaView>
//         )
    
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

// export default AccountInformation

import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Dimensions, Alert, useWindowDimensions } from "react-native"
import { useState } from 'react';
import { TextInput } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React from "react";
import { StatusBar } from "expo-status-bar";
//import { scale, verticalScale, moderateScale, moderateVerticalScale } from '../components/Scaling';

// firebase imports
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from '../firebase/firebaseConfig';


const { width, height } = Dimensions.get('window');

function UserLogin( {navigation, route} ) {

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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { email } = route.params;

    console.log(email);

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

        try {
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                email,
                phoneNumber,
                dateJoined: new Date()
            });
            console.log("Document successfully written");
        } catch (error) {
            console.error("Error writing document: ", error);
        }

        navigation.navigate('Listings'); // Navigate to home after registration
        
    } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "rgb(34 197 94)"}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{flex: 1, backgroundColor: "transparent"}}></View> 

      <View style={{flex: 7, flexDirection: "row"}}>


            <View style={{flex: 1, backgroundColor: "transparent"}}></View> 

            <View style={{flex: 7, alignItems: "center", justifyContent: "center", backgroundColor: "white", minWidth: 350, maxWidth: 800, minHeight: 575, borderRadius: 20, borderWidth: 3, borderColor: "rgb(34 197 94)"}}>
              <View style={{width: "90%", flex: 1, justifyContent: "center"}}>

                  <View style={{alignItems: "center", justifyContent: "center"}}>
                    <Text style={{color: "rgb(34 197 94)", fontSize: moderateScale(43), fontWeight: "bold"}} adjustsFontSizeToFit={true} numberOfLines={1}>
                      UMarket
                    </Text>
                  </View>

                  <View style={{flexDirection: "row"}}>

                    <View style={{flex: 1}}></View>

                    <View style={{minWidth: 300}}>

                    {/* <Pressable style={ ({ pressed }) => [
                        {
                          borderWidth: 1,
                          marginTop: 10,
                          borderRadius: 30,
                          alignItems: "center",
                          maxWidth: 375,
                          backgroundColor: "white",
                          padding: 7,
                        },
                        pressed && {backgroundColor: "#dcdada"}
                      ]} onPress={() => navigation.navigate('Home')}>
                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                          <Image source={{uri: "Images/sellraze.png"}} style={{height: 23, width: 23, marginRight: 7}} />
                          <Text style={{fontSize: 20, color: "gray"}}>Continue with SellRaze</Text>
                        </View>
                    </Pressable> */}

                      <View style={{flex: 1, marginTop: 30}}>
                          <Text style={{fontSize: 17, paddingBottom: 2}}>First Name:</Text>
                          <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <TextInput style={styles.inputCont} placeholder="First Name" onChangeText={setFirstName} value={firstName} keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>
                          </View>
                      </View>

                      <View style={{flex: 1, marginTop: 20}}>
                          <Text style={{fontSize: 17, paddingBottom: 2}}>Last Name:</Text>
                          <View style={{alignItems: "center", flex: 1, flexDirection: "row", justifyContent: "center"}}>
                            <TextInput style={styles.inputCont} placeholder="Last Name" onChangeText={setLastName} value={lastName} keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>
                          </View>
                      </View>

                      <View style={{flex: 1, marginTop: 20}}>
                          <Text style={{fontSize: 17, paddingBottom: 2}}>Phone Number:</Text>
                          <View style={{alignItems: "center", flex: 1, flexDirection: "row", justifyContent: "center"}}>
                            <TextInput style={styles.inputCont} placeholder="Phone Number" onChangeText={setPhoneNumber} value={phoneNumber} keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>
                          </View>
                      </View>

                      <View style={{flex: 1, marginTop: 20}}>
                          <Text style={{fontSize: 17, paddingBottom: 2}}>Password:</Text>
                          <View style={{alignItems: "center", flex: 1, flexDirection: "row", justifyContent: "center"}}>
                            <TextInput style={styles.inputCont} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry placeholderTextColor={"#B3B3B3"}/>
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
                      ]} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Create Account</Text>
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

export default UserLogin