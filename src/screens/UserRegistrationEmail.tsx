import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Dimensions } from "react-native"
import { TextInput } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { auth } from '../firebase/firebaseConfig'; 
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { getVerificationCode } from '../api/api';

//const school = "https://images.genius.com/018e964bd737e5d4600162dbcac48ce5.1000x1000x1.png" // School image will vary with different schools if we decide to expand later on.
const school = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png"

import { moderateScale, verticalScale, moderateVerticalScale } from '../components/Scaling';
const width = Dimensions.get('window').width;

function UserRegistrationEmail({navigation}) {
    const companyName = "UMarket";
    const [email, setEmail] = useState('');

    let buttonSingleProperties = {
        color1: "#22c55e",
        color2: "rgb(34 197 94)"
    }

    function changeSingleColor() {
        let x = buttonSingleProperties.color1
        buttonSingleProperties.color1 = buttonSingleProperties.color2
        buttonSingleProperties.color2 = x
    }

    const handleContinue = () => {
        checkEmail().then((emailExists) => {
            if (!emailExists) {
                alert("Email already exists. Please enter a new valid school email.");
                return;
            }
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
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                {/* <ImageBackground source={{uri: school}} style={styles.schoolBackGround}>
                    <Text style={styles.signUp}>UMarket</Text>
                </ImageBackground> */}
                <View style={styles.header}>
                    <Text style={styles.signUp}>UMarket</Text>
                </View>
                <View style={styles.registrationContainer}>
                    <Text style={{fontWeight: "bold", fontSize: 25, marginBottom: 17, color:"rgb(17 24 39)"}}>Account Type</Text>
                    <View style={{flexDirection: "row", gap: 30, marginBottom: verticalScale(3)}}>
                        <Pressable style={ ({ pressed }) => [
                        {backgroundColor: buttonSingleProperties.color1, padding: 13,borderRadius: 100, alignItems: "center"},
                        pressed && {backgroundColor: "rgb(17 24 39)"}
                        ]} onPress={changeSingleColor}>
                            <View>
                                <FontAwesome5 name="user-alt" size={24} color="white" />
                            </View>
                            <View style={{alignItems: "center", marginTop: 3}}>
                                <Text style={{fontWeight: "bold", color: "white"}}>Single</Text>
                            </View>
                        </Pressable>
                        <Pressable style={ ({ pressed }) => [
                        {backgroundColor: "rgb(34 197 94)", padding: 13,borderRadius: 100, alignItems: "center"},
                        pressed && {backgroundColor: "rgb(17 24 39)"}
                        ]}>
                            <View>
                                <FontAwesome6 name="user-group" size={24} color="white" />
                            </View>
                            <View style={{alignItems: "center", marginTop: 3}}>
                                <Text style={{fontWeight: "bold", color: "white"}}>Group</Text>
                            </View>
                        </Pressable>
                    </View>
                    <TextInput style={styles.emailInput} placeholder="Enter School Email" keyboardType="email-address" onChangeText={setEmail} value={email} placeholderTextColor={"#B3B3B3"}/>
                    <Pressable style={ ({ pressed }) => [
                        styles.button,
                        pressed && {backgroundColor: "green"}
                        ]}
                        onPress={handleContinue}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    safeContainer: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "white"
    },
    container: {
        flex: 1, 
        justifyContent: "space-between",
    },
    header: {
        height: moderateScale(200),
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        
    },
    // schoolBackGround: {
    //     height: moderateScale(200),
    //     width: "100%",
    //     justifyContent: "center",
    //     alignItems: "center",
    // },
    signUp: {
        fontSize: moderateScale(65),
        color: "rgb(34 197 94)",
        fontWeight: "bold",
    },
    registrationContainer: {
        backgroundColor: "white",
        paddingHorizontal: moderateScale(74),
        paddingTop: moderateVerticalScale(44),
        alignItems: "center",
    },
    emailInput: {
        height: 40,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        width: moderateScale(250),
        paddingTop: 4,
        fontSize: 15,
        paddingLeft: 5
    },
    button: {
        borderRadius: 3,
        alignItems: "center",
        width: moderateScale(250),
        backgroundColor: "#22c55e",
        padding: 7,
        marginBottom: moderateVerticalScale(600),
        marginTop: verticalScale(7),
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 22,
    },
})

export default UserRegistrationEmail