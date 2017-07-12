import React from 'react';
import Button from './../../components/button/button.jsx';
import Icon from './../../components/icon/icon.jsx';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <div className="logo">e-wallet</div>
          </div>
          <div className="col-lg-10">
            <ul>
              <li>
                <Button
                  specialClass="mdl-navigation__link mdl-navigation__link--icon"
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
