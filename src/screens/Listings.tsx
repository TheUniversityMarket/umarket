import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, Dimensions, useWindowDimensions, Pressable, Animated } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import SearchBar from "../components/SearchBar";
import MainHeader from "../components/MainHeader";
import { useRoute } from "@react-navigation/native";
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import { app, auth, db } from '../firebase/firebaseConfig';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { Listing, Item, Service, Clothing, Housing, Tickets } from '../models/listing';

// import { scale, verticalScale, moderateScale, moderateVerticalScale } from "/Users/jevontwitty/Documents/GitHub/UMarket/src/components/Scaling"
// import { FlatList } from 'react-native-gesture-handler';

// const { width, height } = Dimensions.get('window');

//import { scale, verticalScale, moderateScale, moderateVerticalScale } from "../components/Scaling"

function returnTags(tagList) {
  // Map each tag to a Text component wrapped in a View component styled to look like a small grey pill-shaped box
  return tagList.map((tag, index) => (
    <View key={index} style={styles.tag}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  ));
}

function Empty() {
  return (
    <View style={{alignItems: "center", flex: 1, margin: 20}}>
      <Text>
        There are no listings to display.
      </Text>
    </View>
  )
}

const companyName = "Market"
// const microwave = "/Users/jevontwitty/Documents/GitHub/UMarket/Images/Microwave.jpg"
// const microwave = "https://images.craigslist.org/00Q0Q_clz03CCkybF_0CI0t2_600x450.jpg"
// // const fridge = "/Users/jevontwitty/Documents/GitHub/UMarket/Images/Fridge.webp"
// const fridge = "https://i.ebayimg.com/images/g/5JAAAOSwdB9hnRZ6/s-l1600.jpg"
// // const laptop = "/Users/jevontwitty/Documents/GitHub/UMarket/Images/Laptop.webp"
// const laptop = "https://www.digitaltrends.com/wp-content/uploads/2023/06/macbookair15-03.jpg?fit=1500%2C1000&p=1"
// // const lamp = "/Users/jevontwitty/Documents/GitHub/UMarket/Images/Lamp.jpg"
// const lamp = "https://image.lampsplus.com/is/image/b9gt8/possini-euro-organic-twist-29-1-8-sculptural-rustic-modern-table-lamp__427p1cropped.jpg?qlt=75&wid=376&hei=376&op_sharpen=1&resMode=sharp2&fmt=jpeg"

// const USERS = [
//   { id: '1', name: "Jevon", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
//   { id: '2', name: "Nash", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
//   { id: '3', name: "Paul", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
// ]

// const DATA = [
//   { id: '1', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that heats and cook food quickly.', price: "$730", tags: ['kitchen', 'electrical','cooking'], posterID: '1' },
//   { id: '2', title: "Fridge", image: fridge, description: 'A fridge is where you keep your food.', price: "$899", tags: ['kitchen', 'electrical','cooking'], posterID: '2' },
//   { id: '3', title: "Laptop", image: laptop, description: 'A laptop is a computer that sits on your lap.', price: "$1200", tags: ['computer','electrical'], posterID: '3' },
//   { id: '4', title: "Lamp", image: lamp, description: 'A lamp is an electric light source.', price:"$50", tags: ['appliance', 'electrical'], posterID: '1' },
//   { id: '5', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$200", tags: ['kitchen', 'electrical','cooking'], posterID: '2' },
//   { id: '6', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$700", tags: ['kitchen', 'electrical','cooking'], posterID: '3' },
//   { id: '7', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$500", tags: ['kitchen', 'electrical','cooking'], posterID: '1' },
//   { id: '8', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$630", tags: ['kitchen', 'electrical','cooking'], posterID: '2' },
// ]

// const SectionedDATA = [
//   {
//     title: "Kitchenware",
//     data: [
//     { id: '1', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that heats and cook food quickly.', tags: ['kitchen', 'electrical','cooking'] },
//     { id: '2', title: "Fridge", image: fridge, description: 'A fridge is where you keep your food.', tags: ['kitchen', 'electrical','cooking'] },
//     { id: '5', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', tags: ['kitchen', 'electrical','cooking'] },
//     { id: '6', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', tags: ['kitchen', 'electrical','cooking'] },
//     { id: '7', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', tags: ['kitchen', 'electrical','cooking'] },
//     { id: '8', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', tags: ['kitchen', 'electrical','cooking'] },
//   ]
//   },
//   {
//     title: "Technologies",
//     data: [
//       { id: '3', title: "Laptop", image: laptop, description: 'A laptop is a computer that sits on your lap.', tags: ['computer','electrical'] },
//     ]
//   },

