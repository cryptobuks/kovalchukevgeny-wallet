import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import staticContent from './../../static-content/languages';

const ErrorPage = props => {
  const { user } = props;
  const { theme, lang } = user.settings;

  return (
    <div className={`not-found ${theme}`}>
      <div className="text">
        <h1>404</h1>
        <h2>{staticContent[lang]['error-page'].h2}</h2>
        <Link to="/" className="btn btn-primary dark">{staticContent[lang]['error-page'].link}</Link>
      </div>
    </div>
  );
};

ErrorPage.defaultProps = {
  lang: 'eng',
};

ErrorPage.propTypes = {
  lang: PropTypes.string,
};

export default connect(state => ({
  user: state.user,
}))(ErrorPage);
