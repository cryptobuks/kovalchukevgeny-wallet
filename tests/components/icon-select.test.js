import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import iconsArray from './../../src/components/icon-select/icons.js';

import IconSelect from './../../src/components/icon-select/icon-select.jsx';

describe('IconSelect Component', () => {

  it('Render default select', () => {
    const iconSelect = renderer.create(
      <IconSelect />
    ).toJSON();
    // Checking of node type
    expect(iconSelect.type).toEqual('div');
    // Checking of children
    expect(iconSelect.children.length).toEqual(3);
    // Checking of first child type
    expect(iconSelect.children[0].type).toEqual('strong');
    // Checking of second child type
    expect(iconSelect.children[1].type).toEqual('i');
    // Checking of third child type
    expect(iconSelect.children[2].type).toEqual('div');
  });

  it('Render custom select', () => {
    const iconSelect = shallow(
      <IconSelect
        iconsArray={iconsArray}
        position="top"
      />
    );
    // Checking quantity of icons
    expect(iconSelect.find('.icon-wrapp').length).toEqual(iconsArray.length);
    // Checking custom icon
    expect(iconSelect.find('.icon-wrapp').node.props['data-icon']).toEqual(iconsArray[0]);
    // Checking position of dropdown
    expect(iconSelect.find('.icon-select').node.props.className).toEqual('icon-select top hide');
  });

  it('Simulate click events on select', () => {
    const iconSelect = shallow(<IconSelect />);
    // Cheking before click
    expect(iconSelect.state().isSelectVisible).toEqual(false);
    expect(iconSelect.find('.icon-select').node.props.className).toEqual('icon-select bottom hide');

    iconSelect.find('.category-icon').simulate('click');
    // Cheking after click
    expect(iconSelect.state().isSelectVisible).toEqual(true);
    expect(iconSelect.find('.icon-select').node.props.className).toEqual('icon-select bottom');
  });

  it('Simulate click events on icon', () => {
    const onClickFunction = sinon.spy();
    const iconSelect = shallow(<IconSelect onClickFunction={onClickFunction} />);
    // Checking can be find the icon
    expect(iconSelect.find('.active').length).toEqual(1);
    iconSelect.find('.active').simulate('click');
    // Checking call of function
    expect(iconSelect.find('.icon-wrapp').node.props['data-icon']).toEqual('fa-paw');
    expect(iconSelect.state().isSelectVisible).toEqual(false);
    expect(onClickFunction.called).toEqual(true);
    expect(onClickFunction.calledOnce).toEqual(true);
    expect(onClickFunction.callCount).toEqual(1);
  });

});
