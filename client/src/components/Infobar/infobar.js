import React from 'react';
import './Infobar.css';
import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

const Infobar = ({ room }) => {
  return (
    <div className='infoBar'>
    <div className='leftInnerContainer'>
        <img className='onlineIcon' src={onlineIcon} alt='online_image' />
        <h3>{ room }</h3>
    </div>
    <div className='rightInnerContainer'>
        <a href='/'><img src={closeIcon} alt='close_image'></img></a>
    </div>
    </div>
  )
}

export default Infobar
