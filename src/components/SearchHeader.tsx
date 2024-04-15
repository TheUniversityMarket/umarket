import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar'
import SearchBar from "../components/SearchBar";
import { Entypo } from '@expo/vector-icons';
import "c:/Users/nmoore/UMarket/umarket/src/components/DATA";

interface SearchHeaderProps {
    onSearch: (query: string) => void;
}

const companyName = "Market"
function scale(size: number) {
    return shortDimension / guidelineBaseWidth * size;
}
const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;


const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const navigation = useNavigation()

    const handleSearch = () => {
        navigation.navigate('Listings');
        onSearch(query);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('./assets/logo.jpg')}></Image>
                  <Text style={styles.compName}>
                      {companyName}
                  </Text>
            <AntDesign name="search1" size={24} color="rgb(34, 197, 94)" />
            <SearchBar onSearch={handleSearch}></SearchBar>
            <Pressable style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Search</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
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
        borderRadius: 5,
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

export default SearchHeader;