import { Header } from "@react-navigation/stack";
import { Text, View, StyleSheet, SafeAreaView, Pressable } from "react-native"
import { TextInput } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";


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
    const companyName = "UMarket";
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [tags, setTags] = useState('');

    return (
         <SafeAreaView style={styles.safeContainer}>
             <View style={styles.container}>
                <Text style={styles.compName}>UMarket</Text>
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
})

//Getting Image

export default Post;