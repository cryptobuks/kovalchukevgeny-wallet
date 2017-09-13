import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'Recharts';

import Icon from './../icon/icon.jsx';
import Panel from './../panel/panel.jsx';
import CustomTooltip from './../custom-tooltip/custom-tooltip.jsx';

import staticContent from './../../static-content/languages';

const CurrencyRate = props => {

  let { lang, course } = props;

  let getMaxValue = array => {
    if(array && array.length > 0) {
      return Math.max.apply(Math,array.map(function(currentCourse){return currentCourse.course;}));
    } else {
        return 0;
    }
  }

  let getMinValue = array => {
    if(array && array.length > 0) {
      return Math.min.apply(Math,array.map(function(currentCourse){return currentCourse.course;}));
    } else {
        return 0;
    }
  }

  course = course.map(currentCourse => {
    currentCourse.date = new Date(moment(currentCourse.date).format('YYYY-MM-DD'));
    return currentCourse;
  });

  course = course.map((item, index) => {
    const date = moment(item.date).format('MMM YYYY');
    return {
      id: index,
      name: date,
      value: item.course
    }
  });

  return (
    <div>
      {course.length > 0 &&
      <Panel
        specialClass="currency"
        heading={staticContent[lang]['currency-rate'].head}
      >
        <div className="graph-wrapper">
          <ResponsiveContainer>
            <AreaChart width={550} height={250} data={course}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <XAxis dataKey="name"/>
              <YAxis unit={staticContent[lang].currency} domain={[getMinValue(course), getMaxValue(course)]}/>
              <CartesianGrid strokeDasharray="6 6"/>
              <Tooltip content={<CustomTooltip lang={lang} type={'currency'}/>}/>
              <Area type='monotone' dataKey='value' stroke='#b91919' fill='#b91919' />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    }
    </div>
  );
}

CurrencyRate.propTypes = {
  lang: PropTypes.string,
  course: PropTypes.array
};

export default CurrencyRate;
