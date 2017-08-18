import React from 'react';

import Button from './../../components/button/button.jsx';
import Icon from './../../components/icon/icon.jsx';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-3 col-xs-6">
            <div className="logo">e-wallet</div>
          </div>
          <div className="col-lg-10 col-md-9 col-sm-9 col-xs-6">
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
