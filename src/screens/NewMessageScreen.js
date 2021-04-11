import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListFriends from '../components/ListFriends';
import HeaderScreen from '../components/HeaderScreen';

function NewMessageScreen({navigation}) {
  const data = [
    {id: 1, name: 'Hoang', avatar: null},
    {id: 2, name: 'Hoang', avatar: null},
    {id: 3, name: 'Hoang', avatar: null},
    {id: 5, name: 'Hoang', avatar: null},
    {id: 6, name: 'Hoang', avatar: null},
    {id: 7, name: 'Hoang', avatar: null},
    {id: 8, name: 'Hoang', avatar: null},
    {id: 9, name: 'Hoang', avatar: null},
    {id: 10, name: 'Hoang', avatar: null},
    {id: 11, name: 'Hoang', avatar: null},
    {id: 12, name: 'Hoang', avatar: null},
    {id: 13, name: 'Hoang', avatar: null},
    {id: 14, name: 'Hoang', avatar: null},
    {id: 15, name: 'Hoang', avatar: null},
    {id: 16, name: 'Hoang', avatar: null},
    {id: 17, name: 'Hoang', avatar: null},
  ];

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });

    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  const renderRightBtn = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('chat-list')}>
        <MaterialCommunityIcons name="window-close" color="white" size={25} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen title="New Message" renderRightBtn={renderRightBtn} />
      <ListFriends
        data={data}
        onPress={() => navigation.navigate('chat-detail')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default NewMessageScreen;
