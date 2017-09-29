import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Container = props => {

  const { specialClass, children, fluid } = props;

  return (
    <div className={classNames(
      {'container-fluid' : fluid},
      {'container' : !fluid},
      specialClass)}
    >
      {React.Children.map(children, (child) => {
        return child;
      })}
    </div>
  );
}

Container.defaultProps = {
  specialClass: '',
  fluid: false
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  specialClass: PropTypes.string,
  fluid: PropTypes.bool
};

export default Container;
