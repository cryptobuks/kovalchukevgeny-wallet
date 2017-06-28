import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <div className="mdl-logo">Title</div>
          <ul className="mdl-mini-footer__link-list">
            <li><a href="#">Help</a></li>
            <li><a href="#">Privacy & Terms</a></li>
          </ul>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {

};

export default Footer;
