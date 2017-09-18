import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';

import Icon from './../icon/icon.jsx';
import Panel from './../panel/panel.jsx';

import staticContent from './../../static-content/languages';

class IconSelect extends PureComponent {
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

  handleClickOutside() {
    this.setState({isSelectVisible: false});
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
        className={classNames('category-icon', {active: isSelectVisible})}
        onClick={this.toggleSelect}
      >
        <strong>{staticContent[lang]['adding-category'].chooseIcon}</strong>
        <Icon type="fa" icon={defaultIcon}/>
        <div className={classNames('icon-select', position, {hide: !isSelectVisible})}>
          <Panel>
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
  iconsArray: ['fa-paw', 'fa-car'],
  lang: 'eng'
};

IconSelect.propTypes = {
  isVisible: PropTypes.string,
  onClickFunction: PropTypes.func,
  position: PropTypes.string,
  iconsArray: PropTypes.array,
  lang: PropTypes.string
};

export default enhanceWithClickOutside(IconSelect);
