import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLocalStorage } from '../helpers/handleLocalStorage';
import { getUserIcon } from '../redux/actions';

class Header extends Component {
  render() {
    const { userEmail, userName, dispatch } = this.props;
    const userRash = md5(userEmail).toString();
    const userIcon = `https://www.gravatar.com/avatar/${userRash}`;
    const { player } = getLocalStorage('state');
    dispatch(getUserIcon(userIcon));
    return (
      <header>
        <img
          src={ userIcon }
          alt="User avatar"
          data-testid="header-profile-picture"
          id="user-icon"
        />
        <h1 data-testid="header-player-name">{ userName }</h1>
        <h2 data-testid="header-score">{player.score}</h2>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return ({ userEmail: state.playerInfo.email, userName: state.playerInfo.name });
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
