import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <div className="mdl-logo">e-Wallet</div>
          <ul className="mdl-mini-footer__link-list">
            <li>
              <a className="mdl-navigation__link mdl-navigation__link--icon" href="https://github.com/kovalchukevgeny/wallet">
                <i className="material-icons">link</i>
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {

};

export default Footer;
