import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import Icon from './../../components/icon/icon.jsx';
import Navbar from './../../components/navbar/navbar.jsx';
import Button from './../../components/button/button.jsx';
import { changeLang } from './../../actions/actionCreators';

import staticContent from './../../static-content/languages.json';

const Header = props => {
  const { lang, changeLang } = props
  return (
    <div className="header">
      <Navbar>
        <ul className="nav navbar-nav">
          <li>
            <Link activeClassName="active" to="home">
              <Icon type={'material'} icon={'home'} />
              <span className="navigation__item">
                {staticContent[lang]['menu'][0]}
              </span>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="transactions">
              <Icon type={'material'} icon={'account_balance_wallet'} />
              <span className="navigation__item">
                {staticContent[lang]['menu'][1]}
              </span>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="categories">
              <Icon type={'material'} icon={'assignment_turned_in'} />
              <span className="navigation__item">
                {staticContent[lang]['menu'][2]}
              </span>
            </Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right languages">
          <li>
            <span
              className={lang === 'eng' ? 'active' : ''}
              onClick={() => changeLang('eng')}
            >eng</span>
          </li>
          <li>/</li>
          <li>
            <span
              className={lang === 'rus' ? 'active' : ''}
              onClick={() => changeLang('rus')}
            >rus</span>
          </li>
        </ul>
      </Navbar>
    </div>
  );
};

export default connect(state => ({
  lang: state.lang
}), { changeLang })(Header);
