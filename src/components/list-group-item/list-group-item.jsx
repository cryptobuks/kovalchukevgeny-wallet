import React from 'react';
import PropTypes from 'prop-types';

import staticContent from './../../static-content/languages';

const ListGroupItem = props => {
  const { children } = props;

  return (
    <li {...props}>
      {React.Children.map(children, (child) => {
        return child;
      })}
    </li>
  )
}

export default ListGroupItem;
