import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="demo-layout-transparent mdl-layout mdl-js-layout">
        <header className="mdl-layout__header mdl-layout__header--transparent">
          <div className="mdl-layout__header-row">
            {/* Title */}
            <span className="mdl-layout-title">e-Wallet</span>
            {/* Add spacer, to align navigation to the right */}
            <div className="mdl-layout-spacer"></div>

          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">e-Wallet</span>
          {/* Navigation */}
          <nav className="mdl-navigation">
            <Link
              className="mdl-navigation__link"
              to="/">
              <span className="mdl-list__item">
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">home</i>
                  Home
                </span>
              </span>
            </Link>
            <Link
              className="mdl-navigation__link"
              to="/">Link</Link>
            <Link
              className="mdl-navigation__link"
              to="/">Link</Link>
            <Link
              className="mdl-navigation__link"
              to="/">Link</Link>
          </nav>
        </div>
        <main className="mdl-layout__content">
        </main>
      </div>
    );
  }
}

Header.propTypes = {

};

export default Header;
