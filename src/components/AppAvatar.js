import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Badge} from 'react-native-elements';

function AppAvatar({size, imageURI, online = null}) {
  return (
    <View>
      <Avatar
        rounded
        source={{uri: imageURI}}
        size={size}
        containerStyle={{
          borderWidth: 1,
          borderColor: '#696969',
        }}
      />
      {online !== null ? (
        <Badge
          status={online ? 'success' : 'error'}
          containerStyle={{position: 'absolute', top: 47, left: 47}}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppAvatar;
