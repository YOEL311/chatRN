import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput, I18nManager} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TypingArea = props => {
  const [isSendVisible, setIsSendVisible] = useState(false);
  const [massage, setMassage] = useState('');

  useEffect(() => {
    if (massage.length > 3) {
      setIsSendVisible(true);
    } else {
      setIsSendVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [massage]);

  return (
    <View style={styles.root}>
      <TextInput
        value={massage}
        onChangeText={text => {
          setMassage(text);
        }}
        style={styles.input}
        placeholder="Your massage..."
        placeholderTextColor="#000"
        multiline={true}
      />
      {isSendVisible && (
        <Icon
          onPress={() => {
            console.log('on press');
            if (massage.length > 3) {
              props.onSendMassage(massage);
              setMassage('');
            }
          }}
          style={styles.sendIcon}
          name="send"
          size={30}
          color="#8d6c9f"
        />
      )}
    </View>
  );
};

export default TypingArea;

const styles = StyleSheet.create({
  root: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    flex: 1,
    color: 'black',
    backgroundColor: '#ffff',
    minHeight: 50,
    maxHeight: 60,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    color: 'black',
    flex: 1,
    backgroundColor: '#ffff',
    paddingStart: 10,
  },
  sendIcon: {
    width: 30,
  },
});
