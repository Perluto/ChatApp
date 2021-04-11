import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function BackBtn({onPress, style = null}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name="keyboard-backspace"
        color="white"
        size={25}
        style={[{marginRight: 10}, style]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default BackBtn;
