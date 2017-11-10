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
        <Button
          specialClass="btn btn-primary"
          icon={'brightness_2'}
          onClickFunction={() => this.changeTheme('dark')}
        />
        <Button
          specialClass="btn btn-primary"
          icon={'wb_sunny'}
          onClickFunction={() => this.changeTheme('light')}
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