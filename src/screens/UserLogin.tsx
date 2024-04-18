// import { useState } from "react"
// import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions } from "react-native"

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

// function UserLogin({ navigation }) {
//   const companyName = "UMarket"; //name of company
//   const [name, setEmail] = useState('');

//   function button(text: String) { // A function to make buttons. Will allow to add functionality to buttons later. 
//     return (
//         <Pressable style={ ({ pressed }) => [
//             styles.button,
//             pressed && {backgroundColor: "green"}
//             ]}>
//             <Text style={styles.buttonText}>{text}</Text>
//         </Pressable>
//     )
//   }

//   if (width > 700) {
//       return (
//         <SafeAreaView style={styles.safeContainer}>
//           <View style={{flex: 1, backgroundColor: "rgb(34 197 94)", alignItems: "center", justifyContent: "center"}}>
//             <Text style={{color: "white", fontSize: moderateScale(13)}}>Welcome to UMarket, the sustainable university resale marketplace.</Text>
//           </View>
//         <View style={styles.container}>
//       {/*
//           <View style={styles.sloganContainer}>
//               <Text style={styles.slogan}>
//                   Re-market The Way UMarket
//               </Text>
//           </View>
//       */}
  
//           <View style={styles.body}>
//           {/* Overarching body that wraps around login window */}
  
//           <View style={styles.title}>
//               {/* Wrapper for title (AKA company name) */}
//             <Text style={{fontWeight: "bold", fontSize: moderateScale(59), color: "#22c55e"}}>
//               {companyName}
//             </Text>
//           </View>
  
//           <View style={styles.login}>
//           {/* Wrapper for login entries */}
  
//             <View style={styles.loginEmail}>
//               {/* <Text style={styles.email}>
//                 Email:
//               </Text> */}
//               <View style={{
//                 padding: 7,
//                 borderRadius: 3,
//                 backgroundColor: "#e5e7eb",
//                 width: moderateScale(225),
//                 height: 50
//                 }}>
//                 <TextInput style={styles.emailInput}
//             onChangeText={text => setEmail(text)}
//             placeholder="Enter Email"
//             placeholderTextColor={"#B3B3B3"}
//             keyboardType="email-address"
//             autoCapitalize="none">  
//                 </TextInput>
//               </View>
//             </View>
//             <View>
//               {/* ^ Displays email entry */}
  
//             <View style={styles.loginPassword}>
//               {/* <Text style={styles.password}>
//                 Password:
//               </Text> */}
//               <View style={{
//                 padding: 7,
//                 borderRadius: 3,
//                 backgroundColor: "#e5e7eb",
//                 width: moderateScale(225),
//                 height: 50,
//                 marginBottom: 7,
//                 }}>
//                 <TextInput style={styles.passwordInput}
//             onChangeText={text => setEmail(text)}
//             placeholder="Enter Password"
//             placeholderTextColor={"#B3B3B3"}
//             autoCapitalize="none" secureTextEntry>  
//                 </TextInput>
//               </View>
//               <View style={{ alignItems: "flex-end" }}>
//                   <Pressable>
//                       <Text style={{ color: "#00CC00", fontSize: 13 }}>forgot password?</Text>
//                   </Pressable>
//               </View>
//             </View>
//             </View>
//               {/* ^ Displays password entry */}
  
//               <Pressable style={ ({ pressed }) => [
//                 {
//                   borderRadius: 3,
//                   alignItems: "center",
//                   width: moderateScale(225),
//                   marginTop: 0,
//                   backgroundColor: "#22c55e",
//                   padding: 7,
//                 },
//                 pressed && {backgroundColor: "green"}
//               ]} onPress={() => navigation.navigate('Listings')}>
//                 <Text style={styles.buttonText}>Log in</Text>
//               </Pressable>
//               {/* login button */}
  
//               <Text style={{ color: "rgb(34 197 94)", marginTop: 7, marginBottom: 7, fontWeight: "bold" }}>or</Text>
  
//               <Pressable style={ ({ pressed }) => [
//               {
//                 borderRadius: 3,
//                 alignItems: "center",
//                 width: moderateScale(225),
//                 marginTop: 0,
//                 backgroundColor: "#22c55e",
//                 padding: 7,
//               },
//               pressed && {backgroundColor: "green"}
//               ]}
//               onPress={() => navigation.navigate('UserRegistrationEmail')}
//               >
//               <Text style={styles.buttonText}>Sign Up</Text>
//             </Pressable>
  
//           </View>
  
