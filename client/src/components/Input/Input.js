import React from 'react'
import './Input.css';

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className='form'>
        <input 
          className='input'
          type='text'
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' ? sendMessage(e) : null} 
        />
        <button className='sendButton' onClick={e => sendMessage(e)}>SEND</button>
    </form>
  )
}

export default Input
