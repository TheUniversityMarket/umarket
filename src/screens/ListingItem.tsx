import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, Dimensions, useWindowDimensions, Pressable } from 'react-native'
import { useRoute } from '@react-navigation/native'


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

function ListingItem() {
    const route = useRoute()
    return (
        <SafeAreaView>
            <View style={{justifyContent: "center", alignItems: "center", marginTop: scale(173)}}>
                <Text>Description, Price, contact information{route.params.description}</Text>
            </View>
        </SafeAreaView>
    )
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
})

export default ListingItem