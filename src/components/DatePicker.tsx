import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Text, Button, View, StyleSheet, SafeAreaView, Pressable, Image, Modal, TouchableOpacity, Platform} from "react-native"

const DateSelector = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <View style={{backgroundColor:"white", display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 1, zIndex: 999}}>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        style={{ marginBottom: 20, zIndex:9999, opacity:1, position: "absolute" }}
      />
    </View>
  );
};

export default DateSelector;
