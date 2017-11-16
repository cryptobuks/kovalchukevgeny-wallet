import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Panel from './../../components/panel/panel.jsx';
import Button from './../../components/button/button.jsx';
import ButtonToolbar from './../../components/button-toolbar/button-toolbar.jsx';

import staticContent from './../../static-content/languages';

class UserTheme extends Component {
  constructor(props) {
    super(props);

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(theme) {
    const { onChange, user } = this.props;

    if (theme !== user.settings.theme) {
      onChange(theme);
    }
  };
   
  render() {
    const { lang, theme } = this.props;

    return (
      <Panel
        specialClass={`theme ${theme}`}
        heading={staticContent[lang]['user-setting'].theme}
      >
        <ButtonToolbar>
          <Button
            specialClass="btn dark"
            icon={'brightness_2'}
            onClickFunction={() => this.changeTheme('dark')}
          >{staticContent[lang]['user-setting'].themeDark}</Button>
          <Button
            specialClass="btn light"
            icon={'wb_sunny'}
            onClickFunction={() => this.changeTheme('light')}
          >{staticContent[lang]['user-setting'].themeLight}</Button>
        </ButtonToolbar>
      </Panel>
    );
  }
}
  
  UserTheme.defaultProps = {
    lang: 'eng',
    onChange: () => {  },
    theme: 'dark',
  };
  
  UserTheme.propTypes = {
    lang: PropTypes.string,
    theme: PropTypes.string,
    onChange: PropTypes.func,
  };
  
  export default UserTheme;