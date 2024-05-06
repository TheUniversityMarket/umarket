import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Stylesheet, Pressable, useWindowDimensions, Image, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';
import { useState } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
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

    interface CarouselScreensProps {
        name: string;
        image: ImageSourcePropType;
    }

    const CarouselScreens: CarouselScreensProps[] = [
        {
            name: 'Screen 1',
            image: require('../../Images/UMarketCover.png')
        },
        {
            name: 'Screen 2',
            image: require('../../Images/Clothing.jpeg')
        },
        {
            name: 'Screen 3',
            image: require('../../Images/Housing.jpeg')
        },
        {
            name: 'Screen 4',
            image: require('../../Images/Tickets.jpeg')
        },
        {
            name: 'Screen 5',
            image: require('../../Images/Services.jpeg')
        },
    ]

    type Props = {
        index: number;
        item: CarouselScreensProps
        paginationIndex: number;
    }

    function Pagination({paginationIndex}: Props) {
        return (
            <View style={styles.container}>
                {CarouselScreens.map((screen, index) => {
                    return <DotScroll key={index} index={index} paginationIndex={paginationIndex} />
                })}
            </View>
        )
    }
    
    function CarouselImage({index, item}: Props) {
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

        return (
            <View>
                <ImageBackground source={item.image} style={{width: moderateScale(160) * numColumns, height: width / 4, flexDirection: "row", justifyContent: "center"}}>
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <Pressable style={{width: 37}} onPress={() => setCurrentIndex(index - 1 < 0 ? index + 4 : index - 1)}>
                            <SimpleLineIcons name="arrow-left" size={24} color="white" style={{marginLeft: 13}} />
                        </Pressable>
                    </View>
                    <View style={{alignSelf: "flex-end", flex: 1}}>
                        <Pagination paginationIndex={index} />
                    </View>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "flex-end"}}>
                        <Pressable style={{width: 37}} onPress={() => setCurrentIndex(index + 1 > 4 ? 0 : index + 1)}>
                            <SimpleLineIcons name="arrow-right" size={24} color="white" style={{marginRight: 13}} />
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    // type Props2 = {
    //     index: number;
    //     paginationIndex: number;
    // }
    
    function DotScroll({index, paginationIndex}: Props) {
        return (
            <View style={paginationIndex === index ? styles.dot : styles.dotUnclicked}/>
        )
    }

    return (
        <View style={{flex: 1, alignSelf: "center"}}>
            <StatusBar translucent backgroundColor={'transparent'} />
           {CarouselScreens.map((screen, index) => {
            return (
                <View key={index}>
                    {currentIndex === index && <CarouselImage index={index} item={screen} />}
                </View>
            )
           })}
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
    },
    dot: {
        backgroundColor: "white",
        width: 8,
        height: 8,
        marginHorizontal: 2,
        borderRadius: 8,
    },
    dotUnclicked: {
        backgroundColor: "white",
        width: 7,
        height: 7,
        marginHorizontal: 2,
        borderRadius: 8,
        opacity: 0.5,
    }
})

export default Carousel;