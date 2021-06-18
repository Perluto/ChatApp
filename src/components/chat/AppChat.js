import React, {useState, useEffect, useCallback} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Actions, GiftedChat} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import AppMessage from './AppMessage';

import firestore from '@react-native-firebase/firestore';
import uploadImg from '../../utilities/uploadImg';
import uuid from 'react-native-uuid';

const chatsRef = firestore().collection('chats');

function AppChat({user, idRoomChat}) {
  const [visible, setVisible] = useState(false);
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
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel) {
        const id = uuid.v4();
        const url = await uploadImg(response, `chat/${id}`);
        props.onSend({image: url});
      }
    });
  };

  const renderMessageImage = props => {
    if (props.currentMessage.image) {
      const uri = props.currentMessage.image;

      return (
        <View>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Image
              style={{
                width: 200,
                height: 200,
                padding: 6,
                borderRadius: 15,
                resizeMode: 'cover',
              }}
              source={{uri: uri}}
            />
            <ImageView
              images={[{uri: uri}]}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setVisible(false)}
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
            onPress={() => handleSelectImg(props)}
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
