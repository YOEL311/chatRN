import React, {useRef, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Massage from '../components/Massage';
import TypingArea from '../components/TypingArea';
import {StreamChat} from 'stream-chat';
import socketClient from 'socket.io-client';
// import {observer, useObservable} from 'mobx-react-lite';
import {observer} from 'mobx-react-lite';

import store from '../store/Store';
// const CHAT_SERVER = 'http://192.168.161.1:4000';
// const client = new StreamChat('12345');

const Chat = props => {
  const scrollViewRef = useRef();
  const userId = `User${Math.floor(Math.random() * 1000000)}`;
  // const CHAT_SERVER = 'http://192.168.161.1:3000';
  const CHAT_SERVER = 'https://chat-server-yoel.herokuapp.com';

  var socket = socketClient(CHAT_SERVER);

  const [massages, setMassages] = useState([]);

  React.useEffect(() => {
    const massage = {
      user: {userId, userName: 'Yoel'},
      body: 'massage',
      time: Date.now(),
    };

    setMassages(prev => [...prev, massage]);
    socket.emit('chat message', massage);

    // socket.on('chat message', data => {});
    socket.on('chat message', data => {
      setMassages(prev => [...prev, data]);
      console.log(
        '🚀 ~ file: chat.js ~ line 31 ~ React.useEffect ~ data',
        data,
      );
    });
    return () => {
      socket.emit('end');
      socket.disconnect();
    };
  }, []);

  const onSendMassage = massageToSend => {
    const massage = {
      user: {userId: store.id, userName: store.name},
      body: massageToSend,
    };

    socket.emit('chat message', massage);
    // massage.time = Date.now();
    // setMassages(prev => [...prev, massage]);
  };
  console.log(massages);
  return (
    <View style={styles.rootChat}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {massages.map((el, i) => {
          return (
            <Massage
              key={el.time}
              data={el}
              isMyMassage={el.user.userId === store.id}
            />
          );
        })}
        {/* {[1, 4, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 14, 12].map((el, i) => {
          return <Massage from={el} key={i} />;
        })} */}
      </ScrollView>
      <TypingArea onSendMassage={onSendMassage} />
    </View>
  );
};

export default observer(Chat);

// export default Chat;

const styles = StyleSheet.create({
  scroll: {flexGrow: 1, justifyContent: 'flex-end'},
  rootChat: {
    backgroundColor: '#ACC8E9',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
