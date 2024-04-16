import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Pressable, ImageBackground, Dimensions } from "react-native"
import { TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';

//const school = "https://images.genius.com/018e964bd737e5d4600162dbcac48ce5.1000x1000x1.png" // School image will vary with different schools if we decide to expand later on.
const school = "https://www.htmlcsscolor.com/preview/gallery/111827.png"

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

function UserRegistrationEmail() {
    const companyName = "UMarket";

    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleContinue = () => {
        navigation.navigate('UserVerfication', { email });
      };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <ImageBackground source={{uri: school}} style={styles.schoolBackGround}>
                    <Text style={styles.signUp}>UMarket</Text>
                </ImageBackground>
                <View style={styles.registrationContainer}>
                    <TextInput style={styles.emailInput} placeholder="Enter School Email" onChangeText={setEmail} value={email} keyboardType="email-address" />
                    <Pressable style={ ({ pressed }) => [
                        styles.button,
                        pressed && {backgroundColor: "green"}
                        ]}
                        onPress={handleContinue}
                        >
                        <Text style={styles.buttonText}>Continue</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "rgb(17 24 39)"
    },
    container: {
        flex: 1, 
        justifyContent: "space-between",
    },
    schoolBackGround: {
        height: moderateScale(200),
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    signUp: {
        fontSize: scale(73),
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
        width: 275,
        paddingTop: 4,
        fontSize: 15,
        paddingLeft: 5
    },
    button: {
        borderRadius: 3,
        alignItems: "center",
        width: 275,
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