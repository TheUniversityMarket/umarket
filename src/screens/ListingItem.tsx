import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, Dimensions, useWindowDimensions, Pressable, ImageBackground, TextInput, StatusBar } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const USERS = [
    { id: '1', name: "Jevon", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
    { id: '2', name: "Nash", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
    { id: '3', name: "Paul", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
  ]

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

function ListingItem( {navigation} ) {
    const route = useRoute()
    const { item } = route.params
    const companyName = "UMarket";
    return (
        <SafeAreaView style={styles.safeContainer}>

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
            <View style={{flex: 1, flexDirection:"row", justifyContent: "center"}}>
                <View style={{alignItems: "flex-start", marginLeft: scale(7), marginTop: scale(7),}}>
                    <Pressable style={ ({ pressed }) => [
                        {borderRadius: 100},
                        pressed && {backgroundColor: "rgb(34 197 94)"}
                        ]}
                        onPress={() => navigation.navigate('Listings', { item })}>
                        <Ionicons name="arrow-back-circle-sharp" size={moderateScale(37)} color="black" />
                    </Pressable>
                </View>
                <ScrollView>
                    <View style={styles.container}>

                        <View style={{width: "100%"}}>

                            <View style={{alignItems: "center", gap: 0}}>
                                <Text style={{ fontWeight: "bold", fontSize: scale(20) }}>{item.title}</Text>
                                <Image source={{uri: item.image}} style={styles.productImage} resizeMode="contain" />
                            </View>
                        </View>


                        <View style={styles.productInformation}>
                            <View>
                                <View>
                                    <View style={{}}>
                                        <Text style={{fontWeight: "bold", fontSize: moderateScale(17) }}>{item.title}</Text>
                                    </View>
                                    <Text style={{marginBottom: 10, fontSize: moderateScale(10)}}>
                                        {returnTags(item.tags)}
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <Text style={{fontWeight: "bold", fontSize: moderateScale(13)}}>
                                    Description:
                                </Text> 
                                <Text style={{fontSize: moderateScale(13)}}>
                                    {item.description}
                                </Text>
                            </View>
                            <View style={{marginTop: 10}}>
                                <View>
                                    <Text style={{fontSize: moderateScale(13)}}>
                                        Price: {item.price}
                                    </Text>
                                </View>
                                <Pressable style={{marginTop: 7}}>
                                    <Text style={{fontSize: moderateScale(13), color: "#22c55e"}}>Message</Text>
                                </Pressable>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: "white",
    },
    container: {
      marginRight: scale(7) + moderateScale(33),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto',
    },
    productImage: {
        //orderRadius: 0,
        backgroundColor: "black",
        //height: moderateScale(200),
        //width: scale(230),
        width: moderateScale(300),
        height: moderateScale(300),
        //justifyContent: "center",
        //alignItems: "center",
    },
    productInformation: {
        width: moderateScale(300),
        //marginTop: scale(10),
        //alignItems: "center",
        backgroundColor: "#e5e7eb",
        borderRadius: 10,
        padding: 10,
    },
    productText: {
        width: moderateScale(300),
        borderWidth: scale(1), 
        borderColor: "rgb(34 197 94)", 
        marginTop: 0, 
        borderRadius: 3 
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
    compName: {
        fontSize: scale(17) < 20 ? 20 : scale(17),
        color: "rgb(34 197 94)",
        fontWeight: "bold",
        width: "20%",
        marginTop: 15,
        paddingTop: 0,
    },
    logo: {
        width: 40,
        height: 60,
        marginLeft: 40,
        marginTop: 17,
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
})

export default ListingItem
