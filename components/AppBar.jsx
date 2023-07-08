import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AppBar() {
  return (
    <View style={styles.appber}>
      <View style={styles.appberinner}>
        <Text style={styles.appberTitle}>Memo App</Text>
        <Text style={styles.appberRight}>ログアウト</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appber: {
    width: '100%',
    height: 104,
    backgroundColor: '#467FD3',
    justifyContent: 'flex-end',
  },

  appberinner: {
    alignItems: 'center',
  },

  appberRight: {
    position: 'absolute',
    right: 19,
    bottom: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },

  appberTitle: {
    marginBottom: 8,
    fontSize: 22,
    lineHeight: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
