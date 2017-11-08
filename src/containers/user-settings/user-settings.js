import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Panel from './../../components/panel/panel.jsx';
import UserPallet from './../../components/user-pallet/user-pallet.jsx';
import UserTheme from './../../components/user-theme/user-theme.jsx';
import Container from './../../components/container/container.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';

import { changePallet, changeTheme } from './../../actions/actionCreators';

import staticContent from './../../static-content/languages';

const UserSettings = props => {
  const { lang, changePallet, changeTheme, user } = props;

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
              theme={user.settings.theme}
              onChange={changeTheme}
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
};

UserSettings.propTypes = {
  lang: PropTypes.string,
  changePallet: PropTypes.func,
  changeTheme: PropTypes.func,
  user: PropTypes.object,
};

export default connect(state => ({
  lang: state.lang,
  user: state.user,
}), { changePallet, changeTheme })(UserSettings);
