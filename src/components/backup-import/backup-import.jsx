import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Panel from './../panel/panel.jsx';
import Button from './../button/button.jsx';
import Icon from './../icon/icon.jsx';

import staticContent from './../../static-content/languages';

class Import extends Component {
  constructor(props) {
    super(props);

    this.readFile = this.readFile.bind(this);
  }

  readFile() {
    const file = this.textInput.files[0];
    const reader = new FileReader();
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) {
        localStorage.setItem('e-wallet', evt.target.result);
      }
    };
    const blob = file.slice(0, file.size);
    reader.readAsText(blob);
  }

  render() {
    const { lang } = this.props;

    return (
      <div>
        <Panel
          specialClass="panel-success import"
          heading={staticContent[lang]['backup-import'].head}
        >
          <div className="toolbar">
            <p>
              {staticContent[lang]['backup-import'].description}
            </p>
            <label className="label-load btn btn-primary">
              <input
                type="file"
                className="inputfile"
                ref={(input) => { this.textInput = input; }}
              />
              <Icon icon="move_to_inbox"/>
              {staticContent[lang]['backup-import'].btnLoad}
            </label>
            <Button
              specialClass="btn btn-primary"
              onClickFunction={this.readFile}
            >
              <Icon icon="cached"/>
              {staticContent[lang]['backup-import'].btnSync}
            </Button>
          </div>
        </Panel>
      </div>
    );
  }
}

Import.defaultProps = {

};

Import.propTypes = {
  lang: PropTypes.string
};

export default Import;
