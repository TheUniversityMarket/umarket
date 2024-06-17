import { Header } from "@react-navigation/stack";
import React from 'react'
import { Text, Button, View, useWindowDimensions, Dimensions, StyleSheet, SafeAreaView, Pressable, Image, Modal, TouchableOpacity, Platform, Animated} from "react-native";
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
import { scale, verticalScale, moderateScale, moderateVerticalScale } from "../components/Scaling";
import { db, storage } from '../firebase/firebaseConfig';
import { Listing, Item, Service, Clothing, Housing, Tickets } from '../models/listing';
import { collection, setDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import {useAuth} from "../context/AuthContext"

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
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [tags, setTags] = useState('');   
    const [images, setImages] = useState([]);
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
    const {height, width, fontScale} = useWindowDimensions();
    const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];
    const guidelineBaseWidth = 350;
    const guidelineBaseHeight = 680;
    function scale(size: number) {
        return shortDimension / guidelineBaseWidth * size;
    }
    function verticalScale(size: number) {
        return longDimension / guidelineBaseHeight * size;
    }
    function moderateScale(size: number, factor = 0.5) {
        return size + (scale(size) - size) * factor;
    }
    function moderateVerticalScale(size: number, factor = 0.5) {
        return size + (verticalScale(size) - size) * factor;
    }

    function fontSizeScale(size: number) {
        return size/(width/1200)
    }

    const {currentUser} = useAuth();

    const [userId,setuserId] = useState("");

    useEffect(()=>{
        if(currentUser){
            setuserId(currentUser.uid);
        }
    },[currentUser]);
    

    const handleImageUpload = async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageRef = ref(storage, `images/${Date.now()}`);
    
        await uploadBytes(imageRef, blob);
        const imageUrl = await getDownloadURL(imageRef);

        setImages([...images, imageUrl]);
        console.log(images);
    };

    const handlePostListing = async () => {
        console.log("Posting listing... ");
        try {
          const imageUrls = [];
          // Upload each image to Firebase Storage
          for (const image of images) {
            imageUrls.push(image);
          }
        
          let newListing: Listing = {
            id: Math.random().toString(36).substring(7), // Generate random ID
            title,
            description,
            price,
            tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated string to array of tags
            images: imageUrls,
            userId
           };

           if (sellType == 'Item') {
                const newItem: Item = {
                    ...newListing,
                    condition: selectedOption,
            };
            newListing = newItem;
            } else if (sellType == 'Clothing') {
                const newClothing: Clothing = {
                    ...newListing,
                    condition: selectedOption,
                    size: 'M',
            };
            newListing = newClothing;
            } else if (sellType == 'Housing') {
                const newHousing: Housing = {
                    ...newListing,
                    paymentFrequency: housingOption,
                    leaseDuration: '1 year',
            };
            newListing = newHousing;
            } else if (sellType == 'Tickets') {
            const newTickets: Tickets = {
                ...newListing,
                eventDate: date,
                eventTime: '12:00 pm',
            };
            newListing = newTickets;
            } else if (sellType == 'Services') {
            const newService: Service = {
                ...newListing,
                paymentFrequency: serviceOption,
            };
            newListing = newService;
            } else {
                    alert('Please select a listing type.');
                    return;
            }
    
            // Add listing to Firestore
        await setDoc(doc(db, "listings", newListing.id), newListing);
        alert('Listing posted successfully.');
        // Clear form fields
        setTitle('');
        setDescription('');
        setPrice('');
        setTags('');
        setImages([]);
        } catch (error) {
          console.error('Error posting listing: ', error);
          alert('Failed to post listing.');
        }
        navigation.navigate('Listings');
      };


    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
      };

      useEffect(() => {
        const fetchImages = async () => {
          const imageRefs = []; // Array to store image references
          
          // Iterate over each image URI in the state
          images.forEach(async (imageUri) => {
            try {
              // Get a reference to the image in Firebase Storage
              const imageRef = ref(storage, imageUri);
              // Get the download URL of the image
              const downloadUrl = await getDownloadURL(imageRef);
              // Push the download URL to the array
                imageRefs.push(downloadUrl);
            } catch (error) {
              console.error('Error fetching image:', error);
            }
          });
    
          setImages(imageRefs);
          //log 
          //console.log(imageRefs);
        };
    
        fetchImages();
      }, []);

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
  //console.log(`The width is: ${width}`);
  //console.log(height);
