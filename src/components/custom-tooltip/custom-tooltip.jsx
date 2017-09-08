import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import staticContent from './../../static-content/languages';

class CustomTooltip extends PureComponent {

  render() {
    const { active, lang } = this.props;
    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="custom-tooltip">
          <p className="intro month">
            {staticContent[lang]['custom-tooltip'].date}: {label}
          </p>
          <p className="intro money">
            {staticContent[lang]['custom-tooltip'].money}: {payload[0].value}
            {staticContent[lang].currency}
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
