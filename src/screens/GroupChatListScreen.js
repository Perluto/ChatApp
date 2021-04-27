import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderScreen from '../components/HeaderScreen';

function GroupChatListScreen(props) {
  return (
    <View style={styles.container}>
      <HeaderScreen title="Groups" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default GroupChatListScreen;
