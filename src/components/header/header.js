import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hello">Hello World!</div>
    );
  }
}

Header.propTypes = {

};

export default Header;
