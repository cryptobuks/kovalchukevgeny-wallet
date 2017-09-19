import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Button from './../../components/button/button.jsx';
import Panel from './../../components/panel/panel.jsx';
import Input from './../../components/input/input.jsx';
import Icon from './../../components/icon/icon.jsx';

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
    this.setState({ date: date });
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
    let { lang, course } = this.props;
    let { currentCourse, date } = this.state;

    course = course.filter(courseItem => {
      return moment(courseItem.date).format('YYYY-MM') === moment().format('YYYY-MM');
    })[0];

    course = course ? course.course : 1;

    return (
      <div>
        <Panel
          specialClass="month-course"
          heading={staticContent[lang]['month-course'].head}
          headingIcon="attach_money"
        >
          <div className="row">
            <div className="col-lg-6">
              <h1 className="text-center">{course}</h1>
            </div>
            <div className="col-lg-6">
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
              <div className="toolbar">
                <Button
                  specialClass="btn btn-primary"
                  onClickFunction={() => this.saveCourse(date, currentCourse)}
                >
                  <Icon icon={'attach_money'} />
                  {staticContent[lang]['month-course'].btnSubmit}
                </Button>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    );
  }
}

MonthCourse.defaultProps = {
  lang: 'eng',
  course: [],
  addMonthCourse: () => {}
};

MonthCourse.propTypes = {
  lang: PropTypes.string,
  course: PropTypes.array,
  addMonthCourse: PropTypes.func
};

export default connect(state => ({
  course: state.course
}), { addMonthCourse })(MonthCourse);
