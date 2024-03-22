import { View, Text, StyleSheet } from 'react-native'
import UserLogin from "./src/screens/UserLogin"
import Listings from './src/screens/Listings'
import UserRegistration from './src/screens/UserRegistration'
import { enableScreens } from 'react-native-screens'

enableScreens();

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Login/SignUp'} component={UserLogin} />
        <Stack.Screen name={'Registration'} component={UserRegistration} />
        <Stack.Screen name={'Listings'} component={Listings} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App