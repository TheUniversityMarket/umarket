import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, Dimensions, useWindowDimensions, Pressable, ImageBackground } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';

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
    return (
        <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
                    <View style={{width: "100%"}}>
                        <View style={{alignItems: "flex-start", width: "100%", marginLeft: scale(7), marginTop: scale(7) }}>
                            <Pressable style={ ({ pressed }) => [
                                {borderRadius: 100},
                                pressed && {backgroundColor: "rgb(34 197 94)"}
                                ]}
                                onPress={() => navigation.navigate('Listings', { item })}>
                                <Ionicons name="arrow-back-circle-sharp" size={moderateScale(37)} color="black" />
                            </Pressable>
                        </View>
                        <View style={{alignItems: "center", gap: 10}}>
                            <Text style={{ fontWeight: "bold", fontSize: scale(20) }}>{item.title}</Text>
                            <Image source={{uri: item.image}} style={styles.backgroundImage} resizeMode="contain" />
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
                            <ScrollView>
                                <Text style={{fontSize: moderateScale(13)}}>
                                    {item.description}
                                </Text>
                            </ScrollView>
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

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: "white",
    },
    container: {
      //flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundImage: {
        borderRadius: 3,
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
    }
})

export default ListingItem