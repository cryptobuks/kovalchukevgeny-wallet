import React from 'react';

import Button from './../button/button.jsx';
import Icon from './../icon/icon.jsx';
import Container from './../container/container.jsx';
import Row from './../row/row.jsx';
import Col from './../col/col.jsx';

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col lg={2} md={3}>
            <div className="logo">e-wallet</div>
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

export default Footer;
