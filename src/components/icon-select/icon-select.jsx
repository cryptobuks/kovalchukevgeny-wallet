import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './../../components/icon/icon.jsx';
import iconsArray from './icons.js';

class IconSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelectVisible: false
    };

    this.toggleSelect = this.toggleSelect.bind(this);
  }

  toggleSelect() {
    this.setState({isSelectVisible: !this.state.isSelectVisible});
  }

  render() {
    const { onClickFunction, defaultIcon, position } = this.props;
    const { isSelectVisible } = this.state;

    let icons = iconsArray.map((icon, i) => {
      return (
        <li
          key={i}
          data-icon={icon}
          className={icon === defaultIcon ? 'active' : ''}
          onClick={() => onClickFunction(icon)}
        >
          <Icon type={'fa'} icon={icon} />
        </li>
      );
    });

    return (
      <div
        className="category-icon"
        onClick={this.toggleSelect}
      >
        <strong>Choose icon:</strong>
        <Icon type="fa" icon={defaultIcon}/>
        <div
          className={
            classNames('icon-select', position, {hide: !isSelectVisible})}>
          <div className="panel panel-default">
            <ul className="clearfix">
              {icons}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

IconSelect.defaultProps = {
  defaultIcon: 'fa-paw',
  onClickFunction: () => {},
  position: 'bottom'
};

IconSelect.propTypes = {
  isVisible: PropTypes.string,
  onClickFunction: PropTypes.func,
  position: PropTypes.string
};

export default IconSelect;
