import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, KeyboardAvoidingView,
} from 'react-native';

import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';

import CircleButton from '../components/CircleButton';

export default function MemoCreateScreen(props) {
  const { navigation } = props;
  const [ bodyText, setBodyText ] = useState('')

  const handlePress = async() => {
    try {
      const currentUser = auth.currentUser
      console.log(currentUser)
      const docRef = await addDoc(
        collection(db, `users/${currentUser.uid}/memos`),
        {
        bodyText,
        updatedAt: new Date(),
        }
        )

      if (docRef) {
        console.log('Created!', docRef.id)
        // navigation.goBack();
        navigation.reset({
          index: 0,
          routes: [{name: 'MemoList'}]
        })
      }
    } catch (error) {
      console.error("Error!", error);
     }
   }
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput 
          value={bodyText}
          multiline
          style={styles.input} 
          onChangeText={(text)=>{setBodyText(text) }}
          autoFocus />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});
