import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, Dimensions, useWindowDimensions, Pressable, ImageBackground, TextInput, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const USERS = [
    { id: '1', name: "Jevon", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
    { id: '2', name: "Nash", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
    { id: '3', name: "Paul", image: "https://www.pngitem.com/pimgs/m/146-1462217_profile-icon-orange-png-transparent-png.png", description: 'I am a student at Georgia Tech.', tags: ['student', 'computer science'] },
];

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

function scale(size) {
    return shortDimension / guidelineBaseWidth * size;
}
function verticalScale(size) {
    return longDimension / guidelineBaseHeight * size;
}
function moderateScale(size, factor = 0.5) {
    return size + (scale(size) - size) * factor;
}
function moderateVerticalScale(size, factor = 0.5) {
    return size + (verticalScale(size) - size) * factor;
}

function returnTags(tagList) {
    return tagList.map(tag => (
        <View style={styles.tag} key={tag}>
            <Text style={styles.tagText}>{tag}</Text>
        </View>
    ));
}

function ListingItem({ navigation }) {
    const route = useRoute();
    const { item } = route.params;
    const companyName = "UMarket";
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require('./assets/logo.jpg')} />
                <Text style={styles.compName}>
                    {companyName}
                </Text>
                <View style={styles.search}>
                    <AntDesign name="search1" size={24} color="rgb(34 197 94)" />
                    <TextInput placeholder="Search for product, service, tag, etc..." placeholderTextColor={'#A9A9A9'} style={{ fontSize: 20, marginLeft: 10, width: "90%" }}>
                    </TextInput>
                </View>
                <StatusBar style="auto" />
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                <View style={{ alignItems: "flex-start", marginLeft: scale(7), marginTop: scale(7), }}>
                    <Pressable style={({ pressed }) => [
                        { borderRadius: 100 },
                        pressed
                    ]}
                        onPress={() => navigation.navigate('Listings', { item })}>
                        <Ionicons name="arrow-back-circle-sharp" size={moderateScale(37)} color="black" />
                    </Pressable>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ width: "100%" }}>
                            <View style={{ alignItems: "center", gap: 0 }}>
                                <Text style={{ fontWeight: "bold", fontSize: scale(20) }}>{item.title}</Text>
                                <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
                            </View>
                        </View>
                        <View style={styles.productInformation}>
                            <View>
                                <View>
                                    <View>
                                        <Text style={{ fontWeight: "bold", fontSize: moderateScale(17) }}>{item.title}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
                                        {returnTags(item.tags)}
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: moderateScale(13) }}>
                                    Description:
                                </Text>
                                <Text style={{ fontSize: moderateScale(13) }}>
                                    {item.description}
                                </Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <View>
                                    <Text style={{ fontSize: moderateScale(13) }}>
                                        Price: {item.price}
                                    </Text>
                                </View>
                                <Pressable style={{ marginTop: 7 }}>
                                    <Text style={{ fontSize: moderateScale(13), color: "#22c55e" }}>Message</Text>
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
        backgroundColor: "#e5e7eb", // Changed background color to light gray
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Roboto',
        backgroundColor: 'white', // Encase content in a white box
        borderRadius: 10,
        padding: moderateScale(10), // Ensure there's padding around the content
        margin: moderateScale(10), // Add margin to separate the content box from the edges
        width: '50%', // Adjust width to fit within the screen nicely
    },
    productImage: {
        width: moderateScale(300),
        height: moderateScale(300),
        borderRadius: 30, // Optional, if you want rounded corners for the image
    },
    productInformation: {
        width: '100%', // Use full width of the container
        padding: 10,
        marginTop: moderateScale(10),
    },
    header: {
        alignItems: "center",
        paddingBottom: 20,
        backgroundColor: "#e5e7eb", // Match the main background
        flexDirection: "row",
        justifyContent: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#d3d3d3",
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
    tag: {
        backgroundColor: '#ffffff', // Adjust tag background to white
        borderRadius: 24,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        borderWidth: 1,
        borderColor: '#d3d3d3' // Add a subtle border for visibility
    },
    tagText: {
        color: '#333',
        fontSize: moderateScale(12),
    }
});

export default ListingItem;
