import { Header } from "@react-navigation/stack";
import { Text, View, StyleSheet, SafeAreaView, Pressable, Image } from "react-native"
import { TextInput } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import SearchBar from "../components/SearchBar";
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from "react-native-gesture-handler";

// import { AntDesign } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const { width, height } = Dimensions.get('window');
// const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

// function scale(size: number) {
//     return shortDimension / guidelineBaseWidth * size;
// }
// function verticalScale(size: number) {
//     return longDimension / guidelineBaseHeight * size;
// }
// function moderateScale(size: number, factor = 0.5) {
//     return size + (scale(size) - size) * factor;
// }
// function moderateVerticalScale(size: number, factor = 0.5) {
//     return size + (verticalScale(size) - size) * factor;
// }


function Post({ navigation }) {
    const companyName = "Market";
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [tags, setTags] = useState('');

    return (
         <SafeAreaView style={styles.safeContainer}>

            <View style={styles.header}>
                <Pressable onPress={() => navigation.navigate('Listings')}>
                    <View>
                        <Image style={styles.logo} source={require('./assets/logo.jpg')}></Image>
                        <Text style={styles.compName}>
                            {companyName}
                        </Text>
                    </View>
                </Pressable>
                
                <View style={styles.search}>
                <AntDesign name="search1" size={24} color="rgb(34 197 94)" />
                {/* <SearchBar onSearch={handleSearch}/> */}
                </View>

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

            <ScrollView contentContainerStyle={{flex: 1}}>
                <View style={styles.container}>
                    <Text style={styles.compName}>UMarket</Text>
                    <View style={styles.prodNameSuperContainer}>  
                        <Text style={styles.prodNameTxt}>
                            Listing Title: {"\n"}
                            <View style={styles.prodNameContainer}>
                                <TextInput style={styles.prodNameIn}
                                placeholder="Enter Title"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                            </View>
                        </Text>   
                    </View>
                    <View style={styles.prodPriceSuperContainer}>  
                        <Text style={styles.prodPriceTxt}>
                            Listing Price:  
                            <View style={styles.prodPriceContainer}>
                                <TextInput style={styles.prodPriceIn}
                                placeholder="$$$"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                            </View>
                        </Text> 
                    </View>
                    <View style={styles.prodTagsSuperContainer}>  
                        <Text style={styles.prodTagsTxt}>
                            Add Tags:{"\n"}
                            <View style={styles.prodTagsContainer}>
                                <TextInput style= {styles.prodTagsIn}
                                placeholder="Eg: Books, Appliances, Fridges..."
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                            </View>
                        </Text> 
                    </View>
                    <View style={styles.prodDesSuperContainer}>  
                        <Text style={styles.prodPriceTxt}>
                            Enter Brief Description: {"\n"}
                            <View style={styles.prodDesContainer}>
                                <TextInput style={styles.prodDesIn}
                                placeholder="Enter Descrition"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                            </View>
                        </Text> 
                    </View>
                    <View style={styles.prodImgSuperContainer}>  
                        <Text style={styles.prodImgTxt}>
                            Add Picture:
                            <View style={styles.prodImgContainer}>
                                <Text style= {{color: "#B3B3B3"}}>
                                    <Pressable style={ ({ pressed }) => [
                                    styles.button,
                                    pressed && {backgroundColor: "green"}
                                    ]} onPress={() => { // 
                                    
                                    }}>Img
                                    </Pressable>
                                </Text>
                            </View>
                        </Text> 
                    </View>
                    <View style={styles.prodPostSuperContainer}>  
                        <View style={styles.prodPostContainer}>
                            <Text style= {styles.buttonText}> 
                            <Pressable style={ ({ pressed }) => [
                                styles.button,
                                pressed && {backgroundColor: "green"}
                                ]} onPress={() => {navigation.navigate('Listings');
                                }}>
                                <Text style={styles.buttonText}>Post</Text>
                            </Pressable>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>


    )
}

function button(text: String) { // A function to make buttons. Will allow to add functionality to buttons later. 
    return (
        <Pressable style={ ({ pressed }) => [
            styles.button,
            pressed && {backgroundColor: "green"}
            ]}>
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    )
  }

  function submitForm(Answers) {

  }
  
/*
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "white",
        overflow: "scroll"
    },

    container: {
        color : "white"
    },

    compName: {
        fontSize: 37,
        color: "rgb(34 197 94)",
        fontWeight: "bold",
        textAlign: "center",
    },

    prodNameSuperContainer: {
        marginTop: 20,
    },

    prodNameTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        paddingLeft: 10,
    },

    prodNameContainer: {
        marginLeft: 7,
        padding: 7,
        borderRadius: 3,
        backgroundColor: "#e5e7eb",
        width: 225,
        height: 40,
    },

    prodNameIn: {
        fontSize: 17,
        paddingLeft: 2,
    },

    prodPriceSuperContainer: {
        marginTop: 20,
    },

    prodPriceTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        paddingLeft: 10,
    },

    prodPriceContainer: {
        marginTop: 10,
        marginLeft: 7,
        padding: 7,
        borderRadius: 3,
        backgroundColor: "#e5e7eb",
        width: 50,
        height: 40,
    },

    prodPriceIn: {
        fontSize: 17,
        paddingLeft: 2,
    },

    // prodPrice$: {
    //     fontSize: 17,
    //     paddingLeft: 2,
    //     color: "rgb(34 197 94)",
    // },

    prodDesSuperContainer: {
        marginTop: 30,
    },

    prodDesTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        paddingLeft: 10,
        marginRight: 10,
    },

    prodDesContainer: {
        marginLeft: 0,
        marginTop: 5,
        padding: 7,
        borderRadius: 3,
        backgroundColor: "#e5e7eb",
        width: 600,
        height: 100,
    },

    prodDesIn: {
        fontSize: 17,
        paddingLeft: 2,
    },
//
    prodImgSuperContainer: {
        marginTop: 30,
    },

    prodImgTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        paddingLeft: 10,
        marginRight: 10,
    },

    prodImgContainer: {
        marginLeft: 5,
        padding: 7,
        borderRadius: 3,
        backgroundColor: "#e5e7eb",
        width: 50,
        height: 40,
    },

    prodImgIn: {
    },

    prodTagsSuperContainer: {
        marginTop: 40,
    },

    prodTagsTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        paddingLeft: 10,
        marginRight: 10,
    },

    prodTagsContainer: {
        marginLeft: 5,
        padding: 7,
        borderRadius: 3,
        backgroundColor: "#e5e7eb",
        width: 600,
        height: 75,
    },

    prodTagsIn: {
        fontSize: 17,
        paddingLeft: 2,
    },
//
    prodPostSuperContainer: {
        marginTop: 50,
        alignContent: "center"
    },

    prodPostTxt: {
        fontSize: 20,
        color: "#808080",
        textAlign: "auto",
        paddingLeft: 10,
        marginRight: 10,
    },

    prodPostContainer: {
        marginLeft: 5,
        padding: 7,
        borderRadius: 3,
        backgroundColor: "#339933",
        width: 80,
        height: 40,
    },

    button: {
    },

    buttonText: {
        color: "white",
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
      search: {
        //width: scale(130),
        // borderWidth: 10,
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
        marginLeft: 20,
      },
})
*/

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "white",
        overflow: "scroll",
    },

    container: {
        color : "white",
    },

    compName: {
        fontSize: 37,
        color: "rgb(34 197 94)",
        fontWeight: "bold",
        textAlign: "center",
    },

    prodNameSuperContainer: {
        marginTop: 20,
        marginLeft: "20%",
        width: "60%",
    },

    prodNameTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        paddingLeft: 10,
    },

    prodNameContainer: {
        marginLeft: 0,
        marginTop: 5,
        padding: 7,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "Black",
        width: "100%",
        height: 40,
    },

    prodNameIn: {
        fontSize: 17,
        paddingLeft: 2,
    },

    prodPriceSuperContainer: {
        marginTop: 20,
        marginLeft: "20%",
        width: "60%",
    },

    prodPriceTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        paddingLeft: 10,
    },

    prodPriceContainer: {
        marginTop: 10,
        marginLeft: 7,
        padding: 7,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "black",
        width: "70%",
        height: 40,
    },

    prodPriceIn: {
        fontSize: 17,
        paddingLeft: 2,
    },

    prodDesSuperContainer: {
        marginTop: 30,
        marginLeft: "20%",
        width: "60%",
    },

    prodDesTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        paddingLeft: 10,
        marginRight: 10,
    },

    prodDesContainer: {
        marginLeft: 0,
        marginTop: 5,
        padding: 7,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "Black",
        width: "100%",
        height: 100,
    },

    prodDesIn: {
        fontSize: 17,
        paddingLeft: 2,
    },

    prodImgSuperContainer: {
        marginTop: 30,
        marginLeft: "20%",
        width: "60%",
    },

    prodImgTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        paddingLeft: 10,
        marginRight: 10,
    },

    prodImgContainer: {
        marginLeft: 5,
        padding: 7,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "Black",
        width: 50,
        height: 40,
    },

    prodImgIn: {
    },

    prodTagsSuperContainer: {
        marginTop: 40,
        marginLeft: "20%",
        width: "60%",
    },

    prodTagsTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        paddingLeft: 10,
        marginRight: 10,
    },

    prodTagsContainer: {
        marginLeft: 0,
        marginTop: 5,
        padding: 7,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "Black",
        width: "100%",
        height: 75,
    },

    prodTagsIn: {
        fontSize: 17,
        paddingLeft: 2,
    },

    prodPostSuperContainer: {
        marginTop: 50,
        alignContent: "center",
    },

    prodPostTxt: {
        fontSize: 20,
        color: "#808080",
        textAlign: "auto",
        paddingLeft: 10,
        marginRight: 10,
        alignSelf: "center",
    },

    prodPostContainer: {
        marginLeft: 5,
        padding: 7,
        borderRadius: 3,
        backgroundColor: "#339933",
        width: 80,
        height: 40,
        alignSelf: "center",
    },

    button: {
        alignSelf: "center",
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
    },
    header: {
        alignItems: "center",
        paddingBottom: 20, 
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#d3d3d3",
        marginLeft: 40,
        marginTop: 17,
    },
    logo: {
        width: 40,
        height: 60,
    },
    search: {
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
        marginLeft: 20,
    },
});




//Getting Image

export default Post;