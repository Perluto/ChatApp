import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

function AppButton({title, onPress, color = 'black', style, width = '100%'}) {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: color, style, width}]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    padding: 15,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
    textTransform: 'uppercase',
  },
});
