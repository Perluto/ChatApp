import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBar, CheckBox} from 'react-native-elements';

import HeaderScreen from '../../components/HeaderScreen';
import useAuth from '../../auth/useAuth';

function NewGroupScreen({navigation}) {
  const [data, setData] = useState([]);
  const {user} = useAuth();

  useEffect(() => {}, []);

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

  const createNewGroup = async participants => {
    navigation.navigate('group-detail', {
      idRoomChat: result.data.idRoomChat,
      roomName: result.data.roomName,
    });
  };

  const [search, setSearch] = useState('');

  const updateSearch = textChanged => {
    setSearch(textChanged);
  };

  const renderRightBtn = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('group-list')}>
        <MaterialCommunityIcons name="window-close" color="white" size={25} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen title="New Group" renderRightBtn={renderRightBtn} />
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
      <FlatList
        contentContainerStyle={{paddingVertical: 10}}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <View style={styles.boxContainer}></View>}
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

export default NewGroupScreen;