//   {
//     title: "Furniture",
//     data: [
//       { id: '4', title: "Lamp", image: lamp, description: 'A lamp is an electric light source.', tags: ['appliance', 'electrical'] },
//     ]
//   }
//  ];

const TAGS = [
  {tag: "item", id: "1"},
  {tag: "clothing", id: "2"},
  {tag: "services", id: "3"},
  {tag: "housing", id: "4"},
  {tag: "tickets", id: "5"},
  {tag: "electronics", id: "6"},
  {tag: "appliances", id: "7"},
  {tag: "furniture", id: "8"},
  {tag: "kitchen", id: "9"},
]

// const width = Dimensions.get('window').width
// const numberOfColumns = Math.round(width/215)

function Listings() {
  const {height, width, scale, fontScale} = useWindowDimensions();
  const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

  //Default guideline sizes are based on standard ~5" screen mobile device
  const guidelineBaseWidth = 350;
  const guidelineBaseHeight = 680;

  function scaleIt(size: number) {
      return shortDimension / guidelineBaseWidth * size;
  }
  function verticalScale(size: number) {
      return longDimension / guidelineBaseHeight * size;
  }
  function moderateScale(size: number, factor = 0.5) {
      return size + (scaleIt(size) - size) * factor;
  }
  function moderateVerticalScale(size: number, factor = 0.5) {
      return size + (verticalScale(size) - size) * factor;
  }

  const [listings, setListings] = useState<Listing[]>([]);

useEffect(() => {
    let unsubscribe: () => void; // Declare unsubscribe outside the fetchData function

    const fetchData = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'listings'));
            const listingsData: Listing[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log("Before setting listings:", listingsData);
            setListings(listingsData);
            console.log("After setting listings:", listings);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    fetchData(); // Invoke the fetchData function immediately

    // Set up the listener and assign the unsubscribe function
    unsubscribe = onSnapshot(collection(db, 'listings'), snapshot => {
        const listingsData: Listing[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log("Updated listings:", listingsData);
        setListings(prevListings => {
            // Check if the new listings are different from the current state to prevent unnecessary re-renders
            if (JSON.stringify(prevListings) !== JSON.stringify(listingsData)) {
                return listingsData;
            }
            return prevListings;
        });
    });

    // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return () => {
        console.log("Unsubscribing from listings...");
        unsubscribe(); // Call unsubscribe here
    };
}, []); // Removed listings from the dependency array to prevent infinite re-renders


  const numColumns = Math.round(width/moderateScale(215))

  const [searchResults, setSearchResults] = useState<Object[]>([]);
  const [hasSearched, sethasSearched] = useState(false);
  const navigation = useNavigation()
  const route = useRoute()
  
  function Item(props) {
    const { id,userId, title, image, description, price, tags } = props;
    const scaleValue = useRef(new Animated.Value(1)).current; // Initial scale
  
    const handleMouseEnter = () => {
      Animated.spring(scaleValue, {
        toValue: 1.05,
        useNativeDriver: true
      }).start();
    };
  
    const handleMouseLeave = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true
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
        <Image
          style={{
            width: moderateScale(155),
            height: moderateVerticalScale(170),
            marginTop: 10,
            borderRadius: 5
          }}
          source={{ uri: image }}
        />
        <View style={{ marginTop: 10, width: moderateScale(155) }}>
          <Text style={{ fontWeight: "bold", fontSize: moderateScale(10), color: "black" }}>
            {title}
          </Text>
          <Text style={{ fontSize: moderateScale(10), color: "black" }}>
            ${price}
          </Text>
          <Text style={{ fontSize: moderateScale(10), color: "black" }}>
            {returnTags(tags)}
          </Text>
        </View>
      </Animated.View>
    );
  }

  // update searchResults when listings change
  useEffect(() => {
    setSearchResults(listings);
  }, [listings]);

  const handleSearch = (query: any) => {
    if (query === "") {
      sethasSearched(false);
      setSearchResults(listings.filter(Item => Item));
      return;
    }
    sethasSearched(true);
    const filteredItems = listings.filter(Item =>
      (Item.title.toLowerCase().includes(query.toLowerCase()) || Item.tags.some(tag => tag.includes(query))
    ));
    setSearchResults(filteredItems);
  };
  const checkSearch = (query) => {
    handleSearch(query)
  };
  const q = route.params?.obj?.q;
  let h = route.params?.obj?.h;

  useEffect(() => {
    if (h) {
      h = false;
      handleSearch(q);
    }
  }, [q, h]);
  useEffect(() => {
    console.log("Listings state:", listings);
  }, [listings]);

  function returnTags(tagList) {
    // Map each tag to a Text component wrapped in a View component styled to look like a small grey pill-shaped box
    return tagList.map((tag, index) => (
      <View key={index} style={styles.tag}>
        <Text style={styles.tagText}>{tag}</Text>
      </View>
    ));
  }

  function renderItem({item}) {
    console.log('item rendered');
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
        <Item userId={item.userId} id={item.id} title={item.title} image={item.images[0]} description={item.description} price={item.price} tags={item.tags}/>
      </Pressable>
    )
  }
  

  let tags = [];

  function renderTags({item}) {
    for (let i = 0; i < item.tags.length; i++) {
      if (!tags.includes(item.tags[i])) {
        tags.push(item.tags[i])
        return (
          <Pressable onPress = {() => handleSearch(item.tags[i])}>
          <View style={{justifyContent: "center", marginLeft: 40}}>
            <Text style={{fontWeight: "bold", color: "gray"}}>
              {item.tags[i]}
            </Text>
          </View>
          </Pressable>
        )
      }
    }
  }

  function renderHardTags({item}) {
    const tag = item.tag;
    return (
      <Pressable onPress = {() => handleSearch(tag)}>
      <View style={{justifyContent: "center", marginLeft: 40}}>
        <Text style={{fontWeight: "bold", color: "gray"}}>
          {tag}
        </Text>
      </View>
      </Pressable>
    )
  }
  console.log()
  
    return (
      <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
              <MainHeader onInput={checkSearch} isListing={true}></MainHeader>
                <View style={{height: 40}}>
                  <View style={{flex: 1, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#d3d3d3", alignItems: "center"}}>
                    <FlatList
                      horizontal={true}
                      data={TAGS}
                      keyExtractor={(item) => item.id}
                      renderItem={renderHardTags}
                      ItemSeparatorComponent={() => <View style={{width: 0}}/>}
                      ListEmptyComponent={Empty}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                </View>
                <View style={styles.page}>
                      {/* <Carousel /> */}
                      {/* {listing("Mac", laptop)}

                      {listing("Refrigerator", fridge)}

                      {listing("Microwave", microwave)} */}
                      <View style={[styles.resultsContainer, {}]}>
                          <FlatList
                          ListHeaderComponent={<Carousel />}
                          // ListFooterComponent={<Footer />}
                          contentContainerStyle={{flex: 1, alignItems: "center"}}
                          data={searchResults}
                          key={`${numColumns}`}
                          keyExtractor={(item) => item.id}
                          renderItem={renderItem}
                          ItemSeparatorComponent={() => <View style={{height: 30, width: 30}}/>}
                          ListEmptyComponent={Empty}
                          numColumns={Math.round(width/moderateScale(215))}
                          // showsVerticalScrollIndicator={false}
                        />
                      </View>
                </View>
            </View>
      </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
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
  // compName: {
  //   //fontSize: scale(17) < 20 ? 20 : scale(17),
  //   color: "rgb(34 197 94)",
  //   fontWeight: "bold",
  //   //width: "20%",
  //   marginTop: 15,
  //   paddingTop: 0,
  // },
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
  // shoppingCart: {
  //   //backgroundColor: "black",
  //   padding: 10,
  //   //borderRadius: 13,
  //   //overflow: "hidden",
  // },
  // products: {
  //   // flex: 1,
  //   // flexDirection: "row",
  //   //padding: 10,
  //   //width: (width/2),
  //   //backgroundColor: "rgb(17 24 39)",
  //   //borderWidth: 1,
  //   //borderColor: "red",    
  // },
  // productsText: {
  //   //height: 50,
  //   //width: (width/2),
  //   //fontWeight: "bold",
  //   padding: 0,
  //   backgroundColor: "#e5e7eb",
  //   color: "black",
  //   fontSize: 23,
  //   //overflow: "hidden",
  //   // borderRadius: 20,
  // },
  page: {
    //backgroundColor: "yellow",
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    // borderColor: "red",
    //flexDirection: "row",
    // flexWrap: "wrap",
    // overflow: "scroll",
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
    // marginTop: 120,
    flex: 2,
    width: "100%",
    //flexGrow: 1,
    // flexDirection: "row",
    // width: "100%",
    // alignContent: "center",
    // alignItems: "center",
    // borderWidth: 10,
    // borderColor: "red",
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

export default Listings