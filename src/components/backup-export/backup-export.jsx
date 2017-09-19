import React from 'react';
import PropTypes from 'prop-types';

import Panel from './../panel/panel.jsx';
import Button from './../button/button.jsx';
import Icon from './../icon/icon.jsx';

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
      <div className="toolbar">
        <p>
          {staticContent[lang]['backup-export'].description}
        </p>
        <Button
          onClickFunction={download.bind(this, 'json')}
          specialClass="btn btn-primary"
          href="backup.json"
        >
          <Icon icon={'get_app'} />
          {staticContent[lang]['backup-export'].btnJson}
        </Button>
      </div>
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
