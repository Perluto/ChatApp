import React, {useState, useEffect, useCallback} from 'react';
import {View, Image} from 'react-native';
import {Actions, GiftedChat} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import AppMessage from './AppMessage';

import firestore from '@react-native-firebase/firestore';

const chatsRef = firestore().collection('chats');

function AppChat({user, idRoomChat}) {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const roomChat = chatsRef.doc(idRoomChat).collection('messages');

  useEffect(() => {
    const unsubscribe = roomChat.onSnapshot(querySnapshot => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();
          return {...message, createdAt: message.createdAt.toDate()};
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    messages => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [messages],
  );

  const handleSend = async messages => {
    const writes = messages.map(m => roomChat.add(m));
    await Promise.all(writes);
  };

  const handleSelectImg = props => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      console.log(response);
    });
  };

  const renderMessageImage = props => {
    if (!!props.currentMessage) {
      return (
        <View>
          <TouchableOpacity {...props} onPress={() => setIsVisible(true)}>
            <Image
              style={{
                width: 200,
                height: 200,
                padding: 6,
                borderRadius: 15,
                resizeMode: 'cover',
              }}
              source={{uri: props.currentMessage.image}}
            />
            <ImageView
              images={[{uri: props.currentMessage.image}]}
              imageIndex={0}
              visible={isVisible}
              onRequestClose={() => setIsVisible(false)}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderActions = props => {
    return (
      <Actions
        {...props}
        icon={() => (
          <MaterialCommunityIcons
            onPress={handleSelectImg}
            name="file-image-outline"
            size={25}
            color="#3A86FF"
          />
        )}
      />
    );
  };

  const renderMessage = props => {
    return <AppMessage {...props} />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      renderMessage={renderMessage}
      renderMessageImage={renderMessageImage}
      renderActions={renderActions}
      renderUsernameOnMessage={true}
      user={user}
    />
  );
}

export default AppChat;
