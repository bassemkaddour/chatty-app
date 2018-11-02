import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser.name, 
      content: ''
    };
    this.updateContent = this.updateContent.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(e) {
    let username = e.target.value;
    username = username || 'Anonymous';
    this.setState({username});
    if (e.key === 'Enter') {
      this.props.updateCurrentUser(this.state.username);
    }
  }

  updateContent(e) {
    const content = e.target.value;
    this.setState({content});
    
    if (e.key === 'Enter') {
      this.props.addMessage(this.state.username, this.state.content);
      e.target.value = '';
    }
  }

  render() {
    return (
      <footer className="chatbar">
          <input onKeyUp={this.updateUser} className="chatbar-username" name="chatbar-username" placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser.name} />
          <input onKeyUp={this.updateContent} className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

ChatBar.propTypes = {
  currentUser: React.PropTypes.string.isRequired,
  updateCurrentUser: React.PropTypes.string.isRequired,
  addMessage: React.PropTypes.string.isRequired
}

export default ChatBar;
