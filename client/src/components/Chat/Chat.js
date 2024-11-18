import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import Infobar from '../Infobar/infobar';
import Input from '../Input/Input';
import './Chat.css';
import Messages from '../Messages/Messages';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:4000";

  useEffect(() => {
    const {name, room} = queryString.parse(window.location.search);

    socket = io(ENDPOINT);
    console.log(socket);

    setName(name);
    setRoom(room);
    socket.emit('join', { name, room }, () => {

    });

    return () => {
      socket.disconnect();
    }
  }, [ENDPOINT, window.location.search]);

  // to handle messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages])

  //function for sending msgs
  const sendMessage = (e) => {
    e.preventDefault();

    if(message){
      socket.emit('sendMessage', message, () => {
        setMessage('');
      })
    }
  }

  console.log(message, messages);
  return (
    <div className='outerContainer'>
      <div className='container'>

        <Infobar room={room} />
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        
      </div>
    </div>
  )
}

export default Chat
