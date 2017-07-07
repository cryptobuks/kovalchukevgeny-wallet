import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './../../components/icon/icon.jsx';
import iconsArray from './icons.js';

class IconSelect extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { isVisible, onClickFunction } = this.props;

    let icons = iconsArray.map((icon, i) => {
      return(
        <li
          key={i}
          data-icon={icon}
          onClick={() => onClickFunction(icon)}
        >
          <Icon type={'fa'} icon={icon} />
        </li>
      );
    });

    return (
      <div className={classNames('icon-select', {hide: !isVisible})}>
        <div className="panel panel-default">
          <ul className="clearfix">
            {icons}
          </ul>
        </div>
      </div>
    );
  }
}

IconSelect.defaultProps = {
  isVisible: false,
  onClickFunction: () => {}
};

IconSelect.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClickFunction: PropTypes.func
};

export default IconSelect;
