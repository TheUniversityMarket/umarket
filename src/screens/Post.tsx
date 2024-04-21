import { Header } from "@react-navigation/stack";
import React from 'react'
import { Text, Button, View, StyleSheet, SafeAreaView, Pressable, Image, Modal, TouchableOpacity, Platform, Animated} from "react-native";
import { TextInput } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState, useEffect, useRef } from "react"
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
import { BottomSheetSlideOutSpec } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs";
import DateSelector from "../components/DatePicker";
import DatePicker from 'react-datepicker';


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

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000, // Adjust the duration as needed
          useNativeDriver: true,
        }
      ).start();
    }, [fadeAnim]);
  
    return (
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim,
        }}
      >
        {props.children}
      </Animated.View>
    );
  };

function Post({ navigation }) {
    const [sellType, setSellType] = useState("none");
    const companyName = "Market";
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [tags, setTags] = useState('');   
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const options = ['New', 'Used', 'Worn'];
    const options2 = ['Monthly', 'Weekly', 'Daily', 'Biannual', 'Yearly'];
    const options3 = ['Flat', 'Per Minute', 'Hourly', 'Daily'];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [housingOption, setHousingOption] = useState(null);
    const [serviceOption, setServiceOption] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
      };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePress = (type) => {
    setSellType(type);
    setIsOpen(false);
    setSelectedOption(null);
    setHousingOption(null);
    setServiceOption(null);
  }

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
//"#E5E4E2" - light grey
    const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

    const handleHousingOption = (option) => {
    setHousingOption(option);
    setIsOpen(false);
  };

  const handleServiceOption = (option) => {
    setServiceOption(option);
    setIsOpen(false);
  };
  
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  const handleConfirmDate = () => {
    // Handle the selected date
    hideDatePickerModal();
  };

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

    return (
         <SafeAreaView style={styles.safeContainer}>
            <MainHeader isListing={false} onInput={true}></MainHeader>
            <ScrollView contentContainerStyle={{flex: 1}}>
                <View style={{backgroundColor:"#E1E1E1", zIndex:1}}>
                    <View style={{alignSelf: "center", borderRadius:20, width:1000, height: 1500, borderColor: "red", borderWidth: 1, opacity:1, backgroundColor:"white", zIndex:999}}>
                <Text style={{fontSize: 40, marginLeft: 30, marginTop:25, fontWeight: 2}}>Post Your Item:</Text>
                <View style={styles.container}>
                    <View style={{borderColor:"red", borderWidth: 1, width: 800, height: 230, borderRadius: 30, marginTop: 20}}>
                        <Text style={{fontSize: 35, marginLeft: 20, fontWeight: 2}}>What type of item are you listing?</Text>
                        <View style={{alignSelf:"center", flexDirection: "row", justifyContent: "space-evenly", borderColor:"red", borderWidth: 1, width: 700, height: 140, borderRadius: 30, marginTop: 15, alignItems: "center"}}>
                        <Pressable
                            onPress={() => handlePress("Item")}>
                            <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 130, borderRadius: 20}}>
                                {sellType!="Item" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <MaterialIcons name="computer" size={50} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Item" && <View style={{borderColor: "red", borderWidth: 1, width: 100, height: 100, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <MaterialIcons name="computer" size={50} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:18, alignSelf:"center", fontWeight: 2}}>Items</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => handlePress("Clothing")}>
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
                                <Text style={{fontSize:18, alignSelf:"center", fontWeight: 2}}>Clothing</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => handlePress("Housing")}>
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
                                <Text style={{fontSize:18, alignSelf:"center", fontWeight: 2}}>Housing</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => handlePress("Tickets")}>
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
                                <Text style={{fontSize:18, alignSelf:"center", fontWeight: 2}}>Tickets</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => handlePress("Services")}>
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
                                <Text style={{fontSize:18, alignSelf:"center", fontWeight: 2}}>Services</Text>
                            </View>
                        </Pressable>
                        </View>
                    </View>
                    <FadeInView>
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
                        {(sellType=="Clothing" || sellType=="Item" || sellType=="Tickets") && <Text style={styles.prodPriceTxt}>
                            Listing Price:  
                            <View style={styles.prodPriceContainer}>
                                <TextInput style={styles.prodPriceIn}
                                placeholder="$$$"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                            </View>
                        </Text>}
                        {sellType=="Housing" && <Text style={styles.prodPriceTxt}>
                            Price:
                            <View style={styles.prodPriceContainer}>
                                <TextInput style={styles.prodPriceIn}
                                placeholder="$$$"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                            </View>
                            {housingOption==null && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}></Text>}
                            {housingOption=='Yearly' && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Year</Text>}
                            {housingOption=='Weekly' && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Week</Text>}
                            {housingOption=='Monthly' && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Month</Text>}
                            {housingOption=='Daily' && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Day</Text>}
                            {housingOption=='Biannual' && <Text style={{marginLeft: 10,
                                fontSize: 18,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ 6 Months</Text>}
                        </Text>}
                        {sellType=="Services" && <Text style={styles.prodPriceTxt}>
                            Price:
                            <View style={styles.prodPriceContainer}>
                                <TextInput style={styles.prodPriceIn}
                                placeholder="$$$"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                            </View>
                            {serviceOption==null && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",}}></Text>}
                            {serviceOption=="Per Minute" && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",}}>/ Minute</Text>}
                            {serviceOption=="Hourly" && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",}}>/ Hour</Text>}
                            {serviceOption=="Daily" && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",}}>/ Day</Text>}
                            {serviceOption=="Flat" && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",}}>/ Service</Text>}
                        </Text>}
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
                    <View style={[styles.prodDesSuperContainer]}>  
                        <Text style={styles.prodDesTxt}>
                            Enter Brief Description:{"\n"}
                            <View style={styles.prodDesContainer}>
                                <TextInput style={styles.prodDesIn}
                                placeholder="Enter Descrition"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                            </View>
                        </Text> 
                        {(sellType=="Clothing" || sellType=="Item") && <View style={{borderColor: "red", borderWidth: 1, marginLeft: 50, height: 200, width: 200}}>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                                {selectedOption==null && <Text style={styles.buttonText}>{`${sellType} Condition:`}</Text>}
                                {selectedOption=="New" && <Text style={{fontSize:17, color:"green"}}>{selectedOption}</Text>}
                                {selectedOption=="Used" && <Text style={{fontSize:17, color:"light-grey"}}>{selectedOption}</Text>}
                                {selectedOption=="Worn" && <Text style={{fontSize:17, color:"grey"}}>{selectedOption}</Text>}
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.dropdown}>
                                {options.map((option, index) => (
                                    <TouchableOpacity
                                    key={index}
                                    style={styles.option}
                                    onPress={() => handleSelectOption(option)}
                                    >
                                    <Text>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                                </View>
                            )}
                            </View>
                        </View>}
                        {sellType=="Housing" && <View style={{borderColor: "red", borderWidth: 1, marginLeft: 50, height: 200, width: 200}}>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                                {housingOption==null && <Text style={styles.buttonText}>{'Payment Timing:'}</Text>}
                                {housingOption=="Daily" && <Text style={{fontSize:17, color:"black"}}>{housingOption}</Text>}
                                {housingOption=="Weekly" && <Text style={{fontSize:17, color:"black"}}>{housingOption}</Text>}
                                {housingOption=="Monthly" && <Text style={{fontSize:17, color:"black"}}>{housingOption}</Text>}
                                {housingOption=="Biannual" && <Text style={{fontSize:17, color:"black"}}>{housingOption}</Text>}
                                {housingOption=="Yearly" && <Text style={{fontSize:17, color:"black"}}>{housingOption}</Text>}
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.dropdown}>
                                {options2.map((option, index) => (
                                    <TouchableOpacity
                                    key={index}
                                    style={styles.option}
                                    onPress={() => handleHousingOption(option)}
                                    >
                                    <Text>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                                </View>
                            )}
                            </View>
                        </View>}
                        {(sellType=="Tickets") && <View style={{flexDirection: "column", borderColor: "red", borderWidth: 1, marginLeft: 30, height: 200, width: 240}}>
                        <View style={{ flex:1, alignItems: 'center', opacity: 1, zIndex:999, borderWidth:1, borderColor:"red"}}>
                        <Text style={{fontSize:20, color:"green", marginTop: 10}}>Event Date:</Text>
                        <DateSelector></DateSelector>
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", flex:1}}>
                        <Text style={{fontSize: 20,
                            color: "rgb(34 197 94)",
                            textAlign: "auto",
                           }}>Event Time:</Text>
                        <View style={{marginLeft: 10,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: "red",
                                    width: 90,
                                    height: 40,
                                }}>
                                <TextInput style={styles.prodPriceIn}
                                placeholder="12:00 pm"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                        </View>
                        </View>
                        </View>}
                        {sellType=="Services" && <View style={{borderColor: "red", borderWidth: 1, marginLeft: 50, height: 200, width: 200}}>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                                {serviceOption==null && <Text style={styles.buttonText}>{'Pricing:'}</Text>}
                                {serviceOption=="Flat" && <Text style={{fontSize:17, color:"black"}}>{serviceOption}</Text>}
                                {serviceOption=="Per Minute" && <Text style={{fontSize:17, color:"black"}}>{serviceOption}</Text>}
                                {serviceOption=="Hourly" && <Text style={{fontSize:17, color:"black"}}>{serviceOption}</Text>}
                                {serviceOption=="Daily" && <Text style={{fontSize:17, color:"black"}}>{serviceOption}</Text>}
                                {serviceOption=="Yearly" && <Text style={{fontSize:17, color:"black"}}>{serviceOption}</Text>}
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.dropdown}>
                                {options3.map((option, index) => (
                                    <TouchableOpacity
                                    key={index}
                                    style={styles.option}
                                    onPress={() => handleServiceOption(option)}
                                    >
                                    <Text>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                                </View>
                            )}
                            </View>
                        </View>}
                    </View>
                    {sellType=="Tickets" && <View style={{marginTop: 30,
                        width:  200,
                        borderWidth:1,
                        borderColor: "green",
                        alignItems: "flex-start",
                        flexDirection:"row",
                        zIndex:1, alignSelf: "flex-start"}}>
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
                    </View>}
                    {sellType!="Tickets" && <View style={styles.prodImgSuperContainer}>
                        <View style={{alignContent:"center", flexDirection:"row", alignItems: "center", borderWidth:1, borderColor:'red'}}>  
                        <Text style={{fontSize: 20,
                            color: "rgb(34 197 94)",
                            textAlign: "auto",
                            marginLeft:10,
                            fontWeight:2}}>
                            Add Picture:
                            <Pressable onPress={() => {ImagePicker}}>
                                <View>
                                {/* <View style={styles.prodImgContainer}>
                                    <Text style= {{color: "white"}}>
                                        Img
                                    </Text>
                                </View> */}
                                <ImagePicker />
                                </View>
                            </Pressable>
                        </Text> 
                        </View>
                        {sellType=="Clothing" && <View style={{marginLeft:150, borderColor:"red", borderWidth:1, width:250, height:40, flexDirection:"row", alignItems:"center"}}>
                            <Text style={{fontSize: 20,
                            color: "rgb(34 197 94)",
                            textAlign: "auto",
                            marginLeft:70,
                            fontWeight:2}}>Size:</Text>
                            <View style={styles.prodPriceContainer}>
                                <TextInput style={styles.prodPriceIn}
                                placeholder="XS"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                            </View>
                        </View>}
                        {sellType=="Housing" && <View style={{marginLeft:140, borderColor:"red", borderWidth:1, width:280, height:40, flexDirection:"row", alignItems:"center"}}>
                            <Text style={{fontSize: 20,
                            color: "rgb(34 197 94)",
                            textAlign: "auto",
                            fontWeight:2,
                            marginLeft:35}}>Lease Length:</Text>
                            <View style={{marginLeft: 10,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: "red",
                                    width: 95,
                                    height: 40,
                                }}>
                                <TextInput style={styles.prodPriceIn}
                                placeholder="6 months"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                            </View>
                        </View>}
                    </View>}
                    <View style={styles.prodPostSuperContainer}>  
                        <View> 
                            <Pressable onPress={() => {navigation.navigate('Listings');
                                }}>
                                    <View style={styles.prodImgContainer}>                                  
                                <Text style={{color:"white", fontWeight:2}}>Post</Text>
                                </View>  
                            </Pressable>
                        </View>
                        </View>
                    </View>}
                    </FadeInView>
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
        marginLeft: 10,
        fontWeight: 2
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
        alignContent:"center",
        zIndex:99
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
        marginLeft: 10,
        fontWeight:2
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
        borderColor: "green",
        alignItems: "center",
        flexDirection:"row",
        zIndex:1,
        alignContent:"center",
        
    },

    prodImgTxt: {
        fontSize: 20,
        color: "rgb(34 197 94)",
        textAlign: "auto",
        marginLeft:10,
        fontWeight:2
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
        backgroundColor: "rgb(34 197 94)",
        zIndex: 1
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
        fontWeight:2
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
        fontWeight:2
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
        fontWeight:2
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
    radialButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      optionButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginVertical: 5,
      },
      optionButtonSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      dropdownButton: {
        backgroundColor: 'rgb(34 197 94)',
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 20,
        borderWidth:1,
        borderColor:"red",
        marginTop: 10
      },
      dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginTop: 5,
        zIndex: 9999,
      },
      option: {
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontWeight:2
      },
      fadeInView: {
        width: 200,
        height: 200,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
      }

});

export default Post;