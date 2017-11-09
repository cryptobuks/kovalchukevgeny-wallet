import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Icon from './../../components/icon/icon.jsx';
import Navbar from './../../components/navbar/navbar.jsx';

import staticContent from './../../static-content/languages';

const Navigation = props => {
  const { user, transactions } = props;
  const { lang, theme } = user.settings;

  return (
    <Navbar specialClass={theme} withLogo>
      <ul className="nav navigation">
        <li>
          <Link activeClassName="active" to="transactions">
            <Icon icon={'account_balance_wallet'} />
            <span className="navigation__item">
              {staticContent[lang].menu[0]}
            </span>
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="categories">
            <Icon icon={'assignment_turned_in'} />
            <span className="navigation__item">
              {staticContent[lang].menu[1]}
            </span>
          </Link>
        </li>
        {transactions.length > 0 &&
          <li>
            <Link activeClassName="active" to="statistics">
              <Icon icon={'timeline'} />
              <span className="navigation__item">
                {staticContent[lang].menu[2]}
              </span>
            </Link>
          </li>
        }
        {transactions.length > 0 &&
          <li>
            <Link activeClassName="active" to="reports">
              <Icon icon={'work'} />
              <span className="navigation__item">
                {staticContent[lang].menu[3]}
              </span>
            </Link>
          </li>
        }
        {transactions.length > 0 &&
          <li>
            <Link activeClassName="active" to="month-report">
              <Icon icon={'storage'} />
              <span className="navigation__item">
                {staticContent[lang].menu[4]}
              </span>
            </Link>
          </li>
        }
        <li>
          <Link activeClassName="active" to="backup">
            <Icon icon={'backup'} />
            <span className="navigation__item">
              {staticContent[lang].menu[5]}
            </span>
          </Link>
        </li>
      </ul>
    </Navbar>
  );
};

Navigation.defaultProps = {
  transactions: [],
};

Navigation.propTypes = {
  transactions: PropTypes.array,
};

export default connect(state => ({
  transactions: state.transactions,
  user: state.user,
}), { }, null, { pure: false })(Navigation);
