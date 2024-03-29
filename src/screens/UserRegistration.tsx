import { Text, View, StyleSheet, SafeAreaView, Pressable } from "react-native"
import { TextInput } from "react-native";

function UserRegistration() {
    const companyName = "UMarket";
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.registrationContainer}>
                <View style={styles.companyNameContainer}>
                    <Text style={styles.companyName}>{companyName}</Text>
                </View>
                <Text>Enter School Email</Text>
                <View style={styles.emailInputContainer}>
                    <View style={styles.inputContainers}>
                        <TextInput placeholder="School Email" keyboardType="email-address" autoCapitalize="none" style={{width: 395}} />
                    </View>
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
    registrationContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        //justifyContent: "center",
    },
    companyNameContainer: {
        alignItems: "center",
        marginTop: 37,
    },
    inputContainers: {
        //borderRadius: 50,
        padding: 10,
        width: 275,
        backgroundColor: "#e5e7eb",
    },
    companyName: {
        color: "#00CC00",
        fontSize: 73,
        fontWeight: "bold",
    },
    emailInputContainer: {
        gap: 10,
        flexDirection: "row",
        borderRadius: 3,
        borderColor: "black",
    }
})

export default UserRegistration