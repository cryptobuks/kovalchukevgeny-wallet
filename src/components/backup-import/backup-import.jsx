import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { toastr } from 'react-redux-toastr';

import Panel from './../panel/panel.jsx';
import Button from './../button/button.jsx';
import Icon from './../icon/icon.jsx';
import ButtonToolbar from './../button-toolbar/button-toolbar.jsx';

import staticContent from './../../static-content/languages';

class Import extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      file: {}
    }

    this.readFile = this.readFile.bind(this);
    this.renderInfoAboutFile = this.renderInfoAboutFile.bind(this);
    this.updateLoading = this.updateLoading.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  readFile() {
    const { lang } = this.props;
    if(this.state.file.name && this.state.file.size) {
      const file = this.fileInput.files[0];
      const reader = new FileReader();
      reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) {
          localStorage.setItem('e-wallet', evt.target.result);
        }
      };
      const blob = file.slice(0, file.size);
      reader.readAsText(blob);
      toastr.success(staticContent[lang]['toastr']['syncMessage'], { timeOut: 2000 });
      window.setTimeout(this.reloadPage, 2000);
    }
  }

  reloadPage() {
    window.location.reload(false);
  }

  renderInfoAboutFile(file) {
    if(file.name && file.size) {
      return(
        <div className="file">
          <div className="file-name">
            {file.name}
          </div>
          <div className="file-size">
            {file.size/1000 } bytes
          </div>
          <Icon icon="done" />
        </div>
      );
    }
  }

  updateLoading(event) {
    this.setState({file: event.target.files[0]});
  }

  render() {
    const { lang, theme } = this.props;
    const { file } = this.state;

    return (
      <Panel
        specialClass={`import ${theme}`}
        heading={staticContent[lang]['backup-import']['head']}
        headingIcon="open_in_browser"
      >
        <ButtonToolbar>
          <p>
            {staticContent[lang]['backup-import']['description']}
          </p>
          {this.renderInfoAboutFile(file)}
          <label className="label-load btn btn-primary">
            <input
              type="file"
              className="inputfile"
              onChange={this.updateLoading}
              ref={(input) => { this.fileInput = input; }}
            />
            <Icon icon="move_to_inbox"/>
            {staticContent[lang]['backup-import']['btnLoad']}
          </label>
          <Button
            specialClass={classNames('btn btn-primary', {'disabled': !file.name})}
            onClickFunction={this.readFile}
            icon="cached"
          >{staticContent[lang]['backup-import']['btnSync']}</Button>
        </ButtonToolbar>
      </Panel>
    );
  }
}

Import.defaultProps = {
  lang: 'eng',
  theme: 'dark',
};

Import.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.string,
};

export default Import;
