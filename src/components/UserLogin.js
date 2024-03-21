import { useState } from "react"
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable } from "react-native"

function UserLogin() {
  const companyName = "UMarket";
  const [name, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.compName}>
            {companyName}
          </Text>
        </View>
        <View style={styles.login}>


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
          </View>
          </View>


            <Pressable style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>


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
  title: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  compName: {
    fontWeight: "bold",
    fontSize: 73,
    color: "rgb(34 197 94)",
  },
  login: {
    justifyContent: "top",
    flex: 1,
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
    textAlign: 'center',
  },
  loginPassword: {
    marginTop: 10,
    //flexDirection: "row",
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
  },
  passwordInput: {
    paddingTop: 4,
    fontSize: 15,
    textAlign: "center",
  },
  loginButton: {
    borderRadius: 3,
    alignItems: "center",
    width: 275,
    marginTop: 17,
    backgroundColor: "rgb(34 197 94)",
    padding: 7,
  },
  loginButtonText: {
    fontWeight: "bold",
    color: "rgb(17 24 39)",
    fontSize: 22,
  }
})

export default UserLogin