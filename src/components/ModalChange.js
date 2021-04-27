import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Overlay} from 'react-native-elements';
import {
  AppForm,
  ErrorMessage,
  AppFormField,
  SubmitBtn,
} from '../components/forms';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ModalChange({visible, toggleOverlay, data, validateSchema}) {
  const {id, textContentType, onPress, title, icon} = data;
  const schema = validateSchema.pick([data.id]);

  const handleSubmit = data => {
    console.log(data);
  };

  if (!data) return null;

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{
        backgroundColor: '#f8f4f4',
        height: '50%',
        width: '90%',
      }}>
      <TouchableOpacity onPress={toggleOverlay} style={{alignSelf: 'flex-end'}}>
        <MaterialCommunityIcons name="close" size={40} />
      </TouchableOpacity>
      <View style={styles.container}>
        <AppForm
          initialValues={{[id]: ''}}
          onSubmit={handleSubmit}
          validationSchema={schema}>
          <AppFormField
            name={id}
            placeholder="Type..."
            icon={icon}
            autoCapitalize="none"
            textContentType={textContentType}
            secureTextEntry={textContentType === 'password' ? true : false}
            autoCorrect={false}
            width="75%"
          />
          <SubmitBtn title="Save" color="#EF798A" width="25%" />
        </AppForm>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default ModalChange;
