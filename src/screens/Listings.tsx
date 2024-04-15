import React, { useEffect, useState } from 'react';
import { useState, useEffect, useRef } from 'react';
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

// import { scale, verticalScale, moderateScale, moderateVerticalScale } from "/Users/jevontwitty/Documents/GitHub/UMarket/src/components/Scaling"
// import { FlatList } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
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

function returnTags(tagList) {
  // Map each tag to a Text component wrapped in a View component styled to look like a small grey pill-shaped box
  return tagList.map((tag, index) => (
    <View key={index} style={styles.tag}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  ));
}

function Item(props) {
  const { id, title, image, description, price, tags } = props;
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
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: moderateScale(10), color: "black" }}>
          {title}
        </Text>
        <Text style={{ fontSize: moderateScale(10), color: "black" }}>
          {price}
        </Text>
        <Text style={{ fontSize: moderateScale(10), color: "black" }}>
          {returnTags(tags)}
        </Text>
      </View>
    </Animated.View>
  );
}

function Empty() {
  return (
    <View>
      <Text>
        NO LISTINGS
      </Text>
    </View>
  )
}

const companyName = "Market"
// const microwave = "/Users/jevontwitty/Documents/GitHub/UMarket/Images/Microwave.jpg"
const microwave = "https://images.craigslist.org/00Q0Q_clz03CCkybF_0CI0t2_600x450.jpg"
// const fridge = "/Users/jevontwitty/Documents/GitHub/UMarket/Images/Fridge.webp"
const fridge = "https://i.ebayimg.com/images/g/5JAAAOSwdB9hnRZ6/s-l1600.jpg"
// const laptop = "/Users/jevontwitty/Documents/GitHub/UMarket/Images/Laptop.webp"
const laptop = "https://www.digitaltrends.com/wp-content/uploads/2023/06/macbookair15-03.jpg?fit=1500%2C1000&p=1"
// const lamp = "/Users/jevontwitty/Documents/GitHub/UMarket/Images/Lamp.jpg"
const lamp = "https://image.lampsplus.com/is/image/b9gt8/possini-euro-organic-twist-29-1-8-sculptural-rustic-modern-table-lamp__427p1cropped.jpg?qlt=75&wid=376&hei=376&op_sharpen=1&resMode=sharp2&fmt=jpeg"

const USERS = [
  { id: '1', name: "Jevon", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
  { id: '2', name: "Nash", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
  { id: '3', name: "Paul", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
]

const DATA = [
  { id: '1', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that heats and cook food quickly.', price: "$730", tags: ['kitchen', 'electrical','cooking'], posterID: '1' },
  { id: '2', title: "Fridge", image: fridge, description: 'A fridge is where you keep your food.', price: "$899", tags: ['kitchen', 'electrical','cooking'], posterID: '2' },
  { id: '3', title: "Laptop", image: laptop, description: 'A laptop is a computer that sits on your lap.', price: "$1200", tags: ['computer','electrical'], posterID: '3' },
  { id: '4', title: "Lamp", image: lamp, description: 'A lamp is an electric light source.', price:"$50", tags: ['appliance', 'electrical'], posterID: '1' },
  { id: '5', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$200", tags: ['kitchen', 'electrical','cooking'], posterID: '2' },
  { id: '6', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$700", tags: ['kitchen', 'electrical','cooking'], posterID: '3' },
  { id: '7', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$500", tags: ['kitchen', 'electrical','cooking'], posterID: '1' },
  { id: '8', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$630", tags: ['kitchen', 'electrical','cooking'], posterID: '2' },
]

const TAGS = [
  {tag: "kitchen"},
]

const SectionedDATA = [
  {
    title: "Kitchenware",
    data: [
    { id: '1', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that heats and cook food quickly.', tags: ['kitchen', 'electrical','cooking'] },
    { id: '2', title: "Fridge", image: fridge, description: 'A fridge is where you keep your food.', tags: ['kitchen', 'electrical','cooking'] },
    { id: '5', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', tags: ['kitchen', 'electrical','cooking'] },
    { id: '6', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', tags: ['kitchen', 'electrical','cooking'] },
    { id: '7', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', tags: ['kitchen', 'electrical','cooking'] },
    { id: '8', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', tags: ['kitchen', 'electrical','cooking'] },
  ]
  },
  {
    title: "Technologies",
    data: [
      { id: '3', title: "Laptop", image: laptop, description: 'A laptop is a computer that sits on your lap.', tags: ['computer','electrical'] },
    ]
  },

  {
    title: "Furniture",
    data: [
      { id: '4', title: "Lamp", image: lamp, description: 'A lamp is an electric light source.', tags: ['appliance', 'electrical'] },
    ]
  }
 ];

//const width = Dimensions.get('window').width
const numberOfColumns = Math.round(width/215
)

function Listings() {
  const [searchResults, setSearchResults] = useState<Object[]>([]);
  const [hasSearched, sethasSearched] = useState(false);
  const navigation = useNavigation()
  const route = useRoute()
  
  const handleSearch = (query: any) => {
    sethasSearched(true);
    const filteredItems = DATA.filter(Item =>
      (Item.title.toLowerCase().includes(query.toLowerCase()) || Item.tags.includes(query.toLowerCase()))
    );
    setSearchResults(filteredItems);
  };

  const q = route.params?.obj?.q;
  let h = route.params?.obj?.h;

  useEffect(() => {
    if (h) {
      h = false;
      handleSearch(q);
    }
  }, [q, h]);

  function renderItem({item}) {
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
        <Item id={item.id} title={item.title} image={item.image} description={item.description} price={item.price} tags={item.tags}/>
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
  console.log()

  // function listing(text: string, image: string) {
  //   return (
  //   //<ScrollView horizontal>
  //     <View style={styles.products}>
  //       <Image style={{ width: 200, height: 200, borderRadius: 10, marginTop: 10}} source={{uri: image}}></Image>
  //       <Text style={styles.productsText}>
  //         {text}
  //       </Text>
  //     </View>
  //   //</ScrollView>
  //   )
  // }

  if (width > 700) {
    return (
      <SafeAreaView style={styles.safeContainer}>
          <View style={styles.container}>

              <View style={styles.header}>
                  <Image style={styles.logo} source={require('./assets/logo.jpg')}></Image>
                  <Text style={styles.compName}>
                      {companyName}
                  </Text>
                  <View style={styles.search}>
                    <AntDesign name="search1" size={24} color="rgb(34 197 94)" />
                    <SearchBar onSearch={handleSearch}/>
                  </View>

                  <View style={{alignItems: "flex-end", marginRight: 30, marginLeft: 20}}>

                    <View style={{flexDirection: "row", alignItems: "center"}}>

                      <Pressable onPress={() => navigation.navigate('Settings')} >
                        <View style={{alignItems: "flex-end", marginRight: 30, marginTop: 17}}>
                          <MaterialIcons name="account-circle" size={43} color="rgb(34 197 94)" />
                        </View>
                      </Pressable>

                      <Pressable onPress={() => navigation.navigate('Chat')} >
                        <View style={{alignItems: "flex-end", marginRight: 30, marginTop: 17}}>
                          <Entypo name="chat" size={43} color="rgb(34 197 94)" />
                        </View>
                      </Pressable>

                      <Pressable onPress={() => navigation.navigate('Post')} >
                        <View style={{
                          borderWidth: 3,
                          borderColor: "rgb(34 197 94)",
                          marginTop: 17,
                          flexDirection: "row",
                          alignItems: "center",
                          borderRadius: 40, // Adjust this value to achieve the desired pill shape
                          paddingVertical: 10, // Ensure vertical padding is sufficient for a good appearance
                          paddingHorizontal: 15, // Adjust horizontal padding as needed
                        }}>
                          <AntDesign name="pluscircleo" size={24} color="rgb(34 197 94)" style={{ marginRight: 7 }}/>
                          <Text style={{
                            color: "rgb(34 197 94)",
                            fontWeight: "bold",
                            fontSize: 17
                          }}>
                            Post
                          </Text>
                        </View>
                      </Pressable>


                    </View>

                  </View>
                  <StatusBar style="auto" />
              </View>

              <View style={{height: 40}}>
                <View style={{flex: 1, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#d3d3d3"}}>
                  <FlatList
                    horizontal={true}
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTags}
                    ItemSeparatorComponent={() => <View style={{width: 0}}/>}
                    ListEmptyComponent={Empty}
                  />
                </View>
              </View>
              <View style={styles.page}>
                {/* <ScrollView> */}
                  {/* {listing("Mac", laptop)}

                  {listing("Refrigerator", fridge)}

                  {listing("Microwave", microwave)} */}
                  <View style={styles.resultsContainer}>
                      {hasSearched && (<FlatList
                      data={searchResults}
                      keyExtractor={(item) => item.id}
                      renderItem={renderItem}
                      ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                      ListEmptyComponent={Empty}
                      numColumns={Math.round(width/moderateScale(215))}
                      />)}
                  </View>
                  {!hasSearched && (<FlatList      
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                    ListEmptyComponent={Empty}
                    numColumns={Math.round(width/moderateScale(215))}
                    />)}
                {/* </ScrollView> */}
              </View>
          </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.safeContainer}>
          <View style={styles.container}>
              <View style={styles.header}>
                  <Image style={styles.logo} source={require('./assets/logo.jpg')}></Image>
                  <Text style={styles.compName}>
                      {companyName}
                  </Text>
                  <View style={styles.search}>
                    <AntDesign name="search1" size={24} color="rgb(34 197 94)" />
                    <SearchBar onSearch={handleSearch}/>
                  </View>

                  <StatusBar style="auto" />
              </View>
              <View style={{height: 40}}>
                <View style={{flex: 1, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#d3d3d3"}}>
                  <FlatList
                    horizontal={true}
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTags}
                    ItemSeparatorComponent={() => <View style={{width: 0}}/>}
                    ListEmptyComponent={Empty}
                  />
                </View>
              </View>
              <View style={styles.page}>
                {/* <ScrollView> */}
                  {/* {listing("Mac", laptop)}

                  {listing("Refrigerator", fridge)}

                  {listing("Microwave", microwave)} */}
                  <View style={styles.resultsContainer}>
                      {hasSearched && (<FlatList
                      data={searchResults}
                      keyExtractor={(item) => item.id}
                      renderItem={renderItem}
                      ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                      ListEmptyComponent={Empty}
                      numColumns={Math.round(width/moderateScale(210))}
                      />)}
                  </View>
                  <View style={styles.container}>
                  {!hasSearched && (<FlatList      
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                    ListEmptyComponent={Empty}
                    numColumns={Math.round(width/moderateScale(215))}
                    />)}
                  </View>
                {/* </ScrollView> */}
              </View>
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
    overflow: "scroll"
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
  page: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    // borderColor: "red",
    //flexDirection: "row",
    flexWrap: "wrap",
    overflow: "scroll",
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
    marginTop: 20,
    paddingHorizontal: 10,
    flex:1
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
  }
});

export default Listings