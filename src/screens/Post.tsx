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
import MainHeader from "../components/MainHeader";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ImagePicker from "../components/ImagePicker";
        
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

//check
function Post({ navigation }) {
    const [sellType, setSellType] = useState("none");
    const companyName = "Market";
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [tags, setTags] = useState('');   
//"#E5E4E2" - light grey
    return (
         <SafeAreaView style={styles.safeContainer}>
            <MainHeader isListing={false} onInput={true}></MainHeader>
            <ScrollView contentContainerStyle={{flex: 1}}>
                <View>
                    <View style={{alignSelf: "center", width:1000, height: 1500, borderColor: "red", borderWidth: 1, marginTop: 10}}>
                <Text style={{fontSize: 40, marginLeft: 30, marginTop:25}}>Post Your Item:</Text>
                <View style={styles.container}>
                    <View style={{borderColor:"red", borderWidth: 1, width: 800, height: 230, borderRadius: 30, marginTop: 20}}>
                        <Text style={{fontSize: 35, marginLeft: 20}}>What type of item are you listing?</Text>
                        <View style={{alignSelf:"center", flexDirection: "row", justifyContent: "space-evenly", borderColor:"red", borderWidth: 1, width: 700, height: 140, borderRadius: 30, marginTop: 15, alignItems: "center"}}>
                        <Pressable
                            onPress={() => setSellType("Items")}>
                            <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 130, borderRadius: 20}}>
                                {sellType!="Items" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <MaterialIcons name="computer" size={50} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Items" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <MaterialIcons name="computer" size={50} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:18, alignSelf:"center"}}>Items</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => setSellType("Clothing")}>
                            <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 130, borderRadius: 20}}>
                                {sellType!="Clothing" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <Ionicons name="shirt-outline" size={50} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Clothing" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <Ionicons name="shirt-outline" size={50} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:18, alignSelf:"center"}}>Clothing</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => setSellType("Housing")}>
                            <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 130, borderRadius: 20}}>
                                {sellType!="Housing" &&<View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <AntDesign name="home" size={50} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Housing" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <AntDesign name="home" size={50} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:18, alignSelf:"center"}}>Housing</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => setSellType("Tickets")}>
                            <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 130, borderRadius: 20}}>
                                {sellType!="Tickets" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <Ionicons name="ticket-outline" size={50} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Tickets" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <Ionicons name="ticket-outline" size={50} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:18, alignSelf:"center"}}>Tickets</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => setSellType("Services")}>
                            <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 130, borderRadius: 20}}>
                                {sellType!="Services" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <Feather name="scissors" size={50} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Services" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <Feather name="scissors" size={50} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:18, alignSelf:"center"}}>Services</Text>
                            </View>
                        </Pressable>
                        </View>
                    </View>  
                    {sellType!="none" && <View style={{borderWidth:1,
        borderColor: "red", width: 600, alignItems: "center"}}>
                        <View style={styles.prodNameSuperContainer}>
                        <Text style={styles.prodNameTxt}>
                            Listing Title:
                            <View style={styles.prodNameContainer}>
                                <TextInput style={styles.prodNameIn}
                                placeholder="Enter Title"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                            </View>
                        </Text>   
                    {/* </View> */}
                    {/* <View style={styles.prodPriceSuperContainer}>   */}
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
                            Add Tags:
                            <View style={styles.prodTagsContainer}>
                                <TextInput style= {styles.prodTagsIn}
                                placeholder="Eg: Books, Appliances, Fridges..."
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                            </View>
                        </Text> 
                    </View>
                    <View style={styles.prodDesSuperContainer}>  
                        <Text style={styles.prodDesTxt}>
                            Enter Brief Description:{"\n"}
                            <View style={styles.prodDesContainer}>
                                <TextInput style={styles.prodDesIn}
                                placeholder="Enter Descrition"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                            </View>
                        </Text> 
                        {(sellType=="Clothing" || sellType=="Items") && <View style={{borderColor: "red", borderWidth: 1, marginLeft: 50, height: 200, width: 200}}>
                            
                            </View>}
                    </View>
                    <View style={styles.prodImgSuperContainer}>  
                        <Text style={styles.prodImgTxt}>
                            Add Picture:
                            <Pressable onPress={() => {ImagePicker}}>
                                {/* <View style={styles.prodImgContainer}>
                                    <Text style= {{color: "white"}}>
                                        Img
                                    </Text>
                                </View> */}
                                <ImagePicker />
                            </Pressable>
                        </Text> 
                    </View>
                    <View style={styles.prodPostSuperContainer}>  
                        <View> 
                            <Pressable onPress={() => {navigation.navigate('Listings');
                                }}>
                                    <View style={styles.prodImgContainer}>                                  
                                <Text style={{color:"white"}}>Post</Text>
                                </View>  
                            </Pressable>
                        </View>
                        </View>
                    </View>}
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
        alignItems: "center",
        borderWidth: 1
    },

    compName: {
        fontSize: 37,
        color: "rgb(34 197 94)",
        fontWeight: "bold",
        textAlign: "center",
    },

    prodNameSuperContainer: {
        marginTop: 20,
        width: 600,
        height: 70,
        borderWidth:1,
        borderColor: "purple",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        flex:1,
        alignContent:"center"

    },

    prodNameTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        marginLeft: 10
    },

    prodNameContainer: {
        marginLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        width: 190, 
        height: 40,
        
    },

    prodNameIn: {
        fontSize: 17,
        padding: 10
    },

    prodPriceSuperContainer: {
        marginTop: 20,
        width: 500,
        height: 70,
        borderWidth:1,
        borderColor: "purple",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        flex:1,
        alignContent:"center"
    },

    prodPriceTxt: {
        marginLeft: 55,
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
    },

    prodPriceContainer: {
        marginLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "red",
        width: 60,
        height: 40,
    },

    prodPriceIn: {
        fontSize: 17,
        padding: 10,
    },

    prodDesSuperContainer: {
        marginTop: 30,
        width: 600,
        borderWidth:1,
        borderColor: "red",
        height: 200,
        flexDirection: "row"
    },

    prodDesTxt: {
        fontSize: 20,
        marginTop: 10,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        marginLeft: 10
    },
    
    prodDesContainer: {
        marginLeft: 0,
        marginTop: 5,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "red",
        width: 300,
        height: 100,

    },

    prodDesIn: {
        fontSize: 17,
        padding: 10
    },

    prodImgSuperContainer: {
        marginTop: 30,
        width:  600,
        borderWidth:1,
        borderColor: "red",
        alignItems: "flex-start"
    },

    prodImgTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        marginLeft:10
    },

    prodImgContainer: {
        marginLeft: 10,
        padding: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "grey",
        width: 50,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(34 197 94)"
    },

    prodImgIn: {
    },

    prodTagsSuperContainer: {
        marginTop: 30,
        width: 600,
        height: 70,
        borderWidth:1,
        borderColor: "purple",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        flex:1,
        alignContent:"center"

    },

    prodTagsTxt: {
        marginLeft: 10,
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
    },

    prodTagsContainer: {
        marginLeft: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "",
        width: 447,
        height: 40
    },

    prodTagsIn: {
        fontSize: 17,
        padding: 10
    },

    prodPostSuperContainer: {
        alignContent: "center",
        justifyContent: "center",
        height: 100
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

//testing


//Getting Image

export default Post;