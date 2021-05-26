import React, {useRef, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Massage from '../components/Massage';
import TypingArea from '../components/TypingArea';
import socketClient from 'socket.io-client';
import {observer} from 'mobx-react-lite';

import store from '../store/Store';
const Chat = props => {
  const scrollViewRef = useRef();
  // const CHAT_SERVER = 'http://192.168.161.1:3000';
  const CHAT_SERVER = 'https://chat-server-yoel.herokuapp.com';
  var socket = socketClient(CHAT_SERVER);

  const [massages, setMassages] = useState([]);

  React.useEffect(() => {
    const massage = {
      user: {userId: store.id, userName: store.name},
      body: `${store.name} enter in room`,
    };

    socket.emit('chat message', massage);

    socket.on('chat message', data => {
      console.log(
        '🚀 ~ file: chat.js ~ line 31 ~ React.useEffect ~ data',
        data,
      );
      if (data.user.userId !== store.id) {
        setMassages(prev => [...prev, data]);
      }
    });
    return () => {
      socket.emit('end');
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSendMassage = massageToSend => {
    const massage = {
      user: {userId: store.id, userName: store.name},
      body: massageToSend,
    };
    socket.emit('chat message', massage);
    massage.time = Date.now();
    massage.isMyMassage = true;
    setMassages(prev => [...prev, massage]);
  };

  return (
    <View style={styles.rootChat}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        ref={scrollViewRef}
        onContentSizeChange={
          () => scrollViewRef.current.scrollToEnd({animated: true})
<<<<<<< HEAD
=======
          // scrollViewRef.current.scrollToEnd()
>>>>>>> d978fac83c51d0f325170c04d3206f553725b6e4
        }>
        {massages.map((el, i) => {
          console.log('🚀 ~ file: chat.js ~ line 80 ~ {massages.map ~ el', el);
          return (
            <Massage
              key={el.time}
              data={el}
              isMyMassage={el.user.userId === store.id}
            />
          );
        })}
      </ScrollView>
      <TypingArea onSendMassage={onSendMassage} />
    </View>
  );
};

export default observer(Chat);

const styles = StyleSheet.create({
  scroll: {flexGrow: 1, justifyContent: 'flex-end'},
  rootChat: {
    backgroundColor: '#ACC8E9',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
