import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import uuidv1 from 'uuid/v1';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, 
      currentUser: {name: 'Anonymous'}, 
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`); 
  }
  
  componentDidMount() {
    this.socket.addEventListener('open', () => {
      console.log('connected sockets');
    });

    this.socket.onmessage = this.handleMessage;
  }
  
  updateCurrentUser(username) {
    if (this.state.currentUser.name !== username) {
      const id = uuidv1();
      const content =  `${this.state.currentUser.name} has changed their name to ${username}`
      const notificationMessage = {
        id,
        type: 'postNotification',
        content
      };
      const jNotificationMessage = JSON.stringify(notificationMessage);
      this.socket.send(jNotificationMessage);
      this.setState({currentUser: {name: username}});
    }
  }

  handleMessage(message) {
    const oldMessages = this.state.messages;
    const newMessage = JSON.parse(message.data);
    const newMessages = [...oldMessages, newMessage];
    this.setState({messages: newMessages});
  }

  addMessage(username, content) {
    this.updateCurrentUser(username);
    const id = uuidv1();
    const newMessage = {
      id, 
      type: 'postMessage',
      username,
      content
    }
    const jMessage = JSON.stringify(newMessage);
    this.socket.send(jMessage);
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} addMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
