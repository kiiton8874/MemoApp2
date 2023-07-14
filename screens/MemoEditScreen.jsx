import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, TextInput, KeyboardAvoidingView, Alert,
} from 'react-native';
import { shape, string } from 'prop-types';

import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

import CircleButton from '../components/CircleButton';

import { auth, db } from '../utils/firebase'
import { translateErrors } from '../utils';

export default function MemoEditScreen(props) {
  const { navigation, route } = props;
  const { id, bodyText } = route.params;
  const [body, setBody] = useState(bodyText);
  
  function handlePress() {

    (async() => {
      const currentUser = auth.currentUser
      let unsub = () => {}
      if (currentUser) {
        try {

          unsub = await setDoc(doc(db, 'users', currentUser.uid, 'memos', id ),{
            bodyText: body,
            updatedAt: new Date(),
          }, {marge: true})

          navigation.goBack();

        } catch (error) {
          const errorMsg = translateErrors(error.code);
          Alert.alert(errorMsg.title, errorMsg.description);
        }

      }
      return unsub
    })()
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput 
          value={body}
          multiline
          style={styles.input}
          onChangeText={(text) => {setBody(text)}}
        />
      </View>
      <CircleButton
        name="check"
        onPress={ handlePress }
      />
    </KeyboardAvoidingView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
};

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
