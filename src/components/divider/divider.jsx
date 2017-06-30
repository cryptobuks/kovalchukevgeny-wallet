import React from 'react';
import PropTypes from 'prop-types';

const Divider = props => {
  const { color } = props;
  const divStyle = {border: `1px solid ${color}`};

  return (
    <div style={divStyle}></div>
  );
};

Divider.defaultProps = {
  color: '#000'
};

Divider.propTypes = {
  color: PropTypes.string
};

export default Divider;
