import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Export from './../../components/backup-export/backup-export.jsx';
import Import from './../../components/backup-import/backup-import.jsx';

const Backup = (props) => {
  const { transactions, lang, course, categories } = props;
  return (
    <div className="widgets">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Export
              lang={lang}
              course={course}
              transactions={transactions}
              categories={categories}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <Import
              lang={lang}
              course={course}
              transactions={transactions}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Backup.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  lang: PropTypes.string,
  course: PropTypes.array
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang,
  course: state.course
}))(Backup);
