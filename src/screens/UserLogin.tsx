import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react"
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions, Image, useWindowDimensions } from "react-native"
import { Alert } from 'react-native';
//import { scale, verticalScale, moderateScale, moderateVerticalScale } from '../components/Scaling';

// firebase imports
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from '../firebase/firebaseConfig';


const { width, height } = Dimensions.get('window');

function UserLogin( {navigation} ) {

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

  const handleLogin = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate('Listings');
      } catch (error: any) {
        console.log(error);
        Alert.alert(
          "Login Failed",
          error.message,
          [
            { text: "Try Again", onPress: () => console.log("Try Again Pressed") },
            { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
          ],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        "Input Required",
        "Please enter your email address.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }  
  };

  const handlePasswordReset = async (email: string) => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert("Check your email", "A link to reset your password has been sent to your email.");
      } catch (error: any) {
        console.error("Password reset error", error);
        Alert.alert("Failed to Send Reset Email", error.message);
      }
    } else {
      Alert.alert("Input Required", "Please enter your email address.");
    }
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
                    <Text style={{color: "rgb(34 197 94)", fontSize: (width < 940) ? 79 : moderateScale(43), fontWeight: "bold"}} adjustsFontSizeToFit={true} numberOfLines={1}>
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
                          <Text style={{fontSize: 17, paddingBottom: 2}}>Email:</Text>
                          <View style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            <TextInput placeholder="Enter Email" placeholderTextColor={"#B3B3B3"} style={styles.inputCont} value={email} onChangeText={setEmail}/>
                          </View>
                      </View>

                      <View style={{flex: 1, marginTop: 20}}>
                          <Text style={{fontSize: 17, paddingBottom: 2}}>Password:</Text>
                          <View style={{alignItems: "center", flex: 1, flexDirection: "row", justifyContent: "center"}}>
                            <TextInput secureTextEntry={true} placeholder="Enter Password" placeholderTextColor={"#B3B3B3"} style={styles.inputCont} value={password} onChangeText={setPassword}/>
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
                      ]} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Log in</Text>
                      </Pressable>

                      <View style={{alignItems: "center"}}>
                        <Text style={{color: "#22c55e", marginTop: 20, textDecorationLine: "underline", fontWeight: "bold"}} 
                        onPress={() => email ? handlePasswordReset(email) : Alert.alert("Enter Email", "Please enter your email in the field above.")}>
                          Forgot password?</Text>
                      </View>
                      <View style={{borderBottomWidth: 1, width: "100%", marginVertical: 20}}></View>
                        <Text>Don't have an account? <Pressable onPress={() => navigation.navigate('UserRegistrationEmail')}>
                          <Text style={{fontWeight: "bold", color: "#22c55e", textDecorationLine: "underline"}}>Sign up for UMarket</Text>
                        </Pressable>
                      </Text>
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
