import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      onClickFunction,
      specialClass,
      children } = this.props;

    const classString = specialClass ? specialClass : '';

    return(
      <button
        onClick={(e) => onClickFunction(e)}
        type="button"
        className={`${classString}`}
      >
        {React.Children.map(children, (child) => {
          return child;
        })}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]),
  onClickFunction: PropTypes.func,
  specialClass: PropTypes.string
};

export default Button;
