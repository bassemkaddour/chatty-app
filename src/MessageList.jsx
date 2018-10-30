import React, {Component} from 'react';
import Message from './Message.jsx';

 function MessageList({messages}) {
  const messageList = messages.map(message => (
    <Message message={message} key={message.id} />
  ));
  return (
    <main className="messages">
      {messageList}
    </main>
    // <div className="message system">
    //   Anonymous1 changed their name to nomnom.
    // </div>
  );
}
export default MessageList;