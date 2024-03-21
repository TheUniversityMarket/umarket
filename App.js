import { View, Text, StyleSheet } from 'react-native'
import UserLogin from "./src/components/UserLogin"
import Listings from './src/components/Listings'

function App() {
  return (
    <View style={styles.container}>
      <UserLogin />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App