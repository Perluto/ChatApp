import React from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppTextInput({
  icon,
  width = '100%',
  style,
  ...otherProps
}) {
  return (
    <View style={[styles.container, {width}, style]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          style={styles.icon}
          color="#6e6969"></MaterialCommunityIcons>
      )}
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  textInput: {
    color: '#0c0c0c',
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  icon: {marginRight: 10},
});
