import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Panel from './../panel/panel.jsx';
import Icon from './../icon/icon.jsx';

import pallet from './user-pallet';
import staticContent from './../../static-content/languages';

class UserPallet extends Component {
  constructor(props) {
    super(props);

    this.renderColorPallet = this.renderColorPallet.bind(this);
  }

  renderColorPallet(palletArray) {

    return palletArray.map((palleteColor, i) => {
      return (
        <li
          key={i}
          className="pallet-item"
          style={{
            'backgroundColor': palleteColor.background,
            'backgroundImage': `linear-gradient(to bottom right, ${palleteColor.startColor}, ${palleteColor.endColor})`
          }}
        >
        {palleteColor.name}
        </li>
      );
    });
  }

  render() {
    const { lang } = this.props;

    return (
      <Panel 
        specialClass="dark pallet"
        heading={staticContent[lang]['user-setting']['pallet']}
      >
        <ul className="clearfix pallet-list">
          {this.renderColorPallet(pallet)}
        </ul>
      </Panel>
    );
  }
}

UserPallet.defaultProps = {
  lang: 'eng'
};

UserPallet.propTypes = {
  lang: PropTypes.string
};

export default UserPallet; 