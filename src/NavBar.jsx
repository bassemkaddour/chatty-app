import React from 'react';

function NavBar({userCount}) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="user-count">{userCount} users chatting</span>
    </nav>
  );
}

NavBar.propTypes = {
  userCount: React.PropTypes.string.isRequired
}
export default NavBar;