import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './../icon/icon.jsx';
import Panel from './../panel/panel.jsx';

import staticContent from './../../static-content/languages.json';

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
    const { onClickFunction, defaultIcon, position, iconsArray, lang } = this.props;
    const { isSelectVisible } = this.state;

    let icons = iconsArray.map((icon, i) => {
      return (
        <li
          key={i}
          data-icon={icon}
          className={icon === defaultIcon ? 'icon-wrapp active' : 'icon-wrapp'}
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
        <strong>{staticContent[lang]['adding-category'].chooseIcon}</strong>
        <Icon type="fa" icon={defaultIcon}/>
        <div className={classNames('icon-select', position, {hide: !isSelectVisible})}>
          <Panel specialClass="panel-default">
            <ul className="clearfix">
              {icons}
            </ul>
          </Panel>
        </div>
      </div>
    );
  }
}

IconSelect.defaultProps = {
  defaultIcon: 'fa-paw',
  onClickFunction: () => {},
  position: 'bottom',
  iconsArray: ['fa-paw', 'fa-car']
};

IconSelect.propTypes = {
  isVisible: PropTypes.string,
  onClickFunction: PropTypes.func,
  position: PropTypes.string,
  iconsArray: PropTypes.array,
  lang: PropTypes.string
};

export default IconSelect;
