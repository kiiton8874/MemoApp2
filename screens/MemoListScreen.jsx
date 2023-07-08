import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';

import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { useIsFocused } from '@react-navigation/native';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [ memos, setMemos ] = useState([]);
  const [ isLoading, setLoading ] = useState(false)
  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    });
  }, []);

  useEffect(() => {

    (async() => {
      setLoading(true)

      if (auth.currentUser) {
        let userMemos = []
        const currentUser = auth.currentUser
        const ref = collection(db, 'users', currentUser.uid, 'memos');
        const q = query(ref, orderBy('updatedAt', 'desc'))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          // console.log(doc.id)
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(),
          })

        });
        setMemos(userMemos)
      }
      setLoading(false)
    })()
  }, [isFocused])

  if (MemoListScreen.length === 0 ) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
          <Button
            style={emptyStyles.button}
            label="作成する"
            onPress={ ()=> {navigation.navigate('MemoCreate')} }/>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <MemoList memos={memos}/>
      <CircleButton
          name="plus"
          onPress={() => { navigation.navigate('MemoCreate'); }}
        />
    </View>
  )
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAF4F8',
    },
  })

  const emptyStyles = StyleSheet.create({
    containar: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inner: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      marginBottom: 24,
    },
    button: {
      alignSelf: 'center',
    },
  })