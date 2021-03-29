import React from 'react';
import {Text, Platform} from 'react-native';

function AppText({children, style, ...otherProps}) {
  return (
    <Text
      style={[
        {
          color: '#0c0c0c',
          fontSize: 18,
          fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        },
        style,
      ]}
      {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
