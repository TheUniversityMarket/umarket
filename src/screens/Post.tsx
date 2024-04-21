import { Header } from "@react-navigation/stack";
import { Text, Button, View, StyleSheet, SafeAreaView, Pressable, Image, Modal, TouchableOpacity, Platform} from "react-native"
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
import { BottomSheetSlideOutSpec } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionSpecs";
import 'react-datepicker/dist/react-datepicker.css';

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
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const options = ['New', 'Used', 'Worn'];
    const options2 = ['Monthly', 'Weekly', 'Daily', 'Biannual', 'Yearly'];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [housingOption, setHousingOption] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
      };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePress = (type) => {
    setSellType(type);
    setIsOpen(false);
    setSelectedOption(null);
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
                                <Text style={{fontSize:18, alignSelf:"center"}}>Items</Text>
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
                                <Text style={{fontSize:18, alignSelf:"center"}}>Clothing</Text>
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
                                <Text style={{fontSize:18, alignSelf:"center"}}>Housing</Text>
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
                                <Text style={{fontSize:18, alignSelf:"center"}}>Tickets</Text>
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
                        {(sellType=="Clothing" || sellType=="Item" || sellType=="Services" || sellType=="Tickets") && <Text style={styles.prodPriceTxt}>
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
                                textAlign: "auto",}}></Text>}
                            {housingOption=='Yearly' && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",}}>/ Year</Text>}
                            {housingOption=='Weekly' && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",}}>/ Week</Text>}
                            {housingOption=='Monthly' && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",}}>/ Month</Text>}
                            {housingOption=='Daily' && <Text style={{marginLeft: 10,
                                fontSize: 20,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",}}>/ Day</Text>}
                            {housingOption=='Biannual' && <Text style={{marginLeft: 10,
                                fontSize: 18,
                                color: "rgb(34 197 94)",
                                textAlign: "auto",}}>/ 6 Months</Text>}
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
                        {(sellType=="Clothing" || sellType=="Item") && <View style={{borderColor: "red", borderWidth: 1, marginLeft: 50, height: 200, width: 200}}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            
                                </View>
                        </View>}
                    </View>
                    <View style={styles.prodImgSuperContainer}>  
                        <Text style={styles.prodImgTxt}>
                            Add Picture:
                            <Pressable onPress={() => { // 
                                        
                                        }}>
                                <View style={styles.prodImgContainer}>
                                    <Text style= {{color: "white"}}>
                                        Img
                                    </Text>
                                </View>
                            </Pressable>
                        </Text> 
                        {sellType=="Clothing" && <View style={{marginLeft:150, borderColor:"red", borderWidth:1, width:250, height:40, flexDirection:"row", alignItems:"center"}}>
                            <Text style={{fontSize: 20,
                            color: "rgb(34 197 94)",
                            textAlign: "auto",
                            marginLeft:70}}>Size:</Text>
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
        alignItems: "flex-start",
        flexDirection:"row"
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
        zIndex: 1,
      },
      option: {
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },

});

//testing


//Getting Image

export default Post;