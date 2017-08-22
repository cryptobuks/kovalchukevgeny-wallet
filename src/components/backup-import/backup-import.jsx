import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import XHRUploader from 'react-xhr-uploader';

import Helpers from './../../helpers/Helpers';
import Panel from './../panel/panel.jsx';
import Button from './../button/button.jsx';
import Icon from './../icon/icon.jsx';

import staticContent from './../../static-content/languages';

class Import extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();
  }

  render() {
    const { transactions, lang } = this.props;

    const myStyles = {dropTargetStyle: {border: 'none', padding: 'none'}};

    return (
      <div>
        <Panel
          specialClass="panel-success"
          heading={staticContent[lang]['backup-import'].head}
        >
          <XHRUploader
            url='http://localhost:3000/api/uploadfile'
            styles={myStyles}
          />
        </Panel>
      </div>
    );
  }
}

Import.defaultProps = {
  transactions: []
};

Import.propTypes = {
  transactions: PropTypes.array,
  lang: PropTypes.string
};

export default Import;
