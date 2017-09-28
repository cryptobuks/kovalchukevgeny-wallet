import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import staticContent from './../../static-content/languages';

const ErrorPage = props => {
  const { lang } = props;
  return (
    <div className="not-found">
      <div className="text">
        <h1>{'404'}</h1>
        <h2>{staticContent[lang]['error-page'].h2}</h2>
        <Link to="/" className="link">{staticContent[lang]['error-page'].link}</Link>
      </div>
    </div>
  );
};

ErrorPage.defaultProps = {
  lang: 'eng'
};

ErrorPage.propTypes = {
  lang: PropTypes.string
};

export default connect(state => ({
  lang: state.lang
}))(ErrorPage);