//
    return (
         <SafeAreaView style={styles.safeContainer}>
            <MainHeader isListing={false} onInput={true}></MainHeader>
            <ScrollView contentContainerStyle={{flex: 1}}>
                <View style={{backgroundColor: (width < height && width < 500) ? "white" : "#E1E1E1", zIndex:1}}>
                    <View style={{alignSelf: "center", borderRadius:20, width: width<450 ? width : (width*5)/6, height: (height*4)/2, borderColor: "red", borderWidth: 1, opacity:1, backgroundColor:"white", zIndex:999}}>
                <Text style={{fontSize: width/25, marginLeft: width/(800/40), marginTop:height/25, fontWeight: 2}}>Post Your Item:</Text>
                <View style={styles.container}>
                    <View style={{borderColor:"red", borderWidth: 1, width: width*3/4, height: width/(1200/300), borderRadius: 30, marginTop: width/60}}>
                        <Text style={{fontSize: width/30, alignSelf:"center", fontWeight: 2}}>What type of item are you listing?</Text>
                        <View style={{alignSelf:"center", flexDirection: "row", justifyContent: "space-evenly", borderColor:"red", borderWidth: 1, width: width*2/3, height: width/(1200/140), borderRadius: 30, marginTop: height/40, alignItems: "center"}}>
                        <Pressable
                            onPress={() => handlePress("Item")}>
                            <View style={{borderColor: "red", width:width/8, borderWidth: 1, height: width/8, borderRadius: 20/((1200*600)/(height*width))}}>
                                {sellType!="Item" && <View style={{borderColor: "red", borderWidth: 1, flex:1, borderRadius: 20/((1200*600)/(height*width)), alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <MaterialIcons name="computer" size={Math.round(50*Math.sqrt(width)/Math.sqrt(1200))} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Item" && <View style={{borderColor: "red", borderWidth: 1, flex:1, borderRadius: 20/((1200*600)/(height*width)), alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <MaterialIcons name="computer" size={Math.round(50*Math.sqrt(width)/Math.sqrt(1200))} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:width/50, alignSelf:"center", fontWeight: 2}}>Items</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => handlePress("Clothing")}>
                            <View style={{borderColor: "red", width:width/8, borderWidth: 1, height: width/8, borderRadius: 20/((1200*600)/(height*width))}}>
                                {sellType!="Clothing" && <View style={{borderColor: "red", borderWidth: 1, flex:1, borderRadius: 20/((1200*600)/(height*width)), alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <Ionicons name="shirt-outline" size={Math.round(50*Math.sqrt(width)/Math.sqrt(1200))} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Clothing" && <View style={{borderColor: "red", borderWidth: 1, flex:1, borderRadius: 20/((1200*600)/(height*width)), alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <Ionicons name="shirt-outline" size={Math.round(50*Math.sqrt(width)/Math.sqrt(1200))} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:width/50, alignSelf:"center", fontWeight: 2}}>Clothing</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => handlePress("Housing")}>
                            <View style={{borderColor: "red", width:width/8, borderWidth: 1, height: width/8, borderRadius: 20/((1200*600)/(height*width))}}>
                                {sellType!="Housing" &&<View style={{borderColor: "red", borderWidth: 1, flex:1, borderRadius: 20/((1200*600)/(height*width)), alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <AntDesign name="home" size={Math.round(50*Math.sqrt(width)/Math.sqrt(1200))} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Housing" && <View style={{borderColor: "red", borderWidth: 1, flex:1, borderRadius: 20/((1200*600)/(height*width)), alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <AntDesign name="home" size={Math.round(50*Math.sqrt(width)/Math.sqrt(1200))} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:width/50, alignSelf:"center", fontWeight: 2}}>Housing</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => handlePress("Ticket")}>
                            <View style={{borderColor: "red", width:width/8, borderWidth: 1, height: width/8, borderRadius: 20/((1200*600)/(height*width))}}>
                                {sellType!="Ticket" && <View style={{borderColor: "red", borderWidth: 1, flex:1, borderRadius: 20/((1200*600)/(height*width)), alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <Ionicons name="ticket-outline" size={Math.round(50*Math.sqrt(width)/Math.sqrt(1200))} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Ticket" && <View style={{borderColor: "red", borderWidth: 1, flex:1, borderRadius: 20/((1200*600)/(height*width)), alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <Ionicons name="ticket-outline" size={Math.round(50*Math.sqrt(width)/Math.sqrt(1200))} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:width/50, alignSelf:"center", fontWeight: 2}}>Tickets</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() => handlePress("Service")}>
                            <View style={{borderColor: "red", width:width/8, borderWidth: 1, height: width/8, borderRadius: 20/((1200*600)/(height*width))}}>
                                {sellType!="Service" && <View style={{borderColor: "red", borderWidth: 1, flex:1, borderRadius: 20/((1200*600)/(height*width)), alignItems: "center", justifyContent: "center",}}>
                                <AntDesign>
                                    <Feather name="scissors" size={Math.round(50*Math.sqrt(width)/Math.sqrt(1200))} color="black" />
                                </AntDesign>
                                </View>}
                                {sellType=="Service" && <View style={{borderColor: "red", borderWidth: 1, flex:1, borderRadius: 20/((1200*600)/(height*width)), alignItems: "center", justifyContent: "center", backgroundColor:"rgb(34 197 94)"}}>
                                <AntDesign>
                                    <Feather name="scissors" size={Math.round(50*Math.sqrt(width)/Math.sqrt(1200))} color="white" />
                                </AntDesign>
                                </View>}
                                <Text style={{fontSize:width/50, alignSelf:"center", fontWeight: 2}}>Services</Text>
                            </View>
                        </Pressable>
                        </View>
                    </View>
                    <FadeInView>
                    {sellType!="none" && <View style={{borderWidth:1,
        borderColor: "red", width: width/2, alignItems: "center", flex: 1,}}>
                        <View style={[styles.prodNameSuperContainer,{borderWidth:1,
                        borderColor: "purple",
                        display: "flex",
                        flexDirection: width <600 ? "column" : "row",
                        flexWrap: "wrap",
                        flex: 1,
                        minHeight: width < 600 ? shortDimension/8 : 1,
                        
                        justifyContent:"center",
                        alignContent: width < 600 ? "flex-start" : "center", width:width/2, marginTop: shortDimension/(600/20), height: width < 600 ? height/(1000/200) : shortDimension/(600/70),}]}>
                        <Text style={[styles.prodNameTxt, {fontSize:width < 600 ? width/(700/20) : width/(1200/20), marginLeft:width/(1200/10)}]}>
                            Listing Title:
                            <View style={[styles.prodNameContainer, {marginLeft: width < 600 ? width/(600/10) : width < 600 ? width/2 - width/(344/80): width/(1200/10),
                                    borderRadius: 5/((1200*600)/(height*width)),
                                    width: width < 600 ? width/(900/190) : width/(1200/190), 
                                    height: width < 600 ? shortDimension/(800/40) : shortDimension/(700/40),}]}>
                                <TextInput style={[styles.prodNameIn, {fontSize: width < 600 ? width/(950/20) : width/(1200/17),
                                    padding: (Math.sqrt(3*width/(1200/10))), textAlign: "center", textAlignVertical: "center"}]}
                                placeholder="Enter Title"
                                placeholderTextColor={"#B3B3B3"}
                                value={title}
                                onChangeText={setTitle}>
                                </TextInput>
                            </View>
                        </Text>   
                    {/* </View> */}
                    {/* <View style={styles.prodPriceSuperContainer}>   */}
                        {(sellType=="Clothing" || sellType=="Item" || sellType=="Ticket") && <Text style={[styles.prodPriceTxt, { marginLeft: width < 600 ? width/(1200/10) : width/(1200/55),
                            fontSize: width < 600 ? width/(700/20) : width/(1200/20)}]}>
                            Listing Price:  
                            <View style={[styles.prodPriceContainer, {
                                    marginTop: width < 600 ? 5: 0,
                                    marginLeft: width/(1200/10),
                                    borderRadius: width/(1200/5),
                                    width: width < 600 ? width/(400/50) : width/(800/50),
                                    height: width < 600 ? shortDimension/(800/40) : shortDimension/(700/40),}]}>
                                <TextInput style={[styles.prodPriceIn, {fontSize: width < 600 ? width/(950/20) : width/(1200/17),
                                    padding: (Math.sqrt(3*width/(1200/10))), textAlign: "center", textAlignVertical: "center"}]}
                                placeholder="$$$"
                                placeholderTextColor={"#B3B3B3"}
                                value={price}
                                onChangeText={setPrice}
                                >
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                            </View>
                        </Text>}
                        {sellType=="Housing" && <Text style={[styles.prodPriceTxt, { marginLeft: width < 600 ? width/(1200/10) : width/(1200/55),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),}]}>
                            Price:
                            <View style={[styles.prodPriceContainer, {
                                    marginLeft: width/(1200/10),
                                    marginTop: width < 600 ? 5: 0,
                                    borderRadius: width/(1200/5),
                                    width: width < 600 ? width/(400/50) : width/(800/50),
                                    height: width < 600 ? shortDimension/(800/40) : shortDimension/(700/40),}]}>
                                <TextInput style={[styles.prodPriceIn, {fontSize: width < 600 ? width/(950/20) : width/(1200/17),
                                    padding: (Math.sqrt(3*width/(1200/10)))}]}
                                placeholder="$$$"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                            </View>
                            {housingOption==null && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}></Text>}
                            {housingOption=='Yearly' && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Year</Text>}
                            {housingOption=='Weekly' && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Week</Text>}
                            {housingOption=='Monthly' && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Month</Text>}
                            {housingOption=='Daily' && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Day</Text>}
                            {housingOption=='Biannual' && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ 6 Months</Text>}
                        </Text>}
                        {sellType=="Service" && <Text style={[styles.prodPriceTxt, { marginLeft: width/(1200/55),
        fontSize: width/(1200/20),}]}>
                            Price:
                            <View style={[styles.prodPriceContainer, {
                                   marginLeft: width/(1200/10),
                                   marginTop: width < 600 ? 5: 0,
                                   borderRadius: width/(1200/5),
                                   width: width < 600 ? width/(400/50) : width/(800/50),
                                   height: width < 600 ? shortDimension/(800/40) : shortDimension/(700/40)}]}>
                                <TextInput style={[styles.prodPriceIn, {fontSize: width < 600 ? width/(950/20) : width/(1200/17),
                                    padding: (Math.sqrt(3*width/(1200/10)))}]}
                                placeholder="$$$"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                            </View>
                            {serviceOption==null && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}></Text>}
                            {serviceOption=="Per Minute" && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Minute</Text>}
                            {serviceOption=="Hourly" && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Hour</Text>}
                            {serviceOption=="Daily" && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Day</Text>}
                            {serviceOption=="Flat" && <Text style={{marginLeft: width/(1200/10),
                                fontSize: width < 600 ? width/(700/20) : width/(1200/20),
                                color: "rgb(34 197 94)",
                                textAlign: "auto",
                                fontWeight:2}}>/ Service</Text>}
                        </Text>}
                    </View>
                    <View style={[styles.prodTagsSuperContainer, {marginTop: shortDimension/(600/30),
                            width: width/2,
                            height: width/(1200/70),}]}>  
                        <Text style={[styles.prodTagsTxt, {marginLeft: width < 600 ? width/(1200/10) : width/(1200/35),
                            fontSize: width < 600 ? width/(700/20) : width/(1200/20),}]}>
                            Add Tags:
                            <View style={[styles.prodTagsContainer, {marginLeft: width < 600 ? width/(600/10) : width < 600 ? width/2 - width/(344/80): width/(1200/10),
                                    borderRadius: 5/((1200*600)/(height*width)),
                                    width: width/(1200/390), 
                                    height: width < 600 ? shortDimension/(800/40) : shortDimension/(700/40),}]}>
                                <TextInput style= {[styles.prodTagsIn, {fontSize: width < 600 ? width/(950/20) : width/(1200/17),
                                    padding: (Math.sqrt(3*width/(1200/10)))}]}
                                placeholder="Eg: Streetwear, Books, Fridges..."
                                placeholderTextColor={"#B3B3B3"}
                                value={tags}
                                onChangeText={setTags}>
                            <View style={styles.prodTagsContainer}>
                                <TextInput style= {styles.prodTagsIn}
                                placeholder="Eg: Books, Appliances, Fridges..."
                                placeholderTextColor={"#B3B3B3"}
                                value={tags}
                                onChangeText={setTags}>
                                </TextInput>
                            </View>
                        </Text> 
                    </View>
                    <View style={[styles.prodDesSuperContainer, {
                            width: width*600/1200,
                            borderWidth:1,
                            marginTop: shortDimension/(600/30),
                            borderColor: "green",
                            height: sellType=="Ticket" && width<600 ? shortDimension/(1.5) : shortDimension/(600/200),
                            alignItems: width < 600 ? "center" : "center",
                            flexDirection: width < 600 ? "column": "row",
                            justifyContent: width < 600 ? "center" : "space-evenly"}]}>
                                {/* marginLeft: width < 600 ? width/(1200/10) : width/(1200/35),  */}
                        <Text style={[styles.prodDesTxt, {fontSize: width < 600 ? width/(700/20): width/(1200/20)}]}>
                            Enter Brief Description:{"\n"}
                            <View style={[styles.prodDesContainer, {marginLeft: 0,
                                    borderRadius: 7,
                                    borderWidth: 1,
                                    borderColor: "brown",
                                    marginBottom: width > 600 && sellType=="Ticket"? 80 : 20,
                                    width: width < 600 ? width/(2.5) :width/(1200/300),
                                    height: width < 600 ? shortDimension/(600/50) : shortDimension/(600/100),}]}>
                                <TextInput style={[styles.prodDesIn, {fontSize: width < 600 ? width/(950/20) : width/(1200/17),
                                    padding: (Math.sqrt(3*width/(1200/10)))}]}
                                placeholder="Enter Descrition"
                                placeholderTextColor={"#B3B3B3"}
                                value={description}
                                onChangeText={setDescription}
                                >
                                </TextInput>
                            </View>
                        </Text> 
                        {(sellType=="Clothing" || sellType=="Item") && <View style={{borderColor: "red", borderWidth: 1, height: width < 600 ? shortDimension/(6) : shortDimension/(1200/200), width: width < 600 ? width/6 : width/8,}}>
                        <View style={[styles.container, {color : "white",
                            borderWidth: 1,
                            flexWrap: "nowrap",
                            flexDirection: "column"}]}>
                            <TouchableOpacity onPress={toggleDropdown} style={[styles.dropdownButton, {paddingVertical: 8,
                                paddingHorizontal: width/(1200/30),
                                borderRadius: width < 600 ? width/(800/30) : width/(1200/20),
                                borderWidth:1,
                                borderColor:"red",
                                } ]}>
                                {selectedOption==null && <Text style={[styles.buttonText, {color: "white",
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    fontSize: width < 600 ? width/(950/20) : width/(1200/17),
                                    fontWeight:2,}]}>{`${sellType} Condition:`}</Text>}
                                {selectedOption=="New" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"green"}}>{selectedOption}</Text>}
                                {selectedOption=="Used" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"light-grey"}}>{selectedOption}</Text>}
                                {selectedOption=="Worn" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"grey"}}>{selectedOption}</Text>}
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={[styles.dropdown]}>
                                {options.map((option, index) => (
                                    <TouchableOpacity
                                    key={index}
                                    style={[styles.option, {paddingVertical: shortDimension/(600/8),
                                        paddingHorizontal: width/(1200/30),}]}
                                    onPress={() => handleSelectOption(option)}
                                    >
                                    <Text style={{fontSize: width < 600 ? width/(950/17) : width/(1200/13), fontWeight: 2} }>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                                </View>
                            )}
                            </View>
                        </View>}
                        {sellType=="Housing" && <View style={{borderColor: "red", height: width < 600 ? shortDimension/(6) : shortDimension/(1200/200), width: width < 600 ? width/6 : width/8, borderWidth: 2}}>
                        <View style={[styles.container, {borderWidth: 1,
                            flexWrap: "nowrap",
                            flexDirection: "column"}]}>
                            <TouchableOpacity onPress={toggleDropdown} style={[styles.dropdownButton, {paddingVertical: 8,
                                paddingHorizontal: width/(1200/30),
                                borderRadius: width < 600 ? width/(800/30) : width/(1200/20),
                                borderWidth:1,
                                borderColor:"red",
                                } ]}>
                                {housingOption==null && <Text style={[styles.buttonText, {color: "white",
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    fontSize: width < 600 ? width/(950/20) : width/(1200/17),
                                    fontWeight:2,}]}>{'Payment Timing:'}</Text>}
                                {housingOption=="Daily" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"black", fontWeight: 2}}>{housingOption}</Text>}
                                {housingOption=="Weekly" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"black", fontWeight: 2}}>{housingOption}</Text>}
                                {housingOption=="Monthly" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"black", fontWeight: 2}}>{housingOption}</Text>}
                                {housingOption=="Biannual" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"black", fontWeight: 2}}>{housingOption}</Text>}
                                {housingOption=="Yearly" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"black", fontWeight: 2}}>{housingOption}</Text>}
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.dropdown}>
                                {options2.map((option, index) => (
                                    <TouchableOpacity
                                    key={index}
                                    style={[styles.option, {paddingVertical: shortDimension/(600/8),
                                        paddingHorizontal: width/(1200/30),}]}
                                    onPress={() => handleHousingOption(option)}
                                    >
                                    <Text style={{fontSize: width < 600 ? width/(950/17) : width/(1200/13), fontWeight: 2}}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                                </View>
                            )}
                            </View>
                        </View>}
                        {(sellType=="Ticket") && <View style={{flexDirection: "column", borderColor: "red", borderWidth: 1, height: width < 600 ? height/4.5 : height/(800/200), width: width < 600 ? width/3 : width/(1200/240)}}>
                        <View style={{ flex:1, alignItems: 'center', opacity: 1, zIndex:999, borderWidth:1, borderColor:"red"}}>
                        <Text style={{marginTop: 10, fontSize: width < 600 ? width/(700/20): width/(1200/20), color:"green", fontWeight: 2}}>Event Date:</Text>
                        <DateSelector width={width} height={height} />
                        </View>
                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", flex:1, flexWrap: "nowrap"}}>
                        <Text style={{fontSize: width < 600 ? width/(700/20): width/(1200/20),
                            color: "rgb(34 197 94)",
                            textAlign: "auto",
                            fontWeight: 2,
                           }}>Event Time:</Text>
                        <View style={{
                                    borderWidth: 1,
                                    borderColor: "red",
                                    width: width < 600 ? width/(600/90) : width/(1200/90),
                                    height: width < 600 ? shortDimension/(800/40) : shortDimension/(700/40),
                                    borderRadius: 10,
                                    marginLeft: width < 600 ? 0 : 10
                                }}>
                                <TextInput style={[styles.prodPriceIn, {fontSize: width < 600 ? width/(950/20) : width/(1200/17),
                                    padding: (Math.sqrt(3*width/(1200/10)))}]}
                                placeholder="12:00 pm"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                        </View>
                        </View>
                        </View>}
                        {sellType=="Service" && <View style={{borderColor: "red", height: width < 600 ? shortDimension/(6) : shortDimension/(1200/200), width: width < 600 ? width/6 : width/8, borderWidth: 2}}>
                        <View style={[styles.container, {borderWidth: 1,
                            flexWrap: "nowrap",
                            flexDirection: "column"}]}>
                            <TouchableOpacity onPress={toggleDropdown} style={[styles.dropdownButton, {paddingVertical: 8,
                                paddingHorizontal: width/(1200/30),
                                borderRadius: width < 600 ? width/(800/30) : width/(1200/20),
                                borderWidth:1,
                                borderColor:"red",
                                } ]}>
                                {serviceOption==null && <Text style={[styles.buttonText, {color: "white",
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    fontSize: width < 600 ? width/(950/20) : width/(1200/17),
                                    fontWeight:2,}]}>{'Pricing:'}</Text>}
                                {serviceOption=="Flat" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"black"}}>{serviceOption}</Text>}
                                {serviceOption=="Per Minute" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"black"}}>{serviceOption}</Text>}
                                {serviceOption=="Hourly" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"black"}}>{serviceOption}</Text>}
                                {serviceOption=="Daily" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"black"}}>{serviceOption}</Text>}
                                {serviceOption=="Yearly" && <Text style={{fontSize: width < 600 ? width/(950/20) : width/(1200/17), color:"black"}}>{serviceOption}</Text>}
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.dropdown}>
                                {options3.map((option, index) => (
                                    <TouchableOpacity
                                    key={index}
                                    style={[styles.option, {paddingVertical: shortDimension/(600/8),
                                        paddingHorizontal: width/(1200/30),}]}
                                    onPress={() => handleServiceOption(option)}
                                    >
                                    <Text style={{fontSize: width < 600 ? width/(950/17) : width/(1200/13), fontWeight: 2} }>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                                </View>
                            )}
                            </View>
                        </View>}
                    </View>
                    {sellType=="Ticket" && <View style={{marginTop: shortDimension/(600/30),
                        width:  width/(1200/200),
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
                                <ImagePicker onImageSelected={handleImageUpload}/>
                            </Pressable>
                        </Text> 
                    </View>}
                    {sellType!="Ticket" && <View style={styles.prodImgSuperContainer}>
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
                                <ImagePicker onImageSelected={handleImageUpload}/>
                                </View>
                            </Pressable>
                        </Text> 
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                        {images.map((imageUrl, index) => (
                            <Image key={index} source={{ uri: imageUrl }} style={{ width: 100, height: 100, marginRight: 10 }} />
                        ))}
                        </View>
                        {sellType=="Clothing" && <View style={{marginLeft:150, borderColor:"red", borderWidth:1, width:250, height:40, flexDirection:"row", alignItems:"center"}}>
                            <Text style={{fontSize: 20,
                            color: "rgb(34 197 94)",
                            textAlign: "auto",
                            marginLeft:70,
                            fontWeight:2}}>Size:</Text>
                            <View style={[styles.prodPriceContainer, {
                                    marginLeft: width/(1200/10),
                                    borderRadius: width/(1200/5),
                                    width: width/(1200/50),
                                    height: shortDimension/(600/40),}]}>
                                <TextInput style={[styles.prodPriceIn, {fontSize: width/(1200/17),
                                    padding: 10}]}
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
                                <TextInput style={[styles.prodPriceIn, {fontSize: width/(1200/17),
                                    padding: 10}]}
                                placeholder="6 months"
                                placeholderTextColor={"#B3B3B3"}>
                                </TextInput>
                                {/* <Text style={styles.prodPrice$}>$</Text>   */}
                            </View>
                        </View>}
                    </View>}
                    <View style={styles.prodPostSuperContainer}>  
                        <View> 
                            <Pressable onPress={() => {handlePostListing()}}>
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
        borderWidth: 1,
    },

    compName: {
        fontSize: 37,
        color: "rgb(34 197 94)",
        fontWeight: "bold",
        textAlign: "center",
    },

    prodNameSuperContainer: {

    },

    prodNameTxt: {
        color: "rgb(34 197 94)",
        fontWeight: 2
    },

    prodNameContainer: {
        borderWidth: 1,
        borderColor: "red",
        
    },

    prodNameIn: {
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
        color: "rgb(34 197 94)",
        textAlign: "auto",
        fontWeight: 2
    },

    prodPriceContainer: {
        borderWidth: 1,
        borderColor: "red",
    },

    prodPriceIn: {
    },

    prodDesSuperContainer: {
        width: 600,
        borderWidth:1,
        borderColor: "red",
        height: 200,
        flexDirection: "row"
    },

    prodDesTxt: {
        fontSize: 20,
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
        borderWidth:1,
        borderColor: "purple",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        flex:1,
        alignContent:"center"

    },

    prodTagsTxt: {
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