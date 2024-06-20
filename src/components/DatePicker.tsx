import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { View } from 'react-native';

interface CustomInputProps {
  value: string;
  onClick: () => void;
  fontSize: number;
}

interface DateSelectorProps {
  width: number;
  height: number;
}


const CustomInput: React.FC<CustomInputProps> = ({ value, onClick, fontSize }) => (
  <input
    style={{ fontSize: `${fontSize}px`, padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontWeight: 2}}
    onClick={onClick}
    value={value}
    readOnly
  />
);

const DateSelector: React.FC<DateSelectorProps> = ({ width, height }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  let fontSize = width < 600 ? width / (700 / 20) : width / (1500 / 20);
  console.log(`Font size is ${fontSize}`);
  console.log(`Width is ${width}`);
  console.log(`Height is ${height}`);

  return (
    <View style={{ backgroundColor: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 1, zIndex: 999 }}>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        className="custom-datepicker"
        customInput={<CustomInput fontSize={fontSize} value={date.toLocaleDateString()} onClick={() => {}} />}
      />
    </View>
  );
};

export default DateSelector;