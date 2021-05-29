import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Navigation} from 'react-native-navigation';

import store from '../store/Store';

const Intro = props => {
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
          store.setName(name);
          Navigation.push(props.componentId, {
            component: {
              name: 'Chat',
            },
          });
        }}
        title={'Enter chat room'}
      />
    </View>
  );
};

Intro.options = {
  topBar: {
    title: {
      text: 'IntroPage',
      color: 'white',
    },
    background: {
      color: '#8d6c9f',
    },
  },
};

export default observer(Intro);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderColor: '#ACC8E9',
    borderWidth: 3,
    borderRadius: 2,
    padding: 12,
  },
});
