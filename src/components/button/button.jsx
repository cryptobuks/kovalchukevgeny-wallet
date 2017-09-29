import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from './../icon/icon.jsx';

const Button = props => {

  let { onClickFunction, specialClass, children, href, icon } = props;

  return (
    href ?
    <a
      onClick={(e) => onClickFunction(e)}
      href={href}
      type="link"
      className={classNames(specialClass)}
    >
      {icon &&
        <Icon icon={icon} />
      }
      {React.Children.map(children, (child) => {
        return child;
      })}
    </a> :
    <button
      onClick={(e) => onClickFunction(e)}
      type="button"
      className={classNames(specialClass)}
    >
      {icon &&
        <Icon icon={icon} />
      }
      {React.Children.map(children, (child) => {
        return child;
      })}
    </button>
  );
}

Button.defaultProps = {
  children: '',
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
  specialClass: PropTypes.string,
  icon: PropTypes.string
};

export default Button;
