import { Text, View, StyleSheet, SafeAreaView, Pressable } from "react-native"

function UserRegistration() {
    return (
        <SafeAreaView style={styles.safeContainer}>
                <Text>Create an account</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "rgb(17 24 39)"
    },
})

export default UserRegistration