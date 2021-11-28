import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userName, gravatarEmail, userScore } = this.props;

    return (
      <header>
        <img
          src={ gravatarEmail }
          alt="User avatar"
          data-testid="header-profile-picture"
          id="user-icon"
        />
        <h1 data-testid="header-player-name">{userName}</h1>
        <h2 data-testid="header-score">{userScore}</h2>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    userName: state.playerInfo.name,
    gravatarEmail: state.playerInfo.gravatarEmail,
    userScore: state.playerInfo.score,
  };
}

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
