import React from 'react';
import PropTypes from 'prop-types';

import staticContent from './../../static-content/languages';

const ListGroupItem = props => {
    const { children } = props;

    return (
        <li className="list-group-item">
            {children}
        </li>
    )
}

ListGroupItem.defaultProps = {
  lang: 'eng',
};


ListGroupItem.propTypes = {
  lang: PropTypes.string,
};

export default ListGroupItem;
