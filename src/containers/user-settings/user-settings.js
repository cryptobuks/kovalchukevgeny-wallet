import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Panel from './../../components/panel/panel.jsx';
import UserPallet from './../../components/user-pallet/user-pallet.jsx';
import Container from './../../components/container/container.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';

import staticContent from './../../static-content/languages';

const UserSettings = props => {
  const { lang } = props;

  return (
    <Container>
      <Row>
        <Col>
          <Panel
            specialClass="export dark"
            heading={staticContent[lang]['user-setting'].head}
            headingIcon="settings"
          >
            <UserPallet
              lang={lang}
            />
          </Panel>
        </Col>
      </Row>
    </Container>
  );
};

UserSettings.defaultProps = {
  lang: 'eng',
};

UserSettings.propTypes = {
  lang: PropTypes.string,
};

export default connect(state => ({
  lang: state.lang,
}))(UserSettings);