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

function UserRegistrationEmail() {
    const companyName = "UMarket";

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
                    <Text style={{fontWeight: "bold", fontSize: 25, marginBottom: 7, color:"rgb(17 24 39)"}}>Account Type</Text>
                    <View style={{flexDirection: "row", gap: 30, marginBottom: verticalScale(7)}}>
                        <Pressable style={ ({ pressed }) => [
                        {backgroundColor: "rgb(34 197 94)", padding: 13,borderRadius: 100, alignItems: "center"},
                        pressed && changeColor()
                        ]}>
                            <View>
                                <FontAwesome5 name="user-alt" size={24} color={buttonProperties.color1} />
                            </View>
                            <View style={{alignItems: "center", marginTop: 3}}>
                                <Text style={{fontWeight: "bold", color: "rgb(17 24 39)"}}>Single</Text>
                            </View>
                        </Pressable>
                        <Pressable style={ ({ pressed }) => [
                        {backgroundColor: "rgb(34 197 94)", padding: 13,borderRadius: 100, alignItems: "center"},
                        pressed && {backgroundColor: "rgb(17 24 39)"}
                        ]}>
                            <View>
                                <FontAwesome6 name="user-group" size={24} color="rgb(17 24 39)" />
                            </View>
                            <View style={{alignItems: "center", marginTop: 3}}>
                                <Text style={{fontWeight: "bold", color: "rgb(17 24 39)"}}>Group</Text>
                            </View>
                        </Pressable>
                    </View>
                    <TextInput style={styles.emailInput} placeholder="Enter School Email" keyboardType="email-address" />
                    <Pressable style={ ({ pressed }) => [
                        styles.button,
                        pressed && {backgroundColor: "green"}
                        ]}>
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