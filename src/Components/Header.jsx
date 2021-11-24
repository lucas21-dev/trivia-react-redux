import React from 'react';
import md5 from 'crypto-js/md5';
import store from '../redux/store/index';

class Header extends React.Component {
  render() {
    const { login } = store.getState();
    const userRash = md5(login.email).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${userRash}` }
          alt="User avatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{ login.name }</h1>
        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}

export default Header;
