import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, Text, View, Button } from 'react-native';
import EventSource from 'react-native-sse';

const HomeBlock = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef(null); // Store EventSource instance

  useEffect(() => {

    // Initialize SSE connection
    eventSourceRef.current = new EventSource('http://10.1.17.193:3000/stream-data');

    setIsConnected(true); // Mark as connected

    eventSourceRef.current.addEventListener('open', () => {
      console.log('SSE connection opened');
      setError(null);
    });

    eventSourceRef.current.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received data:', data);
        setMessages((prev) => [...prev, data]);

      } catch (err) {
        console.error('Error parsing SSE data:', err);
        setError('Error parsing data');
      }
    });

    eventSourceRef.current.addEventListener('error', (event) => {
      console.error('SSE error:', event);
      setError('Connection error. Please check the server.');
      setIsConnected(false);
      eventSourceRef.current.close(); // Close on error
    });

    // Cleanup on component unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log('SSE connection closed on unmount');
        setIsConnected(false);
      }
    };
  }, []);

  const handleCloseConnection = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      console.log('SSE connection closed by user');
      setIsConnected(false);
      eventSourceRef.current = null; // Clear reference
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        {isConnected ? 'Listening for Stream...' : 'Connection Closed'}
      </Text>
      {error && <Text style={{ color: 'red', fontSize: 16, marginBottom: 20 }}>{error}</Text>}
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <View key={index} style={{ marginBottom: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
            <Text>Time: {new Date(msg.time).toLocaleTimeString()}</Text>
            <Text>Count: {msg.count}</Text>
          </View>
        ))
      ) : (
        <Text>No data received yet</Text>
      )}
      <View style={{ marginVertical: 10 }}>
        <Button
          title="Close Connection"
          onPress={handleCloseConnection}
          disabled={!isConnected} // Disable button when not connected
        />
      </View>
      <Button title="View Saved Data" onPress={() => navigation.navigate('Data')} />
    </ScrollView>
  );
};

export default HomeBlock;