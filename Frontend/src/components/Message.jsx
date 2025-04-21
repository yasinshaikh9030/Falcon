import React, { useState } from 'react';
import './message.css';



const dummyMessages = [
  {
    id: 1,
    name: 'Alice',
    preview: 'Hi, how are you?',
    messages: ['Hi, how are you?', 'Are you available for a meeting?']
  },
  {
    id: 2,
    name: 'Bob',
    preview: 'Let’s discuss the idea...',
    messages: ['Let’s discuss the idea...', 'I’ll send the deck soon.']
  },
];

const Message = () => {
  const [search, setSearch] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');

  const handleSend = () => {
    if (typedMessage.trim() === '') return;

    const updated = { ...selectedChat };
    updated.messages.push(typedMessage);
    setSelectedChat(updated);
    setTypedMessage('');
  };

  const filteredMessages = dummyMessages.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="messaging-container">
      <h2 className="title">Messaging</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="chat-area">
        {/* Left Panel */}
        <div className="chat-list">
          {filteredMessages.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="chat-icon">👤</div>
              <div className="chat-info">
                <strong>{chat.name}</strong>
                <p>{chat.preview}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div className="chat-box">
          {selectedChat ? (
            <>
              <h3>{selectedChat.name}</h3>
              <div className="messages">
                {selectedChat.messages.map((msg, idx) => (
                  <div key={idx} className="message-line">
                    {msg}
                  </div>
                ))}
              </div>
              <div className="message-input">
                <textarea
                  rows="2"
                  placeholder="Write a message..."
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                />
                <button onClick={handleSend}>Send</button>
              </div>
            </>
          ) : (
            <div className="select-prompt">Select a conversation to view messages.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
