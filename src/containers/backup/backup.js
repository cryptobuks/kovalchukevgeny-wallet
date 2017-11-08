import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Export from './../../components/backup-export/backup-export.jsx';
import Import from './../../components/backup-import/backup-import.jsx';
import Container from './../../components/container/container.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';

const Backup = props => {
  const { transactions, lang, course, categories, user } = props;
  return (
    <Container>
      <Row>
        <Col lg={6} md={6} sm={6}>
          <Export
            theme={user.settings.theme}
            lang={lang}
            course={course}
            transactions={transactions}
            categories={categories}
          />
        </Col>
        <Col lg={6} md={6} sm={6}>
          <Import
            theme={user.settings.theme}
            lang={lang}
          />
        </Col>
      </Row>
    </Container>
  );
};

Backup.defaultProps = {
  lang: 'eng',
  categories: [],
  transactions: [],
  course: [],
};

Backup.propTypes = {
  categories: PropTypes.array,
  course: PropTypes.array,
  lang: PropTypes.string,
  transactions: PropTypes.array,
  user: PropTypes.user,
};

export default connect(state => ({
  transactions: state.transactions,
  categories: state.categories,
  lang: state.lang,
  course: state.course,
  user: state.user,
}))(Backup);
