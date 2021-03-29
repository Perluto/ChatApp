import React, {useState, useCallback} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Send, Actions, GiftedChat} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import AppMessage from './AppMessage';

function AppChat({user, messages, setMessages}) {
  const [isVisible, setIsVisible] = useState(false);

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

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderMessage={renderMessage}
      renderMessageImage={renderMessageImage}
      renderActions={renderActions}
      renderUsernameOnMessage={true}
      user={user}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppChat;
