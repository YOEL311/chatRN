import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Moment from 'react-moment';

const Massage = props => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...styles.rootMassage,
        justifyContent: props.isMyMassage % 2 === 0 ? 'flex-end' : 'flex-start',
      }}>
      <View style={styles.head}>
        <View style={styles.details}>
          <Text style={[styles.textHead, styles.textHeadName]}>
            {props.data.user.userName}
          </Text>
          <Text style={[styles.textHead, styles.textHeadDate]}>
            <Moment element={Text} fromNow>
              {props.data.time}
            </Moment>
          </Text>
        </View>
        <Text style={styles.massage}>{props.data.body}</Text>
      </View>
    </View>
  );
};

export default Massage;

const styles = StyleSheet.create({
  rootMassage: {
    alignItems: 'center',
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 24,
    marginRight: 4,
    height: 24,
    borderColor: '#8d6c9f',
    borderWidth: 1,
    borderRadius: 50,
  },
  head: {
    borderRadius: 4,
    backgroundColor: '#ffff',
  },
  textHead: {
    fontSize: 10,
  },
  textHeadName: {
    paddingStart: 6,
  },
  textHeadDate: {
    paddingEnd: 6,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  massage: {
    padding: 10,
    minWidth: '80%',
    borderRadius: 3,
    backgroundColor: '#fcd962',
  },
});
