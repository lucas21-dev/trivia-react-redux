import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail, userName } = this.props;
    const userRash = md5(userEmail).toString();
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${userRash}` }
          alt="User avatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{ userName }</h1>
        <h2 data-testid="header-score">0</h2>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return ({ userEmail: state.login.email, userName: state.login.name });
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
