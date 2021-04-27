import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Screen from '../components/Screen';
import HeaderScreen from '../components/HeaderScreen';
import {AppChat} from '../components/chat';

function ChatDetailScreen({route, navigation}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);

    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  const renderLeftBtn = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('chat-list')}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          color="white"
          size={30}
          style={{marginRight: 10}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Screen style={styles.container}>
      <HeaderScreen title="Chats" renderLeftBtn={renderLeftBtn} />
      <AppChat
        messages={messages}
        setMessages={setMessages}
        user={{
          _id: 1,
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f4f4'},
  sendBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});

export default ChatDetailScreen;
