import React from 'react';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';

export default function Screen({children, style = {}}) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[style, styles.view]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
