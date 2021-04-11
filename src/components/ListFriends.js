import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ListFriends({data, message = true, onPress}) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{paddingBottom: 50}}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.boxContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/avatar.jpg')}
                  style={styles.image}
                />
                <Image
                  source={require('../../assets/off.png')}
                  style={styles.frame}
                />
              </View>
              <Text style={styles.text}>{item.name}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
              <Ionicons
                name={message ? 'md-chatbox-ellipses-outline' : 'call-outline'}
                size={30}
                color="#3A86FF"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: 15},
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
    fontSize: 30,
  },
});

export default ListFriends;
