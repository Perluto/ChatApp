import React from 'react';
import {View, Text, StyleSheet, LogBox} from 'react-native';
import HeaderScreen from '../components/HeaderScreen';
import Info from '../components/Info';

LogBox.ignoreLogs(['Warning: ...']);

function SettingScreen() {
  return (
    <View style={styles.container}>
      <HeaderScreen title="Settings" />
      <Info />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f4f4'},
});

export default SettingScreen;
