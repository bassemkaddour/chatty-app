import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

import messages from '../data/messages.json';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, 
      currentUser: messages[0].currentUser, 
      messages: messages[0].messages
    };
    this.addMessage = this.addMessage.bind(this);
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`); 
  }
  
  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
    
    this.socket.addEventListener('open', () => {
      console.log('connected sockets');
    });
  }

  addMessage(username, content) {
    const oldMessages = this.state.messages;
    const id = oldMessages[oldMessages.length - 1].id + 1;
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
