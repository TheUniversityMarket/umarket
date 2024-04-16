import React from 'react';
import { View, Text, Image, Pressable, Dimensions, StyleSheet, TurboModuleRegistry } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import SearchBar from './SearchBar'; // Import the SearchBar component from its correct location
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react"
import { useRoute } from "@react-navigation/native";

//on text change property
function scale(size: number) {
    return shortDimension / guidelineBaseWidth * size;
}
const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const companyName = "Market";

const MainHeader = ({isListing, onInput}) => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation()
    const handleSearch = (query: string) => {
        const obj = {
            q: query,
            h: true
        };
        const obj2 = obj;
        console.log(query);
        if (isListing) {
            const info = searchText;
            onInput(query);
        } else {
        navigation.navigate('Listings', { obj: obj });
        }
    };
    
    
    return (
        <View style={styles.header}>
            <Pressable onPress={() => navigation.navigate('Listings')}>
            <Image style={styles.logo} source={require('../screens/assets/logo.jpg')}></Image>
            </Pressable>
                  <Text style={styles.compName}>
                      {companyName}
                  </Text>
                  <View style={styles.search}>
                    <AntDesign name="search1" size={24} color="rgb(34 197 94)" />
                    <SearchBar isListings={isListing} onSearch={handleSearch}/>
                  </View>

                  <View style={{alignItems: "flex-end", marginRight: 30, marginLeft: 20}}>

                    <View style={{flexDirection: "row", alignItems: "center"}}>

                      <Pressable onPress={() => navigation.navigate('Settings')} >
                        <View style={{alignItems: "flex-end", marginRight: 30, marginTop: 17}}>
                          <MaterialIcons name="account-circle" size={43} color="rgb(34 197 94)" />
                        </View>
                      </Pressable>

                      <Pressable onPress={() => navigation.navigate('Chat')} >
                        <View style={{alignItems: "flex-end", marginRight: 30, marginTop: 17}}>
                          <Entypo name="chat" size={43} color="rgb(34 197 94)" />
                        </View>
                      </Pressable>

                    <Pressable onPress={() => navigation.navigate('Post')} >
                        <View style={{
                          borderWidth: 3,
                          borderColor: "rgb(34 197 94)",
                          marginTop: 17,
                          flexDirection: "row",
                          alignItems: "center",
                          borderRadius: 40, // Adjust this value to achieve the desired pill shape
                          paddingVertical: 10, // Ensure vertical padding is sufficient for a good appearance
                          paddingHorizontal: 15, // Adjust horizontal padding as needed
                        }}>
                          <AntDesign name="pluscircleo" size={24} color="rgb(34 197 94)" style={{ marginRight: 7 }}/>
                          <Text style={{
                            color: "rgb(34 197 94)",
                            fontWeight: "bold",
                            fontSize: 17
                          }}>
                            Post
                          </Text>
                        </View>
                    </Pressable>

                    </View>

                </View>
                <StatusBar style="auto" />
            </View>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      flexGrow: 1,
      backgroundColor: "white",
      overflow: "scroll"
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    header: {
      //justifyContent: "center",
      //paddingTop: 30,
      alignItems: "center",
      paddingBottom: 20, 
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "flex-start",
      borderBottomWidth: 1,
      borderBottomColor: "#d3d3d3",
      //bottom: 15,
    },
    logo: {
      width: 40,
      height: 60,
      marginLeft: 40,
      marginTop: 17,
    },
    compName: {
      fontSize: scale(17) < 20 ? 20 : scale(17),
      color: "rgb(34 197 94)",
      fontWeight: "bold",
      //width: "20%",
      marginTop: 15,
      paddingTop: 0,
    },
    search: {
      //width: scale(130),
      // borderWidth: 10,
      borderWidth: 1,
      borderColor: "#A9A9A9",
      backgroundColor: "#fbfbfb",
      borderRadius: 30,
      flexDirection: "row",
      padding: 10,
      marginTop: 15,
      height: 50,
      alignItems: "center",
      justifyContent: "flex-start",
      marginRight: 20,
      marginLeft: 50,
      flex: 4,

    },
    shoppingCart: {
      //backgroundColor: "black",
      padding: 10,
      //borderRadius: 13,
      //overflow: "hidden",
    },
    products: {
      // flex: 1,
      // flexDirection: "row",
      //padding: 10,
      width: (width/2),
      //backgroundColor: "rgb(17 24 39)",
      //borderWidth: 1,
      //borderColor: "red",    
    },
    productsText: {
      //height: 50,
      width: (width/2),
      //fontWeight: "bold",
      padding: 0,
      backgroundColor: "#e5e7eb",
      color: "black",
      fontSize: 23,
      //overflow: "hidden",
      // borderRadius: 20,
    },
    page: {
      flex: 1,
      alignContent: "center",
      alignItems: "center",
      //borderWidth: 1,
      // borderColor: "red",
      //flexDirection: "row",
      flexWrap: "wrap",
      overflow: "scroll",
    },
    item: {
      //borderWidth: 1,
      overflow: "hidden",
      padding: 0,
      marginVertical: 8,
      marginHorizontal: 10,
      //borderRadius: 25,
      //flexDirection: "row",
      //justifyContent: "space-around",
      textAlign: "center",
      fontFamily: 'Roboto',
      borderColor: "rgb(34 197 94)",
      //borderWidth: 1,
    },
  
    resultsContainer: {
      marginTop: 20,
      paddingHorizontal: 10,
      flex:1
    },
  
    tag: {
      backgroundColor: '#d3d3d3', // Grey background
      borderRadius: 15,           // Rounded corners for pill shape
      paddingVertical: 5,         // Vertical padding
      paddingHorizontal: 10,      // Horizontal padding
      marginRight: 5,             // Space between tags
      marginTop: 5,               // Margin top for space above
    },
    tagText: {
      color: 'black',             // Text color
      fontSize: 12,               // Font size
      fontWeight: "bold"
    }
});

export default MainHeader;
