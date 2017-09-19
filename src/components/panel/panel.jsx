import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from './../icon/icon.jsx';

const Panel = props => {
  const { heading, footer, children, specialClass, onClickFunction, headingIcon } = props;

  return (
    <div className={classNames('panel', specialClass)}>
      {heading &&
      <div
        onClick={(e) => onClickFunction(e)}
        className="panel-heading">
        <h3 className="panel-title">
          {headingIcon && <Icon icon={headingIcon} />}
          {heading}
        </h3>
      </div>}
      <div className="panel-body">
        {React.Children.map(children, (child) => {
          return child;
        })}
      </div>
      {footer && <div className="panel-footer">
        <h3 className="panel-title panel-footer">{footer}</h3>
      </div>}
    </div>
  );
}

Panel.defaultProps = {
  onClickFunction: () => {}
};

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string
  ]).isRequired,
  heading: PropTypes.string,
  headingIcon: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onClickFunction: PropTypes.func
};

export default Panel;
