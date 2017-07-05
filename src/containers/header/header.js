import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Icon from './../../components/icon/icon.jsx';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <span className="navbar-brand">e-Wallet</span>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav">
              <li>
                <Link activeClassName="active" to="/home">
                  <Icon type={'material'} icon={'home'} />
                  <span className="navigation__item">Home</span>
                </Link>
              </li>
              <li>
                <Link activeClassName="active" to="/transactions">
                  <Icon type={'material'} icon={'account_balance_wallet'} />
                  <span className="navigation__item">Transactions</span>
                </Link>
              </li>
              <li>
                <Link activeClassName="active" to="/categories">
                  <Icon type={'material'} icon={'assignment_turned_in'} />
                  <span className="navigation__item">Categories</span>
                </Link>
              </li>
              <li>
                <Link activeClassName="active" to="/results">
                  <Icon type={'material'} icon={'timeline'} />
                  <span className="navigation__item">Results</span>
                </Link>
              </li>
            </ul>
            <form className="navbar-form navbar-right" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}



Header.propTypes = {

};

export default Header;
