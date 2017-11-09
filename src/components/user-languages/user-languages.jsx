import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Panel from './../../components/panel/panel.jsx';
import Button from './../../components/button/button.jsx';

import usa from './../../images/usa.svg'; // eslint-disable-line
import rus from './../../images/rus.svg'; // eslint-disable-line

import staticContent from './../../static-content/languages';

class UserLanguages extends Component {
  constructor(props) {
    super(props);

    this.changeLang = this.changeLang.bind(this);
  }

  changeLang(lang) {
    const { onChange, user } = this.props;
    if (lang !== user.settings.lang) {
      onChange(lang);
    }
  };
   
  render() {
    const { lang, theme, onChange } = this.props;

    return (
      <Panel
        specialClass={`languages ${theme}`}
        heading={staticContent[lang]['user-setting'].language}
      >
        <button
          className={lang === 'eng' ? 'active' : ''}
          onClick={() => this.changeLang('eng')}
          >{'eng'}
            <span className="flag-icon flag-icon-usa">
                <img src={usa} alt="english" />
            </span>
          </button>
        <button
          className={lang === 'rus' ? 'active' : ''}
          onClick={() => this.changeLang('rus')}
        >{'rus'}
          <span className="flag-icon flag-icon-rus">
            <img src={rus} alt="russian" />
          </span>
        </button>
      </Panel>
    );
  }
}
  
  UserLanguages.defaultProps = {
    lang: 'eng',
    onChange: () => {  },
    theme: 'dark',
  };
  
  UserLanguages.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.string,
    onChange: PropTypes.func,
  };
  
  export default UserLanguages;