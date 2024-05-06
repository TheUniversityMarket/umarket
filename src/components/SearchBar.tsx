import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

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

const SearchBar = ({ onSearch, isListings }) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // This effect will run every time searchText changes
    if (isListings) {
      handleSearch();
    }
  }, [searchText]);

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleTextChange = (text) => {
    setSearchText(text);
  };
  

  return (
    <View style={styles.container}>
      {isListings && <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={"rgb(34 197 94)"}
        onChangeText={handleTextChange}
        value={searchText}
        onSubmitEditing={handleSearch}
      />}
      {!isListings && <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={"rgb(34 197 94)"}
        onChangeText={setSearchText}
        value={searchText}
        onSubmitEditing={handleSearch}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    //width: scale(130),
    flex: 1,
    height: 40,
    borderColor: 'gray',
    //borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    outlineColor: "transparent",
  },
});

export default SearchBar;
