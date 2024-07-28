import React from 'react';
import { View, Pressable, StyleSheet, Text, Alert } from 'react-native';
import { launchImageLibraryAsync, ImagePickerSuccessResult } from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

interface CustomInputProps {
  value: string;
  onClick: () => void;
  fontSize: number;
}

interface ImagePickerProps {
  width: number;
  height: number;
  onImageSelected: (uri: string) => void;
}
const CustomInput: React.FC<CustomInputProps> = ({ value, onClick, fontSize }) => (
  <input
    style={{ fontSize: `${fontSize}px`, padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 2}}
    onClick={onClick}
    value={value}
    readOnly
  />
);

const ImagePicker: React.FC<ImagePickerProps> = ({ width, height, onImageSelected }) => {
  const pickImageAsync = async () => {
    let result: ImagePickerSuccessResult = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const { uri } = result.assets[0];

      // Resize the selected image
      const resizedImage = await resizeImage(uri, 500, 500); // Set your desired width and height

      onImageSelected(resizedImage); // Call the function passed from the parent component
    } else {
      console.log('You did not select any image.');
      Alert.alert('You did not select any image.');
    }
  };

  const resizeImage = async (uri, width, height) => {
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width, height } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
      );
      return resizedImage.uri;
    } catch (error) {
      console.error('Error resizing image:', error);
      return null;
    }
  };

  return (
    <View>
      <Pressable style={[styles.button, { backgroundColor: 'green', marginTop: 10,
        padding: (Math.sqrt(3*width/(1200/10))),
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'grey',
        width: width/(1200/150),
        height: width < height ? width/(600/40) : height/(600/40), }]} onPress={pickImageAsync}>
        <Text style={{ color: 'white', fontSize: width/(1200/17) }}>Add Image:</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ImagePicker;