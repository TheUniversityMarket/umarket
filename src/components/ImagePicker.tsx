import React from 'react';
import { View, Pressable, StyleSheet, Text, Alert } from 'react-native';
import { launchImageLibraryAsync, ImagePickerSuccessResult } from 'expo-image-picker';

export default function ImagePicker({ onImageSelected }) {
  const pickImageAsync = async () => {
    let result: ImagePickerSuccessResult = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      console.log(result.assets[0].uri);
      onImageSelected(result.assets[0].uri); // Call the function passed from the parent component
    } else {
      console.log('You did not select any image.');
      Alert.alert('You did not select any image.');
    }
  };

  return (
    <View>
      <Pressable style={[styles.button, { backgroundColor: 'green' }]} onPress={pickImageAsync}>
        <Text style={{ color: 'white' }}>Select Image</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
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
