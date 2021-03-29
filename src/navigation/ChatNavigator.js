import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChatListScreen from '../screens/ChatListScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';

const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="chat-list" component={ChatListScreen} />
      <Stack.Screen name="chat-detail" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
