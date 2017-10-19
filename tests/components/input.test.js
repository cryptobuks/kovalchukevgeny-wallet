import React from 'react';
import renderer from 'react-test-renderer';

import Input from './../../src/components/input/input.jsx';

describe('Input Component', () => {

  it('Render Default input', () => {
    const input = renderer.create(
      <Input />
    ).toJSON();
    // Checking of node type
    expect(input.type).toEqual('input');
    // Checking of props type
    expect(input.props.type).toEqual('text');
    // Checking of class
    expect(input.props.className).toEqual('form-control');
    // Checking of placeholder value
    expect(input.props.placeholder).toEqual('placeholder');
    // Checking of value
    expect(input.props.value).toEqual('default value');
  });

  it('Render input with custom props', () => {
    const input = renderer.create(
      <Input
        type="password"
        specialClass="form"
        placeholder="add password"
        value="text" />
    ).toJSON();
    // Checking of props custom type
    expect(input.props.type).toEqual('password');
    // Checking of custom class
    expect(input.props.className).toEqual('form-control form');
    // Checking of placeholder custom value
    expect(input.props.placeholder).toEqual('add password');
    // Checking of custom value
    expect(input.props.value).toEqual('text');
  });

  it('Change input value', () => {
    const input = renderer.create(<Input />).toJSON();
    // Checking of default value
    expect(input.props.value).toEqual('default value');
    // Update value
    input.props.value = 'updated value';
    // Checking of custom value
    expect(input.props.value).toEqual('updated value');
  });

});
