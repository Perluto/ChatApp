import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChatListScreen from '../screens/chat/ChatListScreen';
import ChatDetailScreen from '../screens/chat/ChatDetailScreen';
import NewMessageScreen from '../screens/chat/NewMessageScreen';

const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="chat-list" component={ChatListScreen} />
      <Stack.Screen name="chat-detail" component={ChatDetailScreen} />
      <Stack.Screen name="create-chat" component={NewMessageScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
