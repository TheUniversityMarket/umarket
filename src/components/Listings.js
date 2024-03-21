import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

function Listings() {
  const companyName = "UMarket"
  return (
    <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.compName}>
                    {companyName}
                </Text>
                <View style={styles.checkOut}>
                  <FontAwesome5 style={styles.shoppingCart} name="shopping-cart" size={24} color="rgb(34 197 94)" />
                </View>
                <StatusBar style="auto" />
            </View>
            <ScrollView horizontal>
              <View style={styles.products}>
                <Text style={styles.productsText}>
                  Products
                </Text>
              </View>
            </ScrollView>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "rgb(17 24 39)"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  header: {
    alignItems: "center", 
    paddingBottom: 20, 
    backgroundColor: "rgb(17 24 39)",
    //bottom: 15,
  },
  compName: {
    fontSize: 37,
    color: "rgb(34 197 94)",
    fontWeight: "bold",
  },
  checkOut: {
    alignSelf: "stretch",
    //borderWidth: 1,
    //borderColor: "red",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 15
  },
  shoppingCart: {
    //backgroundColor: "black",
    padding: 10,
    //borderRadius: 13,
    overflow: "hidden",
  },
  products: {
    flex: 1,
    //flexDirection: "row",
    padding: 10,
    //backgroundColor: "rgb(17 24 39)",
    borderWidth: 1,
    borderColor: "red",    
  },
  productsText: {
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "rgb(17 24 39)",
    color: "rgb(34 197 94)",
    fontSize: 23,
    overflow: "hidden",
    borderRadius: 20,
  },
});

export default Listings