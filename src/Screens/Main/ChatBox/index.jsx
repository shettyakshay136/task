import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';

const WEBSOCKET_URL = 'wss://echo.websocket.org'; // Public WebSocket Server

const ChatBox = ({username, correctAnswer}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [score, setScore] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => console.log('Connected to WebSocket Server');

    ws.onmessage = event => {
      try {
        let receivedMessage;

        // Attempt to parse JSON, else handle it as plain text
        try {
          receivedMessage = JSON.parse(event.data);
        } catch (jsonError) {
          // If it's not JSON, consider it a server message
          receivedMessage = {
            id: Date.now().toString(),
            username: 'Server',
            message: event.data,
            timestamp: new Date().toLocaleTimeString(),
          };
        }

        // Ignore WebSocket connection acknowledgment messages
        if (receivedMessage.message.startsWith('Request served by')) {
          console.log(
            'Ignoring server connection message:',
            receivedMessage.message,
          );
          return;
        }

        setMessages(prevMessages => [...prevMessages, receivedMessage]);

        if (
          receivedMessage.message.toLowerCase() === correctAnswer.toLowerCase()
        ) {
          setScore(prevScore => prevScore + 10);
          Alert.alert('Correct!', 'You earned 10 points!', [{text: 'OK'}]);
        }

        flatListRef.current?.scrollToEnd({animated: true});
      } catch (error) {
        console.error(
          'WebSocket message error:',
          error,
          'Received:',
          event.data,
        );
      }
    };

    ws.onerror = error => console.error('WebSocket Error:', error);
    ws.onclose = () => console.log('WebSocket connection closed');

    setSocket(ws);
    return () => ws.close();
  }, [correctAnswer]);

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && socket) {
      const chatMessage = {
        id: Date.now().toString(), // Unique ID for each message
        username,
        message: trimmedMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.send(JSON.stringify(chatMessage));
      setMessages(prevMessages => [...prevMessages, chatMessage]);
      setMessage('');
    }
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: 'black',
          marginBottom: 10,
        }}>
        Your Score: {score}
      </Text>
      <FlatList
        ref={flatListRef}
        data={messages.slice(-10)} // Show only the last 10 messages
        renderItem={({item}) => (
          <Text style={{color: 'black', paddingVertical: 10}}>
            {item.username} ({item.timestamp}): {item.message}
          </Text>
        )}
        keyExtractor={item => item.id}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        style={{borderWidth: 1, padding: 10, marginBottom: 10, color: 'black'}}
        placeholderTextColor={'black'}
      />
      <TouchableOpacity
        style={{
          width: '100%',
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#2151A0',
        }}
        onPress={sendMessage}>
        <Text style={{color: 'white'}}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatBox;
