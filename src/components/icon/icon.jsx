import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const MaterialIcon = props => {
  const { icon, type, onClickFunction } = props;

  return (
    type === 'material' ?
    <i
      onClick={() => onClickFunction()}
      className="material-icons"
    >{icon}</i> :
    <i
      onClick={() => onClickFunction()}
      className={classNames('fa', `${icon}`)}
      aria-hidden="true"
    ></i>
  );
};

MaterialIcon.defaultProps = {
  type: 'material',
  onClickFunction: () => {}
};

MaterialIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClickFunction: PropTypes.func,
  type: PropTypes.string
};

export default MaterialIcon;
