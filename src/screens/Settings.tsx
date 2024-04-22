import { Text, View, StyleSheet, SafeAreaView, Pressable, Image, FlatList, Dimensions, Animated} from "react-native"
import { TextInput } from "react-native";
import { useState } from "react"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from '@react-navigation/native';
import MainHeader from "../components/MainHeader";
import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

const fetchUserProfile = async (userId) => {
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
};

const updateProfile = async (userId, newData) => {
    try {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, newData);
    } catch (error) {
        throw error;
    }
};

const { width, height } = Dimensions.get('window');

import { scale, verticalScale, moderateScale, moderateVerticalScale } from '../components/Scaling';

const microwave = "https://images.craigslist.org/00Q0Q_clz03CCkybF_0CI0t2_600x450.jpg"
const fridge = "https://i.ebayimg.com/images/g/5JAAAOSwdB9hnRZ6/s-l1600.jpg"

const DATA = [
    { id: '1', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that heats and cook food quickly.', price: "$730", tags: ['kitchen', 'electrical','cooking'] },
    { id: '2', title: "Fridge", image: fridge, description: 'A fridge is where you keep your food.', price: "$899", tags: ['kitchen', 'electrical','cooking'] },
  ]

  function Item(props) {
    const { id, title, image, description, price, tags } = props;
    const scaleValue = useRef(new Animated.Value(1)).current;
  
    const handleMouseEnter = () => {
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };
  
    const handleMouseLeave = () => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };    
    return (
        <Animated.View 
        style={[
          styles.item, 
          { transform: [{ scale: scaleValue }] }
        ]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      <View style={styles.item}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: moderateScale(13) }}>{title}</Text>
          </View>
          <View>
            <Text style={{ fontSize: moderateScale(13) }}>{price}</Text>
          </View>
        </View>
        <Image style={{ width: moderateScale(155), height: moderateVerticalScale(170), borderRadius: 0, marginTop: 10, borderWidth: 0, borderColor: 'rgb(34 197 94)' }} source={{ uri: image }} />
      </View>
      </Animated.View>
    );
  }


function Empty() {
    return (
      <View>
        <Text style={styles.bodyTxt}>
          NO LISTINGS
        </Text>
      </View>
    )
  }

  

