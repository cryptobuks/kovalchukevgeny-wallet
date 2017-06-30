import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Divider from './../../components/divider/divider.jsx';
import Icon from './../../components/icon/icon.jsx';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="demo-layout-transparent mdl-layout mdl-js-layout">
        <header className="mdl-layout__header mdl-shadow--2dp">
          <div className="mdl-layout__header-row">
            {/* Title */}
            <span className="mdl-layout-title">e-Wallet</span>
            {/* Add spacer, to align navigation to the right */}
            <div className="mdl-layout-spacer"></div>
            {/* search */}
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                  mdl-textfield--floating-label mdl-textfield--align-right">
              <label
                className="mdl-button mdl-js-button mdl-button--icon"
                htmlFor="fixed-header-drawer-exp"
              ><Icon type={'material'} icon={'search'} />
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  name="sample"
                  id="fixed-header-drawer-exp"
                />
              </div>
            </div>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">e-Wallet</span>
          {/* Navigation */}
          <nav className="mdl-navigation">
            <Link
              className="mdl-navigation__link mdl-navigation__link--icon"
              to="/"
            >
              <Icon type={'material'} icon={'home'} />
              <span className="navigation__item">Home</span>
            </Link>
            <Link
              className="mdl-navigation__link mdl-navigation__link--icon"
              to="/categories"
            >
              <Icon type={'material'} icon={'assignment_turned_in'} />
              <span className="navigation__item">Categories</span>
            </Link>
            <Link
              className="mdl-navigation__link mdl-navigation__link--icon"
              to="/transactions"
            >
              <Icon type={'material'} icon={'account_balance_wallet'} />
              <span className="navigation__item">Transactions</span>
            </Link>
            <Link
              className="mdl-navigation__link mdl-navigation__link--icon"
              to="/results"
            >
              <Icon type={'material'} icon={'timeline'} />
              <span className="navigation__item">Results</span>
            </Link>
            <Divider color={'rgba(0, 0, 0, 0.12)'} />
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
