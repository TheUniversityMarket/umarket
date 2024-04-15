import React from 'react';
import { View, Text, Image, Pressable, Dimensions, StyleSheet, TurboModuleRegistry } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import SearchBar from './SearchBar'; // Import the SearchBar component from its correct location
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react"
import { useRoute } from "@react-navigation/native";


function scale(size: number) {
    return shortDimension / guidelineBaseWidth * size;
}
const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const companyName = "Market";

const MainHeader = ({}) => {
    const navigation = useNavigation()
    const handleSearch = (query: string) => {
        const obj = {
            q: query,
            h: true
        };
        console.log(query);
        navigation.navigate('Listings', { obj: obj });
    };
    
    
    return (
        <View style={styles.header}>
            <Image style={styles.logo} source={require('../screens/assets/logo.jpg')}></Image>
                <Text style={styles.compName}>
                            {companyName}
                </Text>
                {/* <Pressable onPress={() => navigation.navigate('Listings')}>
                    <View>
                        <Image style={styles.logo} source={require('./assets/logo.jpg')}></Image>
                        <Text style={styles.compName}>
                            {companyName}
                        </Text>
                    </View>
                </Pressable>
                 */}
                <View style={styles.search}>
                    <AntDesign name="search1" size={24} color="rgb(34 197 94)" />
                    <SearchBar onSearch={handleSearch} />
                </View>
                {/* <SearchBar onSearch={handleSearch}/> */}

                <View style={{alignItems: "flex-end", flex: 1, marginRight: 30}}>

                <View style={{flexDirection: "row", alignItems: "center"}}>

                    <Pressable onPress={() => navigation.navigate('Settings')} >
                    <View style={{alignItems: "flex-end", marginRight: 30, marginTop: 17}}>
                        <MaterialIcons name="account-circle" size={43} color="rgb(34 197 94)" />
                    </View>
                    </Pressable>

                    <View style={{alignItems: "flex-end", marginRight: 30, marginTop: 17}}>
                    <Entypo name="chat" size={43} color="rgb(34 197 94)" />
                    </View>

                    <Pressable onPress={() => navigation.navigate('Post')} >
                    <View style={{borderWidth: 3, borderColor: "rgb(34 197 94)", marginTop: 17, flexDirection: "row", alignItems: "center"}}>
                    <AntDesign name="pluscircleo" size={24} color="rgb(34 197 94)" style={{paddingLeft: 15, paddingRight: 7}}/>
                        <Text style={{color: "rgb(34 197 94)", fontWeight: "bold", paddingVertical: 15, paddingRight: 15, fontSize: 17}}>
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
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A9A9A9',
        backgroundColor: '#fbfbfb',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 20,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: 'rgb(34, 197, 94)',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
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
        //borderWidth: 10,
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
});

export default MainHeader;
