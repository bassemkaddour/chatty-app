import React from 'react';
import Message from './Message.jsx';

function MessageList({messages}) {
  const messageList = messages.map(message => (
    <Message message={message} key={message.id} />
  ));
  return (
    <main className="messages">
      {messageList}
    </main>
  );
}

MessageList.propTypes = {
  messages: React.PropTypes.string.isRequired
}

export default MessageList;