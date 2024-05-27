import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import '../../css/chat.css';

const socket = io('http://localhost:5000'); 

const ChatApp = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!username) {
      Swal.fire({
        title: 'Please enter your name',
        input: 'text',
        inputLabel: 'Username',
        inputPlaceholder: 'Enter your name',
        allowOutsideClick: false,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to enter a username';
          }
        },
        confirmButtonText: 'Enter Chat',
        showLoaderOnConfirm: true,
        preConfirm: (usernameInput) => {
          setUsername(usernameInput);
          localStorage.setItem('username', usernameInput);
          socket.emit('username', usernameInput);
        },
      });
    } else {
      socket.emit('username', username);
    }

    socket.on('userJoined', (username) => {
      addMessage({ Author: username, Content: `${username} has joined the chat room`, system: true });
    });

    socket.on('user left', (username) => {
      addMessage({ Author: username, Content: `${username} has left the chat room`, system: true });
    });

    socket.on('chat message', (msg) => {
      addMessage(msg);
    });

    return () => {
      socket.off('userJoined');
      socket.off('user left');
      socket.off('chat message');
    };
  }, [username]);

  const addMessage = (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
    scrollToBottom();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    if (!file && !message) {
      alert('Please enter a message');
      return;
    }

    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        socket.emit('chat message', {
          Author: username,
          Content: message,
          image: reader.result,
        });
        setMessage('');
        setFile(null);
      };
    } else {
      socket.emit('chat message', {
        Author: username,
        Content: message,
        image: null,
      });
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    const messageList = document.getElementById('messages');
    messageList.scrollTop = messageList.scrollHeight;
  };

  return (
    <div>
      <br />
      <h1 style={{ textAlign: 'center' }}>Chat Room</h1>
      <br />
      <br />
      <div id="chat">
        <ul id="messages">
          {messages.map((msg, index) => (
            <li key={index} className="chat-message">
              <span className="chat-username">{msg.Author}</span>: {msg.Content}
              {msg.image && <img src={msg.image} alt="chat-img" className="image" />}
            </li>
          ))}
        </ul>
        <form id="chatform" onSubmit={handleSubmit}>
          <input
            id="message"
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            id="fileinput"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
