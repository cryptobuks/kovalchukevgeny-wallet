import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Export from './../../components/backup-export/backup-export.jsx';
import Import from './../../components/backup-import/backup-import.jsx';
import Container from './../../components/container/container.jsx';
import Row from './../../components/row/row.jsx';

const Backup = (props) => {
  const { transactions, lang, course, categories } = props;
  return (
    <Container>
      <Row>
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
          />
        </div>
      </Row>
    </Container>
  );
};

Backup.defaultProps = {
  lang: 'eng',
  categories: [],
  transactions: [],
  course: []
};

Backup.propTypes = {
  categories: PropTypes.array,
  course: PropTypes.array,
  lang: PropTypes.string,
  transactions: PropTypes.array
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang,
  course: state.course
}))(Backup);
