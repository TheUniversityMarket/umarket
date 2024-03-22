import { useState } from "react"
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";

function UserLogin({ navigation }) {
  const companyName = "UMarket"; //name of company
  const [name, setEmail] = useState('');

  function button(text: String) {
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
          autoCapitalize="none" secureTextEntry>  
              </TextInput>
            </View>
            <View style={{ alignItems: "flex-end" }}>
                <Pressable>
                    <Text style={{ color: "rgb(34 197 94)", fontSize: 13 }}>forgot password?</Text>
                </Pressable>
            </View>
          </View>
          </View>
            {/* ^ Displays password entry */}

            <Pressable style={ ({ pressed }) => [
              styles.button,
              pressed && {backgroundColor: "green"}
            ]} onPress={() => navigation.navigate('Listings')}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            {/* login button */}

            <Text style={{ color: "rgb(34 197 94)", marginTop: 7, marginBottom: 7, fontWeight: "bold" }}>or</Text>

            <Pressable style={ ({ pressed }) => [
            styles.button,
            pressed && {backgroundColor: "green"}
            ]}>
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
    backgroundColor: "rgb(17 24 39)",
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
    fontSize: 73,
    color: "rgb(34 197 94)",
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
    borderRadius: 3,
    backgroundColor: "white",
    width: 275,
    height: 25,
  },
  emailInput: {
    paddingTop: 4,
    fontSize: 15,
    paddingLeft: 5
    //textAlign: 'center',
  },
  loginPassword: {
    marginTop: 10,
    //flexDirection: "row",
    marginBottom: 17,
  },
  password: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    paddingRight: 10,
  },
  passwordInputContainer: {
    borderRadius: 3,
    backgroundColor: "white",
    width: 275,
    height: 25,
    marginBottom: 7,
  },
  passwordInput: {
    paddingTop: 4,
    fontSize: 15,
    //textAlign: "center",
    paddingLeft: 5,
  },
  button: {
    borderRadius: 3,
    alignItems: "center",
    width: 275,
    marginTop: 0,
    backgroundColor: "rgb(34 197 94)",
    padding: 7,
  },
  buttonText: {
    fontWeight: "bold",
    color: "rgb(17 24 39)",
    fontSize: 22,
  }
})

export default UserLogin