import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Icon from './../../components/icon/icon.jsx';
import Navbar from './../../components/navbar/navbar.jsx';

import staticContent from './../../static-content/languages';

const Header = props => {
  const { user, transactions } = props;
  const { theme, lang } = user.settings;

  return (
    <div className={`header ${theme}`}>     
      <ul className="header-nav">
        <li>
          <Link activeClassName="active" to="settings">
            <Icon icon={'settings'} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

Header.defaultProps = {

};

Header.propTypes = {
  user: PropTypes.object,
};

export default connect(state => ({
  user: state.user,
}), { }, null, { pure: false })(Header);
