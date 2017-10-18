import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames';

import Icon from './../icon/icon.jsx';
import Button from './../button/button.jsx';

class Navbar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let { children, withLogo, specialClass } = this.props;

    return (
      <nav className={classNames('navbar', `${specialClass}`)}>
        <div className="navbar-header">
          {withLogo && <span className="navbar-brand">Logo</span>}
        </div>
        <div className="navbar-menu">
          {React.Children.map(children, (child) => {
            return child;
          })}
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  children: 'navigation',
  specialClass: '',
  withLogo: false
};

Navbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  withLogo: PropTypes.bool,
  specialClass: PropTypes.string,
};

export default Navbar;
