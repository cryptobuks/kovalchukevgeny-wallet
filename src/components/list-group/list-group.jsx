import React from 'react';
import PropTypes from 'prop-types';

import staticContent from './../../static-content/languages';

const ListGroup = props => {
    const { children } = props;

    return (
        <ul className="list-group">
            {React.Children.map(children, (child) => {
                return child;
            })}
        </ul>
    )
}

ListGroup.defaultProps = {
    lang: 'eng',
};


ListGroup.propTypes = {
    lang: PropTypes.string,
};

export default ListGroup;
