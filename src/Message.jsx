import React, {Component} from 'react';


function Message({message}) {
  return (
    <div className="message">
      <span className="message-username">{message.username}</span>
      <span className="message-content">{message.content}</span>
    </div>
    // <div class="message system">
    //   Anonymous1 changed their name to nomnom.
    // </div>
  );
}
export default Message;