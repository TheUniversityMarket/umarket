import { Text, View, StyleSheet, SafeAreaView, Pressable, Image, FlatList, Dimensions, } from "react-native"
import { TextInput } from "react-native";
import { useState } from "react"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from '@react-navigation/native';
import MainHeader from "../components/MainHeader";

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];
//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const microwave = "https://images.craigslist.org/00Q0Q_clz03CCkybF_0CI0t2_600x450.jpg"
const fridge = "https://i.ebayimg.com/images/g/5JAAAOSwdB9hnRZ6/s-l1600.jpg"

const DATA = [
    { id: '1', title: "Microwave", image: microwave, description: 'A microwave is a kitchen appliance that heats and cook food quickly.', price: "$730", tags: ['kitchen', 'electrical','cooking'] },
    { id: '2', title: "Fridge", image: fridge, description: 'A fridge is where you keep your food.', price: "$899", tags: ['kitchen', 'electrical','cooking'] },
  ]

function Item(props) {
    const { id, title, image, description, price, tags} = props
    return (
      <View style={styles.item}>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <View>
            <Text style={{fontWeight: "bold", fontSize: moderateScale(13)}}>{title}</Text>
          </View>
          <View>
            <Text style={{fontSize: moderateScale(13)}}>{price}</Text>
          </View>
        </View>
        <Image style={{ width: moderateScale(155), height: moderateVerticalScale(170), borderRadius: 0, marginTop: 10, borderWidth: 0, borderColor: "rgb(34 197 94)"}} source={{uri: image}}/>
      </View>
    )
  }

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

function Empty() {
    return (
      <View>
        <Text style={styles.bodyTxt}>
          NO LISTINGS
        </Text>
      </View>
    )
  }

  

function Settings() {
    const companyName = "UMarket";
    const navigation = useNavigation();

    

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
            <View style={styles.container}>
                <View>
                    {/* <Text style={styles.compName}>
                        UMarket
                    </Text> */}
                </View>
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
                            <TextInput placeholder="Nash" style={styles.nameCont} />
                        {/* <View style={styles.nameCont2}> */}
                        </View>
                        <View style={{flex: 1, padding: 10, minWidth: 225}}>
                            <Text>Last Name:</Text>
                            {/* <TextInput style={styles.itemIn} */}
                            <TextInput placeholder="Moore" style={styles.nameCont} />
                        </View>
                        <View style={{flex: 1}}></View>
                    </View>
                    <View style={{width: "100%", flexDirection: "row", gap: 10}}>
                        {/* <View style={styles.nameCont}> */}
                        <View style={{flex: 1}}></View>
                        <View style={{flex: 1, padding: 10, minWidth: 225}}>
                            <Text>Email:</Text>
                            {/* <TextInput style={styles.itemIn} */}
                            <Text style={styles.nameCont}>nmoore66@gatech.edu</Text>
                        {/* <View style={styles.nameCont2}> */}
                        </View>
                        <View style={{flex: 1, padding: 10, minWidth: 225}}>
                            <Text>Phone Number:</Text>
                            {/* <TextInput style={styles.itemIn} */}
                            <TextInput placeholder="214-304-9926" style={styles.nameCont} />
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
                <Pressable style={ ({ pressed }) => [
                    styles.submitContainer,
                    pressed && {backgroundColor: "rgb(34 197 94)", }
                    ]}>
                <View >
                        <Text style={{fontSize: 20, textAlign:"center", alignSelf:"center"}}>Save Info</Text>
                </View>
                </Pressable>
                    <View style={styles.headerContainerAlt}>
                        <Text style={styles.header}>Your Listings:</Text>
                        <View style={styles.page}>
                            <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ItemSeparatorComponent={() => <View style={{height: 30}}/>}
                            ListEmptyComponent={Empty}
                            numColumns={Math.round(width/moderateScale(215))}
                            />
                        </View>
                    </View>
                    <Pressable style={ ({ pressed }) => [
                                styles.submitContainer,
                                pressed && {backgroundColor: "#e5e7eb"}
                                ]} onPress={() => {navigation.navigate('Login/SignUp');
                                }}>
                        <View>
                            <Text style={{fontSize: 20}}>Sign Out</Text>
                        </View>
                    </Pressable>
            </View>
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
        marginTop: 3
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
        color: "#228B22",
        textAlign: "auto",
        paddingLeft: 10,
        marginRight: 10,
    },
    submitContainer: {
        flexDirection: "row",
        marginTop: 40,
        marginLeft: 5,
        padding: 7,
        borderRadius: 10,
        backgroundColor: "#B3B3B3",
        width: 120,
        height: 40,
        alignSelf: "center",
        alignContent: "center",
        borderColor: "black",
        borderWidth: 1,
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
    },
})

export default Settings