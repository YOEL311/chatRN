import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {observer} from 'mobx-react-lite';
import store from '../store/Store';

const Intro = ({navigation}) => {
  console.log('🚀 ~ file: intro.js ~ line 6 ~ Intro ~ store', store);
  const [name, setName] = useState('');

  return (
    <View style={styles.root}>
      <Text>Enter your name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setName(text);
        }}
        placeholder={'Your name'}
      />
      <Button
        disabled={name.length < 3}
        onPress={() => {
          navigation.navigate('Chat');
          store.setName(name);
        }}
        title={'Enter chat room'}
      />
    </View>
  );
};

export default observer(Intro);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#ACC8E9',
    borderRadius: 2,
  },
});
