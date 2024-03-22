import { View, Text, StyleSheet } from 'react-native'
import UserLogin from "./src/screens/UserLogin"
import Listings from './src/screens/Listings'
import UserRegistration from './src/screens/UserRegistration'
import { NavigationContainer } from "@react-navigation/native"

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <UserLogin />
      </View>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App