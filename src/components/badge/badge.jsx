import React from 'react';
import PropTypes from 'prop-types';

import staticContent from './../../static-content/languages';

const Badge = props => {
    const { children } = props;

    return (
        <span className="badge">
            {children}
        </span>
    )
}

Badge.defaultProps = {
    lang: 'eng',
};


Badge.propTypes = {
    lang: PropTypes.string,
};

export default Badge;
