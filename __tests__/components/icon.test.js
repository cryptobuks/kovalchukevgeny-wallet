import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import Icon from './../../src/components/icon/icon.jsx';

describe('Icon Component', () => {

  it('Render Material icon', () => {
    const icon = renderer.create(
      <Icon type="material" icon="icon"/>
    ).toJSON();
    // Checking class
    expect(icon.props.className).toEqual('material-icons');
    // Checking of type
    expect(icon.type).toEqual('i');
    // Checking of children
    expect(icon.children[0]).toEqual('icon');
  });

  it('Render Font awesome icon', () => {
    const icon = renderer.create(
      <Icon type="fa" icon="fa-icon" />
    ).toJSON();
    // Checking class
    expect(icon.props.className).toEqual('fa fa-icon');
    // Checking of aria label
    expect(icon.props['aria-hidden']).toEqual('true');
    // Checking of type
    expect(icon.type).toEqual('i');
    // Checking of children
    expect(icon.children).toEqual(null);
  });

  it('Render Default icon', () => {
    const icon = renderer.create(
      <Icon icon="icon" />
    ).toJSON();
    // Checking class
    expect(icon.props.className).toEqual('material-icons');
    // Checking of type
    expect(icon.type).toEqual('i');
    // Checking of children
    expect(icon.children[0]).toEqual('icon');
  });
});
