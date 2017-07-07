import React from 'react';
import { Link } from 'react-router';
import Icon from './../../components/icon/icon.jsx';
import Navbar from './../../components/navbar/navbar.jsx';

const Header = () => {
  return (
    <div className="header">
      <Navbar>
        <ul className="nav navbar-nav">
          <li>
            <Link activeClassName="active" to="home">
              <Icon type={'material'} icon={'home'} />
              <span className="navigation__item">Home</span>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="transactions">
              <Icon type={'material'} icon={'account_balance_wallet'} />
              <span className="navigation__item">Transactions</span>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="categories">
              <Icon type={'material'} icon={'assignment_turned_in'} />
              <span className="navigation__item">Categories</span>
            </Link>
          </li>
          <li>
            {/* TODO: uncomment when page will be ready */}
            {/* <Link activeClassName="active" to="results">
              <Icon type={'material'} icon={'timeline'} />
              <span className="navigation__item">Results</span>
            </Link> */}
          </li>
        </ul>
      </Navbar>
    </div>
  );
};

export default Header;
