import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Container = props => {

  const { specialClass, children } = props;
  const propValue = props;

  let colClasses = [];

  for (let prop in props) {
    if(prop === 'lg' || prop === 'md' || prop === 'sm' || prop === 'xs') {
      colClasses.push(`col-${prop}-${props[prop]}`)
    }
  }

  return (
    <div className={classNames(specialClass, ...colClasses)}
    >
      {React.Children.map(children, (child) => {
        return child;
      })}
    </div>
  );
}

Container.defaultProps = {
  lg: 12,
  md: 12,
  sm: 12,
  xs: 12
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  specialClass: PropTypes.string,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number
};

export default Container;
