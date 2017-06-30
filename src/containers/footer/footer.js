import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Button from './../../components/button/button.jsx';
import Icon from './../../components/icon/icon.jsx';

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
              <Button
                specialClass="mdl-navigation__link mdl-navigation__link--icon"
                href="https://github.com/kovalchukevgeny/wallet">
                <Icon type={'material'} icon={'link'} />
                <span>GitHub</span>
              </Button>
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
