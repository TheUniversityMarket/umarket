import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export function scale(size: number) {
    return shortDimension / guidelineBaseWidth * size;
}
export function verticalScale(size: number) {
    return longDimension / guidelineBaseHeight * size;
}
export function moderateScale(size: number, factor = 0.5) {
    return size + (scale(size) - size) * factor;
}
export function moderateVerticalScale(size: number, factor = 0.5) {
    return size + (verticalScale(size) - size) * factor;
}
