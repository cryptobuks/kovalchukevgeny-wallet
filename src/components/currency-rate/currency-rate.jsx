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
      return Math.max.apply(Math,array.map(currentCourse => currentCourse.course));
    }
    return 0;
  }

  let getMinValue = array => {
    if(array && array.length > 0) {
      return Math.min.apply(Math,array.map(currentCourse => currentCourse.course));
    }
    return 0;
  }

  course = course.map(item => {
    return {
      name: moment(item.date).format('MMM YYYY'),
      value: item.course
    }
  });

  return (
    <div>
      {course.length > 0 &&
      <Panel
        specialClass="currency dark"
        heading={staticContent[lang]['currency-rate']['head']}
        headingIcon="monetization_on"
      >
        <div className="graph-wrapper">
          <ResponsiveContainer>
            <AreaChart width={550} height={250} data={course}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <XAxis dataKey="name"/>
              <YAxis unit={staticContent[lang]['currency']} domain={[getMinValue(course), getMaxValue(course)]}/>
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

CurrencyRate.defaultProps = {
  lang: 'eng',
  course: [],
};

CurrencyRate.propTypes = {
  lang: PropTypes.string,
  course: PropTypes.array
};

export default CurrencyRate;
