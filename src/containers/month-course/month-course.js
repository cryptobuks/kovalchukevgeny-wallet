import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Helpers from './../../helpers/Helpers';
import Button from './../../components/button/button.jsx';
import Panel from './../../components/panel/panel.jsx';
import Input from './../../components/input/input.jsx';
import { addMonthCourse } from './../../actions/actionCreators';

import staticContent from './../../static-content/languages.json'; // eslint-disable-line import/namespace

class MonthCourse extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

    this.state = {
      date: moment(),
      currentCourse: 0.1
    };

    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChangeCourse = this.handleChangeCourse.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  handleChangeData(date) {
    this.setState({date: date});
  }

  handleChangeCourse(event) {
    this.setState({currentCourse: +event.target.value});
  }

  saveCourse(date, currentCourse) {
    const { addMonthCourse } = this.props;
    addMonthCourse(date.format('YYYY-MM'), currentCourse);
    this.setState({
      date: moment(),
      currentCourse: 0.1
    });
  }

  render() {
    let { lang, course } = this.props;
    let { currentCourse, date } = this.state;

    if (currentCourse === 0 || currentCourse < 0) {
      currentCourse = 1;
    }

    course = course.filter(courseItem => {
      return courseItem.date === moment().format('YYYY-MM');
    })[0];

    course = course ? course.course : 1;

    return (
      <div>
        <Panel
          specialClass="panel-success month-course"
          heading="course"
        >
          <div className="row">
            <div className="col-lg-6">
              <h1 className="text-center">{course}</h1>
            </div>
            <div className="col-lg-6">
              <DatePicker
                locale="en-gb"
                className="form-control"
                selected={date}
                onChange={this.handleChangeData}
              />
              <Input
                type="number"
                placeholder="0.00"
                value={currentCourse}
                handleChange={this.handleChangeCourse}
              />
              <Button
                specialClass="btn btn-primary"
                onClickFunction={() => this.saveCourse(date, currentCourse)}
              >Save</Button>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}

MonthCourse.propTypes = {
  lang: PropTypes.string
};

export default connect(state => ({
  course: state.course
}), { addMonthCourse })(MonthCourse);