//           </View>
  
  
//         </View>
//       </SafeAreaView>
//       )
//   }
//   else {
//     return (
//       <SafeAreaView style={styles.safeContainer}>
//       <View style={styles.container}>
//     {/*
//         <View style={styles.sloganContainer}>
//             <Text style={styles.slogan}>
//                 Re-market The Way UMarket
//             </Text>
//         </View>
//     */}

//         <View style={styles.body}>
//         {/* Overarching body that wraps around login window */}

//         <View style={styles.title}>
//             {/* Wrapper for title (AKA company name) */}
//           <Text style={{fontWeight: "bold", fontSize: moderateScale(59), color: "#22c55e"}}>
//             {companyName}
//           </Text>
//         </View>

//         <View style={styles.login}>
//         {/* Wrapper for login entries */}

//           <View style={styles.loginEmail}>
//             {/* <Text style={styles.email}>
//               Email:
//             </Text> */}
//             <View style={{
//               padding: 7,
//               borderRadius: 3,
//               backgroundColor: "#e5e7eb",
//               width: moderateScale(225),
//               height: 50
//               }}>
//               <TextInput style={styles.emailInput}
//           onChangeText={text => setEmail(text)}
//           placeholder="Enter Email"
//           placeholderTextColor={"#B3B3B3"}
//           keyboardType="email-address"
//           autoCapitalize="none">  
//               </TextInput>
//             </View>
//           </View>
//           <View>
//             {/* ^ Displays email entry */}

//           <View style={styles.loginPassword}>
//             {/* <Text style={styles.password}>
//               Password:
//             </Text> */}
//             <View style={{
//               padding: 7,
//               borderRadius: 3,
//               backgroundColor: "#e5e7eb",
//               width: moderateScale(225),
//               height: 50,
//               marginBottom: 7,
//               }}>
//               <TextInput style={styles.passwordInput}
//           onChangeText={text => setEmail(text)}
//           placeholder="Enter Password"
//           placeholderTextColor={"#B3B3B3"}
//           autoCapitalize="none" secureTextEntry>  
//               </TextInput>
//             </View>
//             <View style={{ alignItems: "flex-end" }}>
//                 <Pressable>
//                     <Text style={{ color: "#00CC00", fontSize: 13 }}>forgot password?</Text>
//                 </Pressable>
//             </View>
//           </View>
//           </View>
//             {/* ^ Displays password entry */}

//             <Pressable style={ ({ pressed }) => [
//               {
//                 borderRadius: 3,
//                 alignItems: "center",
//                 width: moderateScale(225),
//                 marginTop: 0,
//                 backgroundColor: "#22c55e",
//                 padding: 7,
//               },
//               pressed && {backgroundColor: "green"}
//             ]} onPress={() => navigation.navigate('Home')}>
//               <Text style={styles.buttonText}>Log in</Text>
//             </Pressable>
//             {/* login button */}

//             <Text style={{ color: "rgb(34 197 94)", marginTop: 7, marginBottom: 7, fontWeight: "bold" }}>or</Text>

//             <Pressable style={ ({ pressed }) => [
//             {
//               borderRadius: 3,
//               alignItems: "center",
//               width: moderateScale(225),
//               marginTop: 0,
//               backgroundColor: "#22c55e",
//               padding: 7,
//             },
//             pressed && {backgroundColor: "green"}
//             ]}
//             onPress={() => navigation.navigate('UserRegistrationEmail')}
//             >
//             <Text style={styles.buttonText}>Sign Up</Text>
//           </Pressable>

//         </View>

//         </View>


