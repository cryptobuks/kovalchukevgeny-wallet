import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = props => {
  const { type, specialClass, placeholder, value, handleChange } = props;
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

Input.defaultProps = {
  type: 'text',
  value: 'default value',
  placeholder: 'placeholder',
  handleChange: () => {}
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  specialClass: PropTypes.string,
  handleChange: PropTypes.func
};

export default Input;
