import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppAvatar from '../components/AppAvatar';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ListFriends({data, renderRightBtn = null}) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingVertical: 10}}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.boxContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AppAvatar size={60} />
              <Text style={styles.text}>{item.name}</Text>
            </View>
            {renderRightBtn && renderRightBtn()}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: 15, flex: 1},
  boxContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 60,
    height: 60,
    flexDirection: 'row',
  },
  frame: {
    width: 60,
    height: 60,
    left: -60,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: '#000',
    borderWidth: 0.1,
  },
  text: {
    marginLeft: 15,
    fontSize: 25,
    color: '#242424',
  },
});

export default ListFriends;
