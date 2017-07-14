import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      onClickFunction,
      specialClass,
      children,
      href } = this.props;

    return(
      href ?
      <a
        onClick={(e) => onClickFunction(e)}
        href={href}
        type="link"
        className={classNames(specialClass)}
      >
        {React.Children.map(children, (child) => {
          return child;
        })}
      </a> :
      <button
        onClick={(e) => onClickFunction(e)}
        type="button"
        className={classNames(specialClass)}
      >
        {React.Children.map(children, (child) => {
          return child;
        })}
      </button>
    );
  }
}

Button.defaultProps = {
  children: 'button',
  onClickFunction: () => {}
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  href: PropTypes.string,
  onClickFunction: PropTypes.func.isRequired,
  specialClass: PropTypes.string
};

export default Button;