//       </View>
//       </SafeAreaView>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   safeContainer: {
//     flexDirection: "row",
//     flex: 1,
//     backgroundColor: "white",
//   },
//   container: {
//     flex: 1
//   },
//   /*
//   sloganContainer: {
//     alignItems: "center",
//   },
//   slogan: {
//     color: "rgb(34 197 94)",
//     fontWeight: "bold",
//     fontSize: 30,
//     textAlign: "center",
//   },
//   */
//   body:{
//     flex: 1,
//     justifyContent: "center",
//   },
//   title: {
//     //flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   compName: {
//     fontWeight: "bold",
//     fontSize: moderateScale(65),
//     color: "#22c55e",
//   },
//   login: {
//     //justifyContent: "top",
//     //flex: 1,
//     alignItems: "center",
//   },
//   loginEmail: {
//     marginTop: 23,
//     //flexDirection: "row",
//   },
//   email: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "white",
//     paddingRight: 10,
//   },
//   emailInputContainer: {
//     padding: 7,
//     borderRadius: 3,
//     backgroundColor: "#e5e7eb",
//     width: moderateScale(250),
//     height: 50,
//   },
//   emailInput: {
//     paddingTop: 4,
//     fontSize: 17,
//     paddingLeft: 5
//     //textAlign: 'center',
//   },
//   loginPassword: {
//     //marginTop: 10,
//     //flexDirection: "row",
//     marginBottom: 17,
//     marginTop: 23,
//   },
//   password: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "white",
//     paddingRight: 10,
//   },
//   passwordInputContainer: {
//     padding: 7,
//     borderRadius: 3,
//     backgroundColor: "#e5e7eb",
//     width: moderateScale(250),
//     height: 50,
//     marginBottom: 7,
//   },
//   passwordInput: {
//     paddingTop: 4,
//     fontSize: 17,
//     //textAlign: "center",
//     paddingLeft: 5,
//   },
//   button: {
//     borderRadius: 3,
//     alignItems: "center",
//     width: moderateScale(250),
//     marginTop: 0,
//     backgroundColor: "#22c55e",
//     padding: 7,
//   },
//   buttonText: {
//     fontWeight: "bold",
//     color: "white",
//     fontSize: 22,
//   }
// })

// export default UserLogin

import { useState } from "react"
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions, Image } from "react-native"

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

function scale(size: number) {
    return shortDimension / guidelineBaseWidth * size;
}
function verticalScale(size: number) {
    return longDimension / guidelineBaseHeight * size;
}
function moderateScale(size: number, factor = 0.5) {
    return size + (scale(size) - size) * factor;
}
function moderateVerticalScale(size: number, factor = 0.5) {
    return size + (verticalScale(size) - size) * factor;
}

function UserLogin( {navigation} ) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "rgb(34 197 94)"}}>

      <View style={{flex: 1, backgroundColor: "transparent"}}></View> {/*Top Spacer*/}

      <View style={{flex: 7, flexDirection: "row"}}>


            <View style={{flex: 1, backgroundColor: "transparent"}}></View> {/*Left Spacer*/}

            <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white", minWidth: 350, minHeight: 600, borderRadius: 20, borderWidth: 3, borderColor: "rgb(34 197 94)"}}>
              <View style={{width: "90%", flex: 1, justifyContent: "center"}}>

                  <View style={{alignItems: "center", justifyContent: "center"}}>
                    <Text style={{color: "rgb(34 197 94)", fontSize: moderateScale(59), fontWeight: "bold"}} adjustsFontSizeToFit={true} numberOfLines={1}>
                      UMarket
                    </Text>
                  </View>

                  <View style={{flexDirection: "row"}}>

                    <View style={{flex: 1}}></View>

                    <View style={{minWidth: 300}}>

                    <Pressable style={ ({ pressed }) => [
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
                    </Pressable>

                      <View style={{flex: 1, marginTop: 30}}>
                          <Text style={{fontSize: 17, paddingBottom: 2}}>Email:</Text>
                          <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <TextInput placeholder="Enter Email" placeholderTextColor={"#B3B3B3"} style={styles.inputCont}/>
                          </View>
                      </View>

                      <View style={{flex: 1, marginTop: 20}}>
                          <Text style={{fontSize: 17, paddingBottom: 2}}>Password:</Text>
                          <View style={{alignItems: "center", flex: 1, flexDirection: "row", justifyContent: "center"}}>
                            <TextInput secureTextEntry={true} placeholder="Enter Password" placeholderTextColor={"#B3B3B3"} style={styles.inputCont} />
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
                      ]} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.buttonText}>Log in</Text>
                      </Pressable>

                      <View style={{alignItems: "center"}}>
                        <Text style={{color: "#22c55e", marginTop: 20, textDecorationLine: "underline", fontWeight: "bold"}}>Forgot password?</Text>
                      </View>
                      <View style={{borderBottomWidth: 1, width: "100%", marginVertical: 20}}></View>
                        <Text>Don't have an account? <Pressable onPress={() => navigation.navigate('UserRegistrationEmail')}>
                          <Text style={{fontWeight: "bold", color: "#22c55e", textDecorationLine: "underline"}}>Sign up for UMarket</Text>
                        </Pressable>
                      </Text>
                    </View>

                    <View style={{flex: 1}}></View>

                  </View>
                  
                  {/* <View style={{flex: 1}}></View> */}
              </View>
            </View>

            <View style={{flex: 1, backgroundColor: "transparent"}}></View> {/*Right Spacer*/}


      </View>

      <View style={{flex: 1, backgroundColor: "transparent"}}></View> {/*Bottom Spacer*/}

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