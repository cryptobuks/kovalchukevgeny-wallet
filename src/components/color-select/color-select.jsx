import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';

import Panel from './../panel/panel.jsx';
import Icon from './../icon/icon.jsx';

import staticContent from './../../static-content/languages';

class ColorSelect extends PureComponent {
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
    const { onClickFunction, defaultColor, position, colorsArray, lang } = this.props;
    const { isSelectVisible } = this.state;

    let colors = colorsArray.map((color, i) => {
      return (
        <li
          key={i}
          data-color={color}
          className={color === defaultColor ? 'color-wrapp active' : 'color-wrapp'}
          onClick={() => onClickFunction(color)}
        >
          <span className="colorWrapper" style={{'borderColor': color}}>
            <span className="colorRound" style={{'backgroundColor': color}}></span>
            <Icon icon={'done'} />
          </span>
        </li>
      );
    });

    return (
      <div
        className={classNames('category-color', {active: isSelectVisible})}
        onClick={this.toggleSelect}
      >
        <strong>{staticContent[lang]['adding-category'].chooseColor}</strong>
          <span className="colorRound" style={{'backgroundColor': defaultColor}}></span>
        <div className={classNames('color-select', position, {hide: !isSelectVisible})}>
          <Panel>
            <ul className="clearfix">
              {colors}
            </ul>
          </Panel>
        </div>
      </div>
    );
  }
}

ColorSelect.defaultProps = {
  defaultColor: 'fa-paw',
  onClickFunction: () => {},
  position: 'bottom',
  colorsArray: ['fa-paw', 'fa-car']
};

ColorSelect.propTypes = {
  isVisible: PropTypes.string,
  onClickFunction: PropTypes.func,
  position: PropTypes.string,
  colorsArray: PropTypes.array,
  lang: PropTypes.string
};

export default enhanceWithClickOutside(ColorSelect);
