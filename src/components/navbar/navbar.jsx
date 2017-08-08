import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classNames from 'classnames';
import Icon from './../icon/icon.jsx';
import Button from './../button/button.jsx';

class Navbar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false
    };

    this.showNav = this.showNav.bind(this);
  }

  showNav() {
    this.setState({isShow: !this.state.isShow});
  }

  render() {
    const { isShow } = this.state;
    let { children, withLogo, specialClass } = this.props;

    return (
      <nav className={classNames('navbar', `${specialClass}`)}>
        <div className="container-fluid">
          <div className="navbar-header">
            <Button
              specialClass="navbar-toggle"
              onClickFunction={this.showNav}
            ><span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </Button>
            {withLogo && <span className="navbar-brand">Logo</span>}
          </div>
          <div className={classNames('navbar-collapse', {collapse: !isShow})}>
            {React.Children.map(children, (child) => {
              return child;
            })}
          </div>
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
  specialClass: PropTypes.string
};

export default Navbar;
