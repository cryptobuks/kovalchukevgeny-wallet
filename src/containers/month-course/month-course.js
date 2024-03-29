import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Button from './../../components/button/button.jsx';
import Panel from './../../components/panel/panel.jsx';
import Input from './../../components/input/input.jsx';
import ButtonToolbar from './../../components/button-toolbar/button-toolbar.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';

import { addMonthCourse } from './../../actions/actionCreators';

import staticContent from './../../static-content/languages';

class MonthCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      currentCourse: ''
    };

    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChangeCourse = this.handleChangeCourse.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  handleChangeData(date) {
    this.setState({ date });
  }

  handleChangeCourse(event) {
    this.setState({ currentCourse: +event.target.value });
  }

  saveCourse(date, currentCourse) {
    const { addMonthCourse } = this.props;
    addMonthCourse(date, currentCourse);
    this.setState({
      date: moment(),
      currentCourse: ''
    });
  }

  render() {
    const { lang } = this.props;
    let { course } = this.props;
    const { currentCourse, date } = this.state;

    course = course.find(courseItem => {
      return moment(courseItem.date).format('YYYY-MM') === moment().format('YYYY-MM');
    });

    course = course ? course.course : 1;

    return (
      <Panel
        specialClass="month-course"
        heading={staticContent[lang]['month-course']['head']}
        headingIcon="attach_money"
      >
        <Row>
          <Col lg={6}>
            <h1 className="text-center">{course}</h1>
          </Col>
          <Col lg={6}>
            <DatePicker
              locale="en-gb"
              className="form-control"
              maxDate={moment()}
              selected={date}
              onChange={this.handleChangeData}
            />
            <Input
              type="number"
              placeholder="0.00"
              value={currentCourse}
              handleChange={this.handleChangeCourse}
            />
            <ButtonToolbar>
              <Button
                specialClass="btn btn-primary"
                onClickFunction={() => this.saveCourse(date, currentCourse)}
                icon="attach_money"
              >{staticContent[lang]['month-course']['btnSubmit']}</Button>
            </ButtonToolbar>
          </Col>
        </Row>
      </Panel>
    );
  }
}

MonthCourse.defaultProps = {
  lang: 'eng',
  course: [],
  addMonthCourse: () => {}
};

MonthCourse.propTypes = {
  addMonthCourse: PropTypes.func,
  course: PropTypes.array,
  lang: PropTypes.string
};

export default connect(state => ({
  course: state.course
}), { addMonthCourse })(MonthCourse);
