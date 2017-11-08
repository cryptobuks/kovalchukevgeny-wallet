import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Panel from './../panel/panel.jsx';
import Icon from './../icon/icon.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';
import Container from './../../components/container/container.jsx';

const DayExpenses = props => {
  const dayExpenses = props.transaction.map(item => item.money);
  let totalExpenses = dayExpenses.reduce((total, current) => total + current);

  return (
    <Panel
      specialClass={props.theme}
      heading={`${moment(props.transaction[0].date).format('DD/MM/YYYY')} ${props.day}`}
      footer={`- ${String(totalExpenses)}`}>
      <Container>
        {props.transaction.map((item, index) => {
          return (
            <Row key={index}>
              <Col lg={1} md={1} sm={1} xs={2}>
                <span className="icon-wrapper" style={{ backgroundColor: item.categoryColor }}>
                  <Icon icon={item.categoryIcon} type="fa" />
                </span>
              </Col>
              <Col lg={10} md={9} sm={9} xs={8}>
                <h5>{item.categoryName}</h5>
                <p>{item.description}</p>
              </Col>
              <Col lg={1} md={2} sm={2} xs={2}>
                <div className="money">-{item.money}</div>
              </Col>
            </Row>
          )
        })
        }
      </Container>
    </Panel>
  );
}

DayExpenses.defaultProps = {
  lang: 'eng'
}

DayExpenses.propTypes = {
  type: PropTypes.string,
  lang: PropTypes.string,
  theme: PropTypes.string,
}

export default DayExpenses;
