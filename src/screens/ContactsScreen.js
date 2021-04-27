import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';
import ListFriends from '../components/ListFriends';
import HeaderScreen from '../components/HeaderScreen';

function ContactsScreen({navigation}) {
  const data1 = [
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

  const [data, setData] = useState(data1);

  useEffect(() => {}, []);

  const [search, setSearch] = useState('');

  const updateSearch = textChanged => {
    setSearch(textChanged);
  };

  return (
    <View style={styles.container}>
      <HeaderScreen title="Contacts" />
      <SearchBar
        round
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={{
          backgroundColor: 'white',
        }}
        inputContainerStyle={{backgroundColor: 'white'}}
      />
      <ListFriends
        data={data}
        renderRightBtn={() => (
          <TouchableOpacity onPress={() => console.log(1)}>
            <Ionicons name="call-outline" size={30} color="#3A86FF" />
          </TouchableOpacity>
        )}
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

export default ContactsScreen;
