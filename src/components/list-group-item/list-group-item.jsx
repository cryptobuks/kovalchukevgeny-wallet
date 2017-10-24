import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import staticContent from './../../static-content/languages';

const ListGroupItem = props => {
  const { children, specialClass } = props;

  return (
    <li className={classNames('list-group-item', specialClass)}>
      {React.Children.map(children, (child) => {
        return child;
      })}
    </li>
  )
}

ListGroupItem.defaultProps = {
  lang: 'eng',
};


ListGroupItem.propTypes = {
  lang: PropTypes.string,
  specialClass: PropTypes.string,
};

export default ListGroupItem;
