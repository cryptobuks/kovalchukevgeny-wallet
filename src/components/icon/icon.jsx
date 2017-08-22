import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MaterialIcon = props => {
  const { icon, type } = props;

  return (
    type === 'material' ?
    <i
      {...props}
      className="material-icons"
    >{icon}</i> :
    <i
      {...props}
      className={classNames('fa', `${icon}`)}
      aria-hidden="true"
    ></i>
  );
};

MaterialIcon.defaultProps = {
  type: 'material'
};

MaterialIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default MaterialIcon;
