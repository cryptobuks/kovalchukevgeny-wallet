import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import staticContent from './../../static-content/languages';

class CustomTooltip extends PureComponent {

  render() {
    const { active, lang } = this.props;
    if (active) {
      const { payload, label, category, currency, report } = this.props;
      console.log(this.props);
      return (
        <div className="custom-tooltip">
          {(label && !currency) &&
            <p className="intro month">
              {staticContent[lang]['custom-tooltip'].date}:
              <span>{moment(label).format('Do MMMM')}</span>
            </p>
          }
          {currency &&
            <p className="intro month">
              {staticContent[lang]['custom-tooltip'].course}:
              <span>{moment(label).format('MMMM YYYY')}</span>
            </p>
          }
          {category &&
            <p className="intro category">
              {staticContent[lang]['custom-tooltip'].category}:
              <span>{payload[0].name}</span>
            </p>
          }
          <p className="intro money">
            {staticContent[lang]['custom-tooltip'].money}:
            <span>{payload[0].value}</span>
            <span>{staticContent[lang].currency}</span>
          </p>
        </div>
      );
    }
    return null;
  }
};

CustomTooltip.propTypes = {
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string,
  lang: PropTypes.string
}

export default CustomTooltip;
