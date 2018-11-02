import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import uuidv1 from 'uuid/v1';
import 'normalize.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, 
      currentUser: {name: 'Anonymous'}, 
      messages: [],
      userCount: 0
    };
    this.addMessage = this.addMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`); 
  }
  
  componentDidMount() {
    this.socket.addEventListener('open', () => {
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
    const parsedMessage = JSON.parse(message.data);
    const type = parsedMessage.type;
      switch (type) {
        case 'user-count': {
          this.setState({userCount: parsedMessage.count})
          break;
        }
        default: {
          const oldMessages = this.state.messages;
          const newMessages = [...oldMessages, parsedMessage];
          this.setState({messages: newMessages});
        }
      }
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
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} addMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