function Settings({ navigation }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        // Fetch user profile data from Firestore
        const userId = auth.currentUser!.uid;
        fetchUserProfile(userId).then((userData) => {
            if (userData) {
                setFirstName(userData.firstName || "");
                setLastName(userData.lastName || "");
                setEmail(userData.email || "");
                setPhoneNumber(userData.phoneNumber || "");
            }
        });
    }, []);

    const handleSaveInfo = async () => {
        // Save updated user profile data to Firestore
        const userId = auth.currentUser!.uid;
        try {
            await updateProfile(userId, {
                firstName,
                lastName,
                email,
                phoneNumber,
            });
            Alert.alert("Success", "Profile information saved successfully");
        } catch (error) {
            console.error("Error saving profile information:", error);
            Alert.alert("Error", "Failed to save profile information");
        }
    };

    const companyName = "UMarket";
    
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigation.navigate('UserLogin');
        } catch (error) {
            console.error("Sign out error:", error);
            Alert.alert("Sign Out Failed", error.message);
        }
      };

    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        }).start();
    }, []);

    const scaleValues = useRef([1, 1, 1, 1].map(() => new Animated.Value(1))).current;
  
    const handleMouseEnter = (index) => {
      Animated.timing(scaleValues[index], {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };
  
    const handleMouseLeave = (index) => {
      Animated.timing(scaleValues[index], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };    

    function renderItem({ item }) {
        return (
          <Pressable
            style={({ pressed }) => [
              {
                borderRadius: 10,
                backgroundColor: pressed ? 'transparent' : 'white', // Change or remove background color change on press
              }
            ]}
            onPress={() => navigation.navigate('ListingItem', { item })}
          >
            <Item id={item.id} title={item.title} image={item.image} description={item.description} price={item.price} tags={item.tags} navigation={navigation} />
          </Pressable>
        );
      }
     
    function myListings() {
    console.log(width)
    const navigation = useNavigation()
    function renderItem({item}) {
      return (
        <Pressable style={ ({ pressed }) => [
          {borderRadius: 10},
          pressed && {backgroundColor: "rgb(34 197 94)"}
          ]}
          onPress={() => navigation.navigate('ListingItem', { item })}>
          <Item id={item.id} title={item.title} image={item.image} description={item.description} price={item.price} tags={item.tags}/>
        </Pressable>
      )
    }}

    return (
        <SafeAreaView style={styles.safeContainer}>
            <MainHeader onInput={true} isListing={false}></MainHeader>
            {/* <Animated.View style={[styles.container, { opacity: animatedValue }]}> */}
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>
                        Change Profile:
                    </Text>
                </View>
                <View style={{flex: 1, alignItems: "center"}}>
                    {/* <View style={styles.bodyContainer}>
                        <Text style={styles.bodyTxt}>First Name:</Text>
                        <Text style={styles.bodyTxt2}>Last Name:</Text>
                    </View> */}
                    {/* <View style={styles.bodyContainer}> */}
                    <View style={{width: "100%", flexDirection: "row", gap: 10}}>
                        {/* <View style={styles.nameCont}> */}
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 1, padding: 10, minWidth: 225}}>
                            <Text>First Name:</Text>
                            {/* <TextInput style={styles.itemIn} */}
                            <Animated.View 
                            style={[
                           
                                { transform: [{ scale: scaleValues[0] }] }
                            ]}
                            onMouseEnter={() => handleMouseEnter(0)}
                            onMouseLeave={() => handleMouseLeave(0)}
                        >
                            <TextInput placeholder={"Enter First Name"} placeholderTextColor={'#B3B3B3'} value={firstName} onChangeText={(text) => setFirstName(text)} style={styles.nameCont} />
                            </Animated.View>
                        {/* <View style={styles.nameCont2}> */}
                        </View>
                        <View style={{flex: 1, padding: 10, minWidth: 225}}>
                            <Text>Last Name:</Text>
                            {/* <TextInput style={styles.itemIn} */}
                            <Animated.View 
                            style={[
                           
                                { transform: [{ scale: scaleValues[1] }] }
                            ]}
                            onMouseEnter={() => handleMouseEnter(1)}
                            onMouseLeave={() => handleMouseLeave(1)}
                        >
                            <TextInput placeholder={"Enter Last Name"} placeholderTextColor={'#B3B3B3'} value={lastName} onChangeText={(text) => setLastName(text)} style={styles.nameCont} />
                            </Animated.View>
                        </View>
                        <View style={{flex: 1}}></View>
                    </View>
                    <View style={{width: "100%", flexDirection: "row", gap: 10}}>
                        {/* <View style={styles.nameCont}> */}
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 1, padding: 10, minWidth: 225}}>
                            <Text>Email:</Text>
                            {/* <TextInput style={styles.itemIn} */}
                            <Animated.View 
                            style={[
                           
                                { transform: [{ scale: scaleValues[2] }] }
                            ]}
                            onMouseEnter={() => handleMouseEnter(2)}
                            onMouseLeave={() => handleMouseLeave(2)}
                        >
                            <Text style={[styles.nameCont, {color: "#B3B3B3"}]}>{email}</Text>
                            </Animated.View>
                        {/* <View style={styles.nameCont2}> */}
                        </View>
                        <View style={{flex: 1, padding: 10, minWidth: 225}}>
                            <Text>Phone Number:</Text>
                            {/* <TextInput style={styles.itemIn} */}
                            <Animated.View 
                            style={[
                           
                                { transform: [{ scale: scaleValues[3] }] }
                            ]}
                            onMouseEnter={() => handleMouseEnter(3)}
                            onMouseLeave={() => handleMouseLeave(3)}
                        >
                            <TextInput placeholder={"Enter Phone Number"} placeholderTextColor={'#B3B3B3'} value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} style={styles.nameCont} />
                            </Animated.View>
                        </View>
                        <View style={{flex: 1}}></View>
                    </View>
                    {/* <View style={styles.bodyContainer}>
                        <Text style={styles.bodyTxt}>Email:
                        <Text style={styles.bodyTxt3}>Phone Number:
                        </Text>
                        </Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <View style={styles.nameCont3}>
                            <Text style={styles.itemIn2}>nmoore66@gatech.edu</Text>
                        <View style={styles.nameCont4}>
                            <TextInput style={styles.itemIn}
                            placeholder="214-304-9926">
                            </TextInput>
                        </View>
                        </View>
                    </View> */}
                </View>
                <Pressable
                    style={({ pressed }) => [
                        styles.submitContainer,
                        pressed && { backgroundColor: "#E5E4E2" }
                    ]}
                    onPress={handleSaveInfo}
                    >
                        <Text style={{fontSize: 20, textAlign:"center", alignSelf:"center", color:"white"}}>Save Info</Text>
              
                </Pressable>
                    <View style={styles.headerContainerAlt}>
                        <Text style={styles.header}>Your Listings:</Text>
                       
                        <View style={styles.page}>
            
                            <FlatList
                            scrollEnabled={false}
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                            ListEmptyComponent={Empty}
                            numColumns={Math.round(width/moderateScale(215))}
                            />
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            styles.submitContainer,
                            pressed && { backgroundColor: "#E5E4E2" }
                        ]}
                        onPress={() => signOut(auth)}
                    >
                        <View>
                            <Text style={{ fontSize: 20, color: "white" }}>Sign Out</Text>
                        </View>
                    </Pressable>
            {/* </Animated.View> */}
        </SafeAreaView>
    );
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
    pressableContainer: {
        marginTop: 40,
        marginLeft: 5,
        padding: 7,
        borderRadius: 30,
        width: 120,
        height: 40,
        alignSelf: "center",
        alignContent: "center",
        justifyContent: "center",
    },
    compName: {
        fontSize: 37,
        color: "rgb(34 197 94)",
        fontWeight: "bold",
        textAlign: "center",
    },
    headerContainer: {
        marginLeft: "20%",
        width: "60%",
        marginTop: 20,
    },
    headerContainerAlt: {
        marginTop: 15,
        marginLeft: "20%",
        width: "60%",
    },
    header: {
        fontSize: 35,
        color: "black",
        fontWeight: "300"
    },
    bodyContainer: {
        backgroundColor: "yellow",
        borderWidth: 1,
        flexDirection: "row",
        gap: 0,
        //marginLeft: "30%",
        //width: "40%",
        marginTop: 15
    },
    bodyTxt: {
        borderWidth: 1,
        flexDirection: "row",
        fontSize: 25,
        color: "rgb(34 197 94)"
    },
    bodyTxt2: {
        borderWidth: 1,
        marginLeft: "30%",
        fontSize: 25,
        color: "rgb(34 197 94)"
    },
    bodyTxt3: {
        marginLeft: "40%",
        fontSize: 25,
        color: "rgb(34 197 94)"
    },
    nameCont: {
        borderWidth: 1, 
        padding: 10, 
        borderRadius: 10, 
        marginTop: 3,
        borderColor: "#E5E4E2"
    },
    nameCont2: {
        flex: 1,
        flexDirection: "row",
        //marginLeft: "30%",
        //padding: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "Black",
        //width: "100%",
        height: 40,
    },

    nameCont3: {
        flexDirection: "row",
        marginLeft: 0,
        //padding: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "Black",
        width: "50%",
        height: 40,
    },

    nameCont4: {
        flexDirection: "row",
        marginLeft: "33%",
        //padding: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "Black",
        width: "100%",
        height: 40,
    },

    itemIn: {
        flex: 1,
        fontSize: 17,
        padding: 9,
        color: "black"
    },
    itemIn2: {
        fontSize: 17,
        padding: 9,
        color: "#B3B3B3",
        width: "100%"
    },
    submitTxt: {
        fontSize: 20,
        // color: "#228B22",
        color: "#E5E4E2",
        textAlign: "auto",
        paddingLeft: 10,
        marginRight: 10,
    },
    submitContainer: {
        flexDirection: "row",
        marginTop: 40,
        marginLeft: 5,
        padding: 7,
        borderRadius: 30,
        // backgroundColor: "#E5E4E2",
        backgroundColor: "rgb(34 197 94)",
        width: 120,
        height: 40,
        alignSelf: "center",
        alignContent: "center",
        // borderColor: "black",
        // borderWidth: 1,
        justifyContent: "center",
    },
    item: {
        padding: 0,
        marginVertical: 8,
        marginHorizontal: 10,
        //flexDirection: "row",
        //justifyContent: "space-around",
        //alignItems: "center"
    },
    page: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        //borderWidth: 1,
        // borderColor: "red",
        //flexDirection: "row",
        flexWrap: "wrap",
        height: "auto"
    },
})

export default Settings