import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ChatEngine } from 'react-chat-engine';

export default function App1() {
  return (
    <View style={styles.container}>
      <ChatEngine
      height="100vh"
      projectID="df7eb8f5-6989-44ee-a373-a8bf717f111b"
      userName="Ethan"
      userSecret="1"
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
