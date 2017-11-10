import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import staticContent from './../../static-content/languages';

const ListGroup = props => {
  const { children, specialClass } = props;

  return (
    <ul className={classNames(`list-group ${specialClass}`)}>
      {React.Children.map(children, (child) => {
        return child;
      })}
    </ul>
  )
}

ListGroup.defaultProps = {
  specialClass: '',
};

ListGroup.propTypes = {
  specialClass: PropTypes.string,
};

export default ListGroup;
