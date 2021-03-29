import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function InboxDeleteAction(props) {
  return (
    <TouchableWithoutFeedback onPress={() => console.log('press')}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={30}
          color="white"></MaterialCommunityIcons>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InboxDeleteAction;
