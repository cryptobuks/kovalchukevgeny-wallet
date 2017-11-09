import React from 'react';
import PropTypes from 'prop-types';

import Button from './../button/button.jsx';
import Icon from './../icon/icon.jsx';
import Container from './../container/container.jsx';
import Row from './../row/row.jsx';
import Col from './../col/col.jsx';

const addWordAnimation = string => {
  // functionality goes here
  if(typeof string !== 'string') { return };
  return string.split('').map((letter, i) => {
    if(letter !== '-') {
      return (
        <span key={i} className="anim-letter">{letter}</span>
      );
    } return letter;
  });
}

const Footer = props => {
  const { user } = props;
  const { theme } = user.settings;

  return (
    <footer className={`footer ${theme}`}>
      <Container fluid>
        <Row>
          <Col lg={2} md={3}>
            <div className="logo">{addWordAnimation('e-wallet')}</div>
          </Col>
          <Col lg={7} md={3}>
            <ul>
              <li>
                <Button
                  href="https://github.com/kovalchukevgeny/wallet"
                  icon="link"
                ><span>GitHub</span></Button>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h6 className="heart">
              <span>Created with love</span>
              <Icon icon={'favorite'} />
            </h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

Footer.defaultProps = {

};

Footer.propTypes = {
  user: PropTypes.object,
};

export default Footer;
