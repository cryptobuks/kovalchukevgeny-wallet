import React from 'react';

import Button from './../../components/button/button.jsx';
import Icon from './../../components/icon/icon.jsx';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-3">
            <div className="logo">e-wallet</div>
          </div>
          <div className="col-lg-7 col-md-3">
            <ul>
              <li>
                <Button
                  href="https://github.com/kovalchukevgeny/wallet">
                  <Icon type={'material'} icon={'link'} />
                  <span>GitHub</span>
                </Button>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h6 className="heart">
              <span>Created with love</span>
              <i className="material-icons">favorite</i>
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
