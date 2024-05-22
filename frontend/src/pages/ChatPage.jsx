// import React, { useState, useRef, useEffect } from 'react';
// import '../App.css';

// function ChatPage() {
//   const [messages, setMessages] = useState([

//     { text: "Hi there! I'm the pharamcist how i can help you", sender: 'bot', timestamp: new Date() },
//     { text: 'Hello! Fathy?', sender: 'user', timestamp: new Date() },
//   ]);
//   const [inputText, setInputText] = useState(''); // State to hold input text
//   const chatBottomRef = useRef(null); // Ref to keep chat scrolled to bottom

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputText.trim() !== '') {
//       // Add user message to the messages array
//       setMessages([...messages, { text: inputText, sender: 'user', timestamp: new Date() }]);
//       setInputText(''); // Clear input field
//     }
//   };

//   // Scroll chat to bottom when new message is added
//   useEffect(() => {
//     if (chatBottomRef.current) {
//       chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         {/* Displaying messages */}
//         {messages.map((message, index) => (
//           <div key={index} className={`message ${message.sender}`}>
//             <div className="message-content">{message.text}</div>
//             <div className="message-timestamp">{message.timestamp.toLocaleTimeString()}</div>
//           </div>
//         ))}
//         {/* Empty div to keep chat scrolled to bottom */}
//         <div ref={chatBottomRef}></div>
//       </div>
//       <form className="chat-input-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }
const ChatPage = () => {
  return (
    <div>
      <h1>Chat Page</h1>
    </div>
  );
};

export default ChatPage;
