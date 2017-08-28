import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MetricsGraphics from 'react-metrics-graphics';

import Icon from './../icon/icon.jsx';
import Panel from './../panel/panel.jsx';

import staticContent from './../../static-content/languages';

class CurrencyRate extends Component {
  constructor(props) {
    super(props);

    this.getMaxValue = this.getMaxValue.bind(this);
  }

  getMaxValue(array) {
    if(array && array.length > 0) {
      return Math.max.apply(Math,array.map(function(currentCourse){return currentCourse.course;}));
    } else {
        return 0;
    }
  }

  render() {
    let { lang, course } = this.props;

    course = course.map(currentCourse => {
      currentCourse.date = new Date(moment(currentCourse.date).format('YYYY-MM-DD'));
      return currentCourse;
    });

    return (
      <div>
        {course.length > 0 &&
        <Panel
          specialClass="currency"
          heading={staticContent[lang]['currency-rate'].head}
        >
          <MetricsGraphics
            title={staticContent[lang]['currency-rate'].smDescr}
            description={staticContent[lang]['currency-rate'].bigDescr}
            min_y_from_data
            data={course}
            height={250}
            width={535}
            max_y={this.getMaxValue(course)}
            y_axis={false}
            x_accessor="date"
            y_accessor="course"
          />
        </Panel>
      }
      </div>
    );
  }
}

CurrencyRate.propTypes = {
  lang: PropTypes.string,
  course: PropTypes.array
};

export default CurrencyRate;
