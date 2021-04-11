import React from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import Screen from '../components/Screen';
import HeaderScreen from '../components/HeaderScreen';
import {Inbox, InboxDeleteAction, InboxSeparator} from '../components/inbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  {id: 1, name: 'Hoang', message: '1', time: '12:00 PM'},
  {id: 2, name: 'Tuan', message: '2', time: '12:00 PM'},
  {id: 3, name: 'Quat', message: '3', time: '12:00 PM'},
  {id: 4, name: 'Tuyen', message: '4', time: '12:00 PM'},
  {id: 5, name: 'Ke', message: '5', time: '12:00 PM'},
];

function ChatListScreen({navigation}) {
  return (
    <Screen style={styles.container}>
      <HeaderScreen
        title="MESSAGES"
        image={require('../../assets/avatar.jpg')}
        renderRightBtn={() => (
          <TouchableOpacity onPress={() => navigation.navigate('create-chat')}>
            <MaterialCommunityIcons name="plus" color="white" size={30} />
          </TouchableOpacity>
        )}
      />
      <FlatList
        contentContainerStyle={{paddingBottom: 50}}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Inbox
            name={item.name}
            message={item.message}
            time={item.time}
            onPress={() =>
              navigation.navigate('chat-detail', {
                id: item.id,
                name: item.name,
              })
            }
            renderRightActions={() => <InboxDeleteAction />}
          />
        )}
        ItemSeparatorComponent={InboxSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'white', flex: 1},
});

export default ChatListScreen;
