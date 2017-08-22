import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Helpers from './../../helpers/Helpers';
import Panel from './../panel/panel.jsx';
import Button from './../button/button.jsx';
import Icon from './../icon/icon.jsx';

import staticContent from './../../static-content/languages';

class Export extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();
  }

  download(format, event) {
    let { transactions, categories, course } = this.props;
    const data = {
      transactions,
      categories,
      course
    };
    let contents = JSON.stringify(data);
    const URL = window.URL || window.webkitURL;
    const blob = new Blob([contents], {type: `text/${format};charset=utf-8;`});
    event.target.href = URL.createObjectURL(blob);
    event.target.download = 'backup.' + format;
  }

  render() {
    const { transactions, lang } = this.props;
    return (
      <div>
        <Panel
          specialClass="panel-success"
          heading={staticContent[lang]['backup-export'].head}
        >
          <div className="toolbar">
            <Button
              onClickFunction={this.download.bind(this, 'json')}
              specialClass="btn btn-primary"
              href="backup.json"
            >
              <Icon icon={'get_app'} />
              {staticContent[lang]['backup-export'].btnJson}
            </Button>
          </div>
        </Panel>
      </div>
    );
  }
}

Export.defaultProps = {
  transactions: [],
  categories: [],
  course: []
};

Export.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  course: PropTypes.array,
  lang: PropTypes.string
};

export default Export;
