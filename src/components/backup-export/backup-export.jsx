import React from 'react';
import PropTypes from 'prop-types';

import Panel from './../panel/panel.jsx';
import DownloadData from './../download-data/download-data.jsx';
import ButtonToolbar from './../button-toolbar/button-toolbar.jsx';

import staticContent from './../../static-content/languages';

const Export = props => {

  const download = (format, event) => {
    let { transactions, categories, course } = props;
    const data = { transactions, categories, course };
    let contents = JSON.stringify(data);
    const URL = window.URL || window.webkitURL;
    const blob = new Blob([contents], {type: `text/${format};charset=utf-8;`});
    event.target.href = URL.createObjectURL(blob);
    event.target.download = 'backup.' + format;
  }

  const { transactions, lang } = props;

  return (
    <Panel
      specialClass="export"
      heading={staticContent[lang]['backup-export'].head}
      headingIcon="backup"
    >
      <ButtonToolbar>
        <p>
          {staticContent[lang]['backup-export'].description}
        </p>
        <DownloadData
          transactions={transactions}
          fileName="backup"
          fileFormat="json"
          btnText={staticContent[lang]['backup-export'].btnJson}
        />
      </ButtonToolbar>
    </Panel>
  );
}

Export.defaultProps = {
  transactions: [],
  categories: [],
  course: [],
  lang: 'eng'
};

Export.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  course: PropTypes.array,
  lang: PropTypes.string
};

export default Export;
