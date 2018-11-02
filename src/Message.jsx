import React from 'react';


function Message({message}) {
  let messageDiv;
  switch(message.type) {
    case 'incomingMessage': 
      messageDiv = (
        <div className='message'>
          <span className='message-username' style={{color: message.color}}>{message.username}</span>
          <span className='message-content'>{message.content}</span>
        </div>
      );
      break;
    case 'incomingNotification': 
      messageDiv = (
        <div className='message system'>
          {message.content}
        </div>
      );
      break;
    default: 
      return null;
  }

  return (
    messageDiv
  );
}
export default Message;