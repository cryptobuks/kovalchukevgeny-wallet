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

    const myStyles = {
      root: {
        border: '1px solid #dddddd',
        padding: 10
      },
      dropTargetStyle: {
        padding: 'none',
        cursor: 'pointer',
      },
      placeHolderStyle: {
        textAlign: 'center',
        textTransform: 'uppercase'
      },
      fileset: {
        marginTop: 10,
        paddingTop: 10,
        borderTop: '1px solid #b91919'
      },
      fileDetails: {
        display: 'flex',
        alignItems: 'flex-start'
      },
      fileName: {
        flexGrow: '8'
      },
      fileSize: {
        'float': 'right',
        flexGrow: '2',
        alignSelf: 'flex-end'
      },
      removeButton: {
        alignSelf: 'flex-end'
      },
      progress: {
        marginTop: 10,
        width: '100%',
        height: 16,
        WebkitAppearance: 'none'
      }
    };

    return (
      <div>
        <Panel
          specialClass="panel-success import"
          heading={staticContent[lang]['backup-import'].head}
        >
          <XHRUploader
            url='http://localhost:3000/api/uploadfile'
            auto
            styles={myStyles}
            dropzoneLabel={staticContent[lang]['backup-import'].dropzoneLabel}
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
