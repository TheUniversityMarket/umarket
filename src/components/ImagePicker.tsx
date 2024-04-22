import { View, Pressable, StyleSheet, Text } from 'react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
//import { Alert } from 'react-native/types';

const pickImageAsync = async () => {
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      //Alert.alert('You did not select any image.');
      console.log('You did not select any image.');
    }
};

export default function ImagePicker() {
    return (
        <View>
            <Pressable style={[styles.button, { backgroundColor: 'green' }]} onPress={pickImageAsync}>
              <Text style={{color:"white"}}>Img</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginLeft: 10,
        padding: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "grey",
        width: 50,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(34 197 94)",
        zIndex: 1
    }
})
