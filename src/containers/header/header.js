import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';

import Icon from './../../components/icon/icon.jsx';
import Navbar from './../../components/navbar/navbar.jsx';

import { changeLang } from './../../actions/actionCreators';

import usa from './../../images/usa.svg'; // eslint-disable-line
import rus from './../../images/rus.svg'; // eslint-disable-line

import staticContent from './../../static-content/languages';

const Header = props => {
  const { lang, changeLang, transactions } = props;

  return (
    <div className="header">
      <Navbar>
        <ul className="nav navbar-nav navbar-left">
          <li>
            <Link activeClassName="active" to="transactions">
              <Icon icon={'account_balance_wallet'} />
              <span className="navigation__item">
                {staticContent[lang]['menu'][0]}
              </span>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="categories">
              <Icon icon={'assignment_turned_in'} />
              <span className="navigation__item">
                {staticContent[lang]['menu'][1]}
              </span>
            </Link>
          </li>
          {transactions.length > 0 &&
          <li>
            <Link activeClassName="active" to="statistics">
              <Icon icon={'timeline'} />
              <span className="navigation__item">
                {staticContent[lang]['menu'][2]}
              </span>
            </Link>
          </li>
          }
          {transactions.length > 0 &&
          <li>
            <Link activeClassName="active" to="reports">
              <Icon icon={'work'} />
              <span className="navigation__item">
                {staticContent[lang]['menu'][3]}
              </span>
            </Link>
          </li>
          }
          {transactions.length > 0 &&
          <li>
            <Link activeClassName="active" to="month-report">
              <Icon icon={'storage'} />
              <span className="navigation__item">
                {staticContent[lang]['menu'][4]}
              </span>
            </Link>
          </li>
          }
          <li>
            <Link activeClassName="active" to="backup">
              <Icon icon={'backup'} />
              <span className="navigation__item">
                {staticContent[lang]['menu'][5]}
              </span>
            </Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right languages">
          <li>
            <span
              className={lang === 'eng' ? 'active' : ''}
              onClick={() => changeLang('eng')}
            >eng
            <span className="flag-icon flag-icon-usa">
              <img src={usa} alt="english" />
            </span>
            </span>
          </li>
          <li>/</li>
          <li>
            <span
              className={lang === 'rus' ? 'active' : ''}
              onClick={() => changeLang('rus')}
            >rus
            <span className="flag-icon flag-icon-rus">
              <img src={rus} alt="russian" />
            </span>
            </span>
          </li>
        </ul>
      </Navbar>
    </div>
  );
};

Header.defaultProps = {
  lang: 'eng',
  transactions: [],
  changeLang: () => {}
};

Header.propTypes = {
  lang: PropTypes.string,
  transactions: PropTypes.array,
  changeLang: PropTypes.func
};

export default connect(state => ({
  lang: state.lang,
  transactions: state.transactions
}), { changeLang }, null, { pure: false })(Header);
