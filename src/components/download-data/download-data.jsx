import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Button from './../../components/button/button.jsx';

import Helpers from './../../helpers/Helpers';

import staticContent from './../../static-content/languages';

class DownloadData extends PureComponent {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.convertToCSV = this.convertToCSV.bind(this);
  }

  convertToCSV(objArray) {
    const { lang, categories } = this.props;
    objArray = objArray.map(item => {
      item.date = moment(item.date).format('DD/MM/YYYY');
      item.category = this.Helpers.getCategoryById(categories, item);
      return item;
    });
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = staticContent[lang]['csvTableHead']; // table head
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        // ignore excess data in final table
        if(index !== 'id') {
          if (line != '') line += ',';
          line += array[i][index];
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  download(format, event) {
    let { transactions, fileName } = this.props;
    let contents = format === 'json' ? JSON.stringify(transactions) :
    this.convertToCSV(transactions);
    const URL = window.URL || window.webkitURL;
    const blob = new Blob(['\ufeff' + contents], {type: `text/${format};charset=utf-8;`});
    event.target.href = URL.createObjectURL(blob);
    event.target.download = `${fileName}.${format}`;
  }

  render() {
    const { lang, fileName, fileFormat, btnText } = this.props;

    return (
      <Button
        onClickFunction={this.download.bind(this, fileFormat)}
        specialClass="btn btn-primary"
        href={`${fileName}.${fileFormat}`}
        icon="get_app"
      >{btnText}</Button>
    )
  }
}

DownloadData.defaultProps = {
  transactions: [],
  categories: [],
  fileName: 'data',
  fileFormat: 'json',
  btnText: 'download',
  lang: 'eng'
}

DownloadData.propTypes = {
  transactions: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  categories: PropTypes.array,
  fileName: PropTypes.string,
  fileFormat: PropTypes.string,
  btnText: PropTypes.string,
  lang: PropTypes.string
}

export default DownloadData;
