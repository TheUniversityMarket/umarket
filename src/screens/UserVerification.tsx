import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Dimensions } from "react-native"
import { TextInput } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//const school = "https://images.genius.com/018e964bd737e5d4600162dbcac48ce5.1000x1000x1.png" // School image will vary with different schools if we decide to expand later on.
const school = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png"

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

let buttonProperties = {
    color1: "rgb(17 24 39)",
    color2: "rgb(34 197 94)"
}

function changeColor() {
    let x = buttonProperties.color1
    buttonProperties.color1 = buttonProperties.color2
    buttonProperties.color2 = x
}

function UserVerification({ navigation, route }) {
    const companyName = "UMarket";
    const { email } = route.params;

    console.log(email);

    const handleContinue = () => {
        navigation.navigate('AccountInformation', { email }); // Correct usage as per type definition
      };

    if (width < 700) {    
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
                        <Text style={{fontWeight: "bold", fontSize: moderateScale(25), marginBottom: 17, color:"rgb(17 24 39)"}}>Verification Code</Text>
                        <View style={{ gap: 3, marginBottom: verticalScale(17)}}>
                            <TextInput style={styles.verificationCode} placeholder="Enter School Email" keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>
                            <Pressable style={ ({ pressed }) => [
                            styles.button,
                            pressed && {backgroundColor: "green"}
                            ]}
                            onPress={() => navigation.navigate('AccountInformation', { email })}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </Pressable>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={styles.safeContainer}>
            <View style={{flex: 1, backgroundColor: "rgb(34 197 94)", width: "100%", height: "100%"}}>

            </View>
            <View style={styles.container}>
                    {/* <ImageBackground source={{uri: school}} style={styles.schoolBackGround}>
                        <Text style={styles.signUp}>UMarket</Text>
                    </ImageBackground> */}
                    <View style={styles.header}>
                        <Text style={styles.signUp}>UMarket</Text>
                    </View>
                    <View style={styles.registrationContainer}>
                        <Text style={{fontWeight: "bold", fontSize: moderateScale(25), marginBottom: 17, color:"rgb(17 24 39)"}}>Verification Code</Text>
                        <View style={{ gap: 3, marginBottom: verticalScale(17)}}>
                            <TextInput style={styles.verificationCode} placeholder="Enter Verification Code" keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>
                            <Pressable style={ ({ pressed }) => [
                            styles.button,
                            pressed && {backgroundColor: "green"}
                            ]}
                            onPress={handleContinue}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </Pressable>
                        </View>
                    </View>
                </View>
        </SafeAreaView>
        )
    }
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
        flex: 1,
        //borderWidth: 10,
        //borderColor: "red",
        backgroundColor: "white",
        paddingHorizontal: moderateScale(74),
        paddingTop: moderateVerticalScale(44),
        alignItems: "center",
        //justifyContent: "center",
    },
    verificationCode: {
        height: 40,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        width: moderateScale(250),
        paddingTop: 4,
        fontSize: 15,
        paddingLeft: 5,
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

export default UserVerification