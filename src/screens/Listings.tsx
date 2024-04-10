import { useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, Dimensions, useWindowDimensions, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

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
  let stringReturn = ""
  for (let i=0; i<tagList.length; i++) {
      stringReturn += "#" + tagList[i]
  }
  return stringReturn
}

function Item(props) {
  const { id, title, image, description, price, tags} = props
  return (
    <View style={styles.item}>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
      </View>
      <Image style={{ width: moderateScale(155), height: moderateVerticalScale(170), borderRadius: 0, marginTop: 10, borderWidth: 0, borderColor: "rgb(34 197 94)"}} source={{uri: image}} />
      <View style={{width: moderateScale(155), backgroundColor:"#e5e7eb", padding: 10 }}>
        <View>
            <View>
                <View style={{}}>
                    <Text style={{fontWeight: "bold", fontSize: moderateScale(17) }}>{title}</Text>
                </View>
                <Text style={{marginBottom: 10, fontSize: moderateScale(10)}}>
                    {returnTags(tags)}
                </Text>
            </View>
        </View>
        <View style={{marginTop: 3}}>
            <View>
                <Text style={{fontSize: moderateScale(13)}}>
                    Price: {price}
                </Text>
            </View>
        </View>
    </View>
    </View>
  )
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

const DATA = [
  { id: '1', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that heats and cook food quickly.', price: "$730", tags: ['kitchen', 'electrical','cooking'] },
  { id: '2', title: "Fridge", image: fridge, description: 'A fridge is where you keep your food.', price: "$899", tags: ['kitchen', 'electrical','cooking'] },
  { id: '3', title: "Laptop", image: laptop, description: 'A laptop is a computer that sits on your lap.', price: "$1200", tags: ['computer','electrical'] },
  { id: '4', title: "Lamp", image: lamp, description: 'A lamp is an electric light source.', price:"$50", tags: ['appliance', 'electrical'] },
  { id: '5', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$200", tags: ['kitchen', 'electrical','cooking'] },
  { id: '6', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$700", tags: ['kitchen', 'electrical','cooking'] },
  { id: '7', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$500", tags: ['kitchen', 'electrical','cooking'] },
  { id: '8', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that uses electromagnetic waves to heat and cook food quickly.', price:"$630", tags: ['kitchen', 'electrical','cooking'] },
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
  console.log(width)
  const navigation = useNavigation()
  function renderItem({item}) {
    return (
      <Pressable style={ ({ pressed }) => [
        {borderRadius: 10},
        pressed && {backgroundColor: "rgb(34 197 94)",}
        ]}
        onPress={() => navigation.navigate('ListingItem', { item })}>
        <Item id={item.id} title={item.title} image={item.image} description={item.description} price={item.price} tags={item.tags}/>
      </Pressable>
    )
  }

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
                  <TextInput placeholder="Search for product, service, tag, etc..." placeholderTextColor={'#A9A9A9'} style={{fontSize: 20, marginLeft: 10, width: "90%"}}>
                  </TextInput>
                </View>
                <StatusBar style="auto" />
            </View>
            <View style={styles.page}>
              {/* <ScrollView> */}
                {/* {listing("Mac", laptop)}

                {listing("Refrigerator", fridge)}

                {listing("Microwave", microwave)} */}
                <FlatList
                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                  ListEmptyComponent={Empty}
                  numColumns={Math.round(width/moderateScale(215))}
                  />
              {/* </ScrollView> */}
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white"
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
    width: "20%",
    marginTop: 15,
    paddingTop: 0,
  },
  search: {
    width: "55%",
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
    marginRight: 600,
    marginLeft: 40,
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
    fontWeight: "bold",
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
  },
  item: {
    overflow: "hidden",
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 10,
    //flexDirection: "row",
    //justifyContent: "space-around",
    //alignItems: "center"
  }
});

export default Listings