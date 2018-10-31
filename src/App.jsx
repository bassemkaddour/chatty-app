import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

import messages from '../data/messages.json';

import uuidv1 from 'uuid/v1';
// const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, 
      currentUser: {name: 'Bob'}, 
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`); 
  }
  
  componentDidMount() {
    this.socket.addEventListener('open', () => {
      console.log('connected sockets');
    });

    this.socket.onmessage = (message) => {
      console.log('Recieved message', message);
      const oldMessages = this.state.messages;
      const newMessage = JSON.parse(message.data);
      const newMessages = [...oldMessages, newMessage];
      this.setState({messages: newMessages});
    };
  }

  addMessage(username, content) {
    const oldMessages = this.state.messages;
    const id = uuidv1();
    const newMessage = {
      id, 
      username,
      content
    }
    const jMessage = JSON.stringify(newMessage);
    this.socket.send(jMessage);

    const newMessages = [...oldMessages, newMessage]; 
    this.setState({messages: newMessages})
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
