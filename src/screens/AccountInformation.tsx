import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Dimensions, Alert } from "react-native"
import { useState } from 'react';
import { TextInput } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import React from "react";

//const school = "https://images.genius.com/018e964bd737e5d4600162dbcac48ce5.1000x1000x1.png" // School image will vary with different schools if we decide to expand later on.
const school = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png"

// resizing imports
const { width, height } = Dimensions.get('window');
import {scale, verticalScale, moderateScale, moderateVerticalScale} from '../components/Scaling';

let buttonProperties = {
    color1: "rgb(17 24 39)",
    color2: "rgb(34 197 94)"
}

function changeColor() {
    let x = buttonProperties.color1
    buttonProperties.color1 = buttonProperties.color2
    buttonProperties.color2 = x
}

function AccountInformation({ navigation, route }) {
    const companyName = "UMarket";
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

                        <View style={{ gap: 3, marginBottom: verticalScale(17)}}>



                            <View style={{alignItems: "flex-start", width: "100%"}}>
                                <Text style={{fontWeight: "bold", fontSize: moderateScale(13), marginBottom: 17, color:"rgb(17 24 39)"}}>First Name</Text>
                            </View>
                            <TextInput style={styles.verificationCode} placeholder="First Name" onChangeText={setFirstName} value={firstName} keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>



                            <View style={{alignItems: "flex-start", width: "100%", marginTop: 10}}>
                                <Text style={{fontWeight: "bold", fontSize: moderateScale(13), marginBottom: 17, color:"rgb(17 24 39)"}}>Last Name</Text>
                            </View>
                            <TextInput style={styles.verificationCode} placeholder="Last Name" onChangeText={setLastName} value={lastName} keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>

                            <View style={{alignItems: "flex-start", width: "100%", marginTop: 10}}>
                                <Text style={{fontWeight: "bold", fontSize: moderateScale(13), marginBottom: 17, color:"rgb(17 24 39)"}}>Phone Number</Text>
                            </View>
                            <TextInput style={styles.verificationCode} placeholder="Phone Number" onChangeText={setPhoneNumber} value={phoneNumber} keyboardType="email-address" placeholderTextColor={"#B3B3B3"}/>


                            <View style={{alignItems: "flex-start", width: "100%", marginTop: 10}}>
                                <Text style={{fontWeight: "bold", fontSize: moderateScale(13), marginBottom: 17, color:"rgb(17 24 39)"}}>Password</Text>
                            </View>
                            <TextInput style={styles.verificationCode} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry placeholderTextColor={"#B3B3B3"}/>


                            
                            <Pressable style={ ({ pressed }) => [
                                styles.button,
                                pressed && {backgroundColor: "green"}
                                ]}
                                onPress={handleSignUp}>
                                <Text style={styles.buttonText}>Create Account</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
        </SafeAreaView>
        )
    
        {/*
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.signUp}>UMarket</Text>
                    </View>
                    <View style={styles.registrationContainer}>
 
                        <View style={{ gap: 3, marginBottom: verticalScale(17)}}>



                            <View style={{alignItems: "flex-start", width: "100%"}}>
                                <Text style={{fontWeight: "bold", fontSize: moderateScale(17), marginBottom: 17, color:"rgb(17 24 39)"}}>First Name</Text>
                            </View>
                            <TextInput style={styles.verificationCode} placeholder="First Name" keyboardType="email-address" placeholderTextColor={"#B3B3B3"} />



                            <View style={{alignItems: "flex-start", width: "100%", marginTop: 10}}>
                                <Text style={{fontWeight: "bold", fontSize: moderateScale(17), marginBottom: 17, color:"rgb(17 24 39)"}}>Last Name</Text>
                            </View>
                            <TextInput style={styles.verificationCode} placeholder="Last Name" keyboardType="email-address" placeholderTextColor={"#B3B3B3"} />



                            <View style={{alignItems: "flex-start", width: "100%", marginTop: 10}}>
                                <Text style={{fontWeight: "bold", fontSize: moderateScale(17), marginBottom: 17, color:"rgb(17 24 39)"}}>Password</Text>
                            </View>
                            <TextInput style={styles.verificationCode} placeholder="Password" placeholderTextColor={"#B3B3B3"} secureTextEntry/>


                            
                            <Pressable style={ ({ pressed }) => [
                                styles.button,
                                pressed && {backgroundColor: "green"}
                                ]}
                                onPress={() => navigation.navigate('Home')}>
                                <Text style={styles.buttonText}>Create Account</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    */}
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

export default AccountInformation