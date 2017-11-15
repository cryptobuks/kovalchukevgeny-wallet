import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, linearGradient } from 'Recharts';

import Icon from './../icon/icon.jsx';
import Panel from './../panel/panel.jsx';
import CustomTooltip from './../custom-tooltip/custom-tooltip.jsx';

import staticContent from './../../static-content/languages';

const CurrencyRate = props => {
  let { lang, course, theme, pallet } = props;

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
        specialClass={`currency ${theme}`}
        heading={staticContent[lang]['currency-rate']['head']}
        headingIcon="monetization_on"
      >
        <div className="graph-wrapper">
          <ResponsiveContainer>
            <AreaChart 
              width={550} 
              height={250} 
              data={course}
              margin={{top: 10, right: 30, left: 0, bottom: 0}}
            >
              <XAxis
                tick={{stroke: `${theme === 'dark' ? '#fff' : '#000'}`, strokeWidth: 1}}
                dataKey="name"
              />
              <YAxis
                tick={{stroke: `${theme === 'dark' ? '#fff' : '#000'}`, strokeWidth: 1}}
                unit={staticContent[lang]['currency']} 
                domain={[getMinValue(course), getMaxValue(course)]}
              />
              <CartesianGrid 
                fill={theme === 'dark' ? 'rgba(0, 0, 0, 0.125)' : 'rgba(255, 255, 255, 0.05)'}
              />
              <Tooltip 
                content={<CustomTooltip lang={lang} type={'currency'}/>}
              />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={`${pallet.endColor}`} 
                    stopOpacity={0.8}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={`${pallet.startColor}`} 
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
              <Area 
                type='linear' 
                dataKey='value' 
                stroke={`${pallet.startColor}`} 
                fillOpacity={1} 
                fill='url(#colorUv)'
              />
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
  theme: 'dark',
};

CurrencyRate.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.string,
  course: PropTypes.array
};

export default CurrencyRate;
