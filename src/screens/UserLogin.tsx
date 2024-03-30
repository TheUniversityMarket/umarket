import { useState } from "react"
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions } from "react-native"

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

function UserLogin({ navigation }) {
  const companyName = "UMarket"; //name of company
  const [name, setEmail] = useState('');

  function button(text: String) { // A function to make buttons. Will allow to add functionality to buttons later. 
    return (
        <Pressable style={ ({ pressed }) => [
            styles.button,
            pressed && {backgroundColor: "green"}
            ]}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    )
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
    {/*
        <View style={styles.sloganContainer}>
            <Text style={styles.slogan}>
                Re-market The Way UMarket
            </Text>
        </View>
    */}

        <View style={styles.body}>
        {/* Overarching body that wraps around login window */}

        <View style={styles.title}>
            {/* Wrapper for title (AKA company name) */}
          <Text style={styles.compName}>
            {companyName}
          </Text>
        </View>

        <View style={styles.login}>
        {/* Wrapper for login entries */}

          <View style={styles.loginEmail}>
            <Text style={styles.email}>
              Email:
            </Text>
            <View style={styles.emailInputContainer}>
              <TextInput style={styles.emailInput}
          onChangeText={text => setEmail(text)}
          placeholder="Enter Email"
          placeholderTextColor={"#B3B3B3"}
          keyboardType="email-address"
          autoCapitalize="none">  
              </TextInput>
            </View>
          </View>
          <View>
            {/* ^ Displays email entry */}

          <View style={styles.loginPassword}>
            <Text style={styles.password}>
              Password:
            </Text>
            <View style={styles.passwordInputContainer}>
              <TextInput style={styles.passwordInput}
          onChangeText={text => setEmail(text)}
          placeholder="Enter Password"
          placeholderTextColor={"#B3B3B3"}
          autoCapitalize="none" secureTextEntry>  
              </TextInput>
            </View>
            <View style={{ alignItems: "flex-end" }}>
                <Pressable>
                    <Text style={{ color: "#00CC00", fontSize: 13 }}>forgot password?</Text>
                </Pressable>
            </View>
          </View>
          </View>
            {/* ^ Displays password entry */}

            <Pressable style={ ({ pressed }) => [
              styles.button,
              pressed && {backgroundColor: "green"}
            ]} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            {/* login button */}

            <Text style={{ color: "rgb(34 197 94)", marginTop: 7, marginBottom: 7, fontWeight: "bold" }}>or</Text>

            <Pressable style={ ({ pressed }) => [
            styles.button,
            pressed && {backgroundColor: "green"}
            ]}
            onPress={() => navigation.navigate('AccountType')}
            >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>

        </View>

        </View>


      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1
  },
  /*
  sloganContainer: {
    alignItems: "center",
  },
  slogan: {
    color: "rgb(34 197 94)",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  */
  body:{
    flex: 1,
    justifyContent: "center",
  },
  title: {
    //flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  compName: {
    fontWeight: "bold",
    fontSize: scale(60),
    color: "#22c55e",
  },
  login: {
    //justifyContent: "top",
    //flex: 1,
    alignItems: "center",
  },
  loginEmail: {
    //flexDirection: "row",
  },
  email: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    paddingRight: 10,
  },
  emailInputContainer: {
    padding: 7,
    borderRadius: 3,
    backgroundColor: "#e5e7eb",
    width: scale(225),
    height: 50,
  },
  emailInput: {
    paddingTop: 4,
    fontSize: 17,
    paddingLeft: 5
    //textAlign: 'center',
  },
  loginPassword: {
    //marginTop: 10,
    //flexDirection: "row",
    marginBottom: 17,
  },
  password: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingRight: 10,
  },
  passwordInputContainer: {
    padding: 7,
    borderRadius: 3,
    backgroundColor: "#e5e7eb",
    width: scale(225),
    height: 50,
    marginBottom: 7,
  },
  passwordInput: {
    paddingTop: 4,
    fontSize: 17,
    //textAlign: "center",
    paddingLeft: 5,
  },
  button: {
    borderRadius: 3,
    alignItems: "center",
    width: scale(225),
    marginTop: 0,
    backgroundColor: "#22c55e",
    padding: 7,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 22,
  }
})

export default UserLogin

// import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Dimensions } from "react-native"
// import { TextInput } from "react-native";

// //const school = "https://images.genius.com/018e964bd737e5d4600162dbcac48ce5.1000x1000x1.png" // School image will vary with different schools if we decide to expand later on.
// const school = "https://www.htmlcsscolor.com/preview/gallery/111827.png"

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

// function UserRegistration() {
//     const companyName = "UMarket";
//     return (
//         <SafeAreaView style={styles.safeContainer}>
//             <View style={styles.container}>
//                 <ImageBackground source={{uri: school}} style={styles.schoolBackGround}>
//                     <Text style={styles.signUp}>UMarket</Text>
//                 </ImageBackground>
//                 <View style={styles.registrationContainer}>
//                     <TextInput style={styles.emailInput} placeholder="Enter Email" keyboardType="email-address" />
//                     <TextInput style={styles.passwordInput} placeholder="Enter Password" keyboardType="email-address" />
//                     <View style={{ alignItems: "flex-end", width: scale(225), marginTop: scale(7)}}>
//                       <Pressable>
//                         <Text style={{ color: "#00CC00", fontSize: 13 }}>forgot password?</Text>
//                       </Pressable>
//                     </View>
//                     <Pressable style={ ({ pressed }) => [
//                         styles.loginButton,
//                         pressed && {backgroundColor: "green"}
//                         ]}>
//                         <Text style={styles.buttonText}>Login</Text>
//                     </Pressable>
//                     <Text style={{ color: "rgb(34 197 94)", fontWeight: "bold", fontSize: scale(13) > 25 ? 25 : scale(13), }}>or</Text>
//                     <Pressable style={ ({ pressed }) => [
//                         styles.signUpButton,
//                         pressed && {backgroundColor: "green"}
//                         ]}>
//                         <Text style={styles.buttonText}>Sign Up</Text>
//                     </Pressable>
//                 </View>
//             </View>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     safeContainer: {
//         flex: 1,
//         backgroundColor: "rgb(17 24 39)"
//     },
//     container: {
//         flex: 1, 
//         justifyContent: "space-between",
//     },
//     schoolBackGround: {
//         height: moderateScale(200),
//         width: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     signUp: {
//         fontSize: scale(73),
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
//         width: scale(225),
//         paddingTop: 4,
//         fontSize: 15,
//         paddingLeft: 5
//     },
//     passwordInput: {
//       height: 40,
//       borderWidth: 1,
//       borderColor: "#e5e7eb",
//       width: scale(225),
//       paddingTop: 4,
//       fontSize: 15,
//       paddingLeft: 5,
//       marginTop: verticalScale(13),
//     },
//     loginButton: {
//       borderRadius: 3,
//       alignItems: "center",
//       width: scale(225),
//       backgroundColor: "#22c55e",
//       padding: 7,
//       marginTop: verticalScale(13),
//       marginBottom: verticalScale(7),
//     },
//     signUpButton: {
//         borderRadius: 3,
//         alignItems: "center",
//         width: scale(225),
//         backgroundColor: "#22c55e",
//         padding: 7,
//         marginBottom: moderateVerticalScale(600),
//         marginTop: verticalScale(7),
//     },
//     buttonText: {
//         fontWeight: "bold",
//         color: "white",
//         fontSize: scale(13) > 30 ? 30 : scale(13),
//     },
// })

// export default UserRegistration