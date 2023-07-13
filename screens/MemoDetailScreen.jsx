import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import {
  View, ScrollView, Text, StyleSheet,
} from 'react-native';

import { auth, db } from '../utils/firebase';
import { dateToString } from '../utils/date';

import CircleButton from '../components/CircleButton';
import { onSnapshot, doc } from 'firebase/firestore';

export default function MemoDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  // console.log(id);
  const [memo, setMemo] = useState(null) 

  useEffect(() => {
    (async() => {
      const currentUser = auth.currentUser
      let unsub = () => {}
      if (currentUser) {
        unsub = onSnapshot(doc(db, 'users', currentUser.uid, 'memos', id), (doc) => {
          const data = doc.data()
          console.log(data.updatedAt.toDate())
          setMemo({
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(),
          })
        });
      }
      return unsub
      })()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
        <Text style={styles.memoDate}>{memo && dateToString(memo.updatedAt)}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoText}>
          {memo && memo.bodyText}
        </Text>
      </ScrollView>
      <CircleButton
        style={{ top: 160, bottom: 'auto' }}
        name="edit"
        onPress={() => { navigation.navigate('MemoEdit', { id: memo.id, bodyText: memo.bodyText }); }}
      />
    </View>
  );
}

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
