import React from 'react';
import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Icon({
  name,
  backgroundColor = 'black',
  colorIcon = 'white',
  size = 35,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: size / 2,
      }}>
      <MaterialCommunityIcons
        name={name}
        color={colorIcon}
        size={size * 0.5}></MaterialCommunityIcons>
    </View>
  );
}

export default Icon;
