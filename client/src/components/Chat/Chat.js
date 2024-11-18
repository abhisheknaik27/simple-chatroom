import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';


import './Chat.css';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
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
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, window.location.search]);

  return (
    <div>
      chat
    </div>
  )
}

export default Chat
