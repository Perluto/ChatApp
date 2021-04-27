import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AppAvatar from '../AppAvatar';

function Inbox({name, message, time, image, onPress, renderRightActions}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.item}>
          <View style={{width: '20%', alignItems: 'flex-start'}}>
            <AppAvatar image={image} size={60} />
          </View>
          <View style={styles.content}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
              {message}
            </Text>
          </View>
          <View style={styles.status}>
            <Text style={{fontSize: 15}}>{time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', paddingVertical: 5},
  item: {
    marginVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    width: '100%',
  },
  content: {width: '60%', justifyContent: 'center', paddingHorizontal: 5},
  status: {
    width: '20%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  name: {fontSize: 20, color: 'black'},
  message: {fontSize: 10, color: '#6e6969', width: '90%'},
});

export default Inbox;
