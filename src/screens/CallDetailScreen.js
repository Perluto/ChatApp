import React from 'react';
import {View} from 'react-native';

import Screen from '../components/Screen';
import ToolBar from '../components/call/ToolBar';
import RTCViewGrid from '../components/call/RTCViewGrid';

function CallDetailScreen({navigation}) {
  return (
    <Screen style={{flex: 1, backgroundColor: 'white'}}>
      <ToolBar></ToolBar>
      <RTCViewGrid></RTCViewGrid>
    </Screen>
  );
}
