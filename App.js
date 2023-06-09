import React, { useState, useRef } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Animated,
} from 'react-native';

const FloatingLabelInput = ({ label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  React.useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
    //   useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const labelStyle = {
    position: 'absolute',
    left: 0,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  };

  return (
    <View style={{ paddingTop: 18 }}>
      <Animated.Text style={labelStyle}>
        {label}
      </Animated.Text>
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
