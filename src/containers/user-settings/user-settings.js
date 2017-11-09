import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Panel from './../../components/panel/panel.jsx';
import UserPallet from './../../components/user-pallet/user-pallet.jsx';
import UserTheme from './../../components/user-theme/user-theme.jsx';
import UserLanguages from './../../components/user-languages/user-languages.jsx';
import Container from './../../components/container/container.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';

import { changePallet, changeTheme, changeLang } from './../../actions/actionCreators';

import staticContent from './../../static-content/languages';

import usa from './../../images/usa.svg'; // eslint-disable-line
import rus from './../../images/rus.svg'; // eslint-disable-line

const UserSettings = props => {
  const { lang, changePallet, changeTheme, changeLang, user } = props;

  return (
    <Container>
      <Row>
        <Col>
          <Panel
            specialClass={`export ${user.settings.theme}`}
            heading={staticContent[lang]['user-setting'].head}
            headingIcon="settings"
          >
            <UserPallet
              lang={lang}
              theme={user.settings.theme}
              onChange={changePallet}
            />
            <UserTheme
              lang={lang}
              user={user}
              theme={user.settings.theme}
              onChange={changeTheme}
            />
            <UserLanguages
              lang={lang}
              user={user}
              theme={user.settings.theme}
              onChange={changeLang}
            />
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

UserSettings.defaultProps = {
  lang: 'eng',
  changePallet: () => { },
  changeTheme: () => { },
  changeLang: () => { },
};

UserSettings.propTypes = {
  lang: PropTypes.string,
  changePallet: PropTypes.func,
  changeTheme: PropTypes.func,
  changeLang: PropTypes.func,
  user: PropTypes.object,
};

export default connect(state => ({
  lang: state.lang,
  user: state.user,
}), { changePallet, changeTheme, changeLang })(UserSettings);
