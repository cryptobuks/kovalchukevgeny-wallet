import React from 'react';
import PropTypes from 'prop-types';

import Panel from './../panel/panel.jsx';
import DownloadData from './../download-data/download-data.jsx';
import ButtonToolbar from './../button-toolbar/button-toolbar.jsx';

import staticContent from './../../static-content/languages';

const Export = props => {

  const { transactions, categories, course, lang, theme } = props;
  const data = { transactions, categories, course };

  return (
    <Panel
      specialClass={`export ${theme}`}
      heading={staticContent[lang]['backup-export']['head']}
      headingIcon="backup"
    >
      <ButtonToolbar>
        <p>
          {staticContent[lang]['backup-export']['description']}
        </p>
        <DownloadData
          transactions={data}
          fileName="backup"
          fileFormat="json"
          btnText={staticContent[lang]['backup-export']['btnJson']}
        />
      </ButtonToolbar>
    </Panel>
  );
}

Export.defaultProps = {
  transactions: [],
  theme: 'dark',
  categories: [],
  course: [],
  lang: 'eng'
};

Export.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  course: PropTypes.array,
  lang: PropTypes.string,
  theme: PropTypes.string,
};

export default Export;
