import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

function HeaderScreen({
  title,
  image = null,
  renderRightBtn = null,
  renderLeftBtn = null,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.item1}>
          {renderLeftBtn && renderLeftBtn()}
          {image && <Image source={image} style={styles.image} />}
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.item2}>{renderRightBtn && renderRightBtn()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3A86FF',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  item1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  item2: {justifyContent: 'center', alignItems: 'flex-end'},
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 0.1,
    marginRight: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HeaderScreen;
