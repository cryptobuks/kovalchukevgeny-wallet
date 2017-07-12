import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      type,
      specialClass,
      placeholder,
      value,
      handleChange } = this.props;

    return(
      <input
        type={type}
        className={classNames('form-control', specialClass)}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    );
  }
}

Input.defaultProps = {
  type: 'text',
  value: 'default value',
  placeholder: 'placeholder',
  handleChange: () => {}
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  specialClass: PropTypes.string,
  handleChange: PropTypes.func
};

export default Input;
