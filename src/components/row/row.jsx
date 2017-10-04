import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Row = props => {

  const { specialClass, children } = props;

  return (
    <div className={classNames('row', specialClass)}>
      {React.Children.map(children, (child) => {
        return child;
      })}
    </div>
  );
}

Row.defaultProps = {
  specialClass: ''
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  specialClass: PropTypes.string
};

export default Row;
