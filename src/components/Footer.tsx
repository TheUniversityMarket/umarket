import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

function Footer() {
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

    const numColumns = Math.round(width/moderateScale(215))

    // return (
    //     <View style={{width: "100%", height: scaleIt(24), marginVertical: 17, alignSelf: "center", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 37, backgroundColor: "white", flex: 1}}>
    //         <AntDesign name="twitter" size={moderateScale(24)} color="black" />
    //         <AntDesign name="instagram" size={moderateScale(24)} color="black" />
    //         <AntDesign name="linkedin-square" size={moderateScale(24)} color="black" />
    //     </View>
    // )

    return (
        <View style={{width: "100%", backgroundColor: "red", flex: 1}}>

        </View>
    )
}

export default Footer;