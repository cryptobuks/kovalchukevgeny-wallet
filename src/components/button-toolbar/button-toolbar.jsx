import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonToolbar = props => {

  const { specialClass, children } = props;

  return (
    <div className={classNames('toolbar', specialClass)}>
      {React.Children.map(children, (child) => {
        return child;
      })}
    </div>
  );
}

ButtonToolbar.defaultProps = {
  specialClass: ''
};

ButtonToolbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  specialClass: PropTypes.string
};

export default ButtonToolbar;
