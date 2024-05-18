// App.js
import React, { useState } from 'react';

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function App() {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  const colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];

  const connect = (event) => {
    if (username.trim()) {
      // Connect to WebSocket server
      const socket = new SockJS('http://localhost:8085/ws');
      const client = Stomp.over(socket);
      client.connect({}, onConnected, onError);
      setStompClient(client);
    }
    event.preventDefault();
  };

  const onConnected = () => {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, type: 'JOIN' }));
  };

  const onError = (error) => {
    console.error('Could not connect to WebSocket server:', error);
  };

  const sendMessage = (event) => {
    const messageInput = document.querySelector('#message');
    const messageContent = messageInput.value.trim();
    if (messageContent && stompClient) {
      const chatMessage = {
        sender: username,
        content: messageInput.value,
        type: 'CHAT'
      };
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      messageInput.value = '';
    }
    event.preventDefault();
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const getAvatarColor = (messageSender) => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  return (
    <div className="App">
      <div id="username-page">
        <div className="username-page-container">
          <h1 className="title">Type your username to enter the Chatroom</h1>
          <form id="usernameForm" name="usernameForm" onSubmit={connect}>
            <div className="form-group">
              <input type="text" id="name" placeholder="Username" autoComplete="off" className="form-control" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <button type="submit" className="accent username-submit">Start Chatting</button>
            </div>
          </form>
        </div>
      </div>

      <div id="chat-page" className="hidden">
        <div className="chat-container">
          <div className="chat-header">
            <h2>Chat Room</h2>
          </div>
          <div className="connecting">
            Connecting...
          </div>
          <ul id="messageArea">
            {messages.map((message, index) => (
              <li key={index}>
                {/* Render messages here */}
              </li>
            ))}
          </ul>
          <form id="messageForm" name="messageForm" onSubmit={sendMessage}>
            <div className="form-group">
              <div className="input-group clearfix">
                <input type="text" id="message" placeholder="Type a message..." autoComplete="off" className="form-control" />
                <button type="submit" className="primary">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
