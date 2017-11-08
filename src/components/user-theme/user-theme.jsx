import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Panel from './../../components/panel/panel.jsx';
import Button from './../../components/button/button.jsx';

import staticContent from './../../static-content/languages';

class UserTheme extends Component {
  constructor(props) {
    super(props);

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(theme) {
    const { changeTheme } = this.props;

    if (theme !== user.settings.theme) {
      changeTheme(theme);
    }
  };
   
  render() {
    const { lang, theme, onChange } = this.props;

    return (
      <Panel
        specialClass={`export ${theme}`}
        heading={staticContent[lang]['user-setting'].theme}
      >
        <Button
          icon={'brightness_2'}
          onClickFunction={() => onChange('dark')}
        />
        <Button
          icon={'wb_sunny'}
          onClickFunction={() => onChange('light')}
        />
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