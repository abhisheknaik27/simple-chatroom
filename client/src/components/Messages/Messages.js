import React from 'react';
import './Messages.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom>
        {messages.map((msg, i) => <div key={i}><Message message={msg} name={name} /></div>)}
    </ScrollToBottom>
  )
}

export default Messages
