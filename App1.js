import React, { useState, useCallback } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Text,
} from 'react-native';

const FloatingLabelInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {setIsFocused(true), []};
  const handleBlur = () => {setIsFocused(false), []};

  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: !isFocused ? 18 : 0,
    fontSize: !isFocused ? 20 : 14,
    color: !isFocused ? '#aaa' : '#000',
  };

  return (
    <View style={{ paddingTop: 18 }}>
      <Text style={labelStyle}>
        {label}
      </Text>
      <TextInput
        {...props}
        style={{ height: 26, fontSize: 20, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit
      />
    </View>
  );
};

const App = () => {
  const [value, setValue] = useState('');

  const handleTextChange = (newText) => setValue(newText);

  return (
    <View style={{ flex: 1, padding: 30, backgroundColor: '#f5fcff' }}>
      <StatusBar hidden />
      <FloatingLabelInput
        label="Email"
        value={value}
        onChangeText={handleTextChange}
      />
    </View>
  );
};

export default App;