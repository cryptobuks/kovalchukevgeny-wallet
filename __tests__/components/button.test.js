import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import Button from './../../src/components/button/button.jsx';

describe('Button Component', () => {
  let onClickFunc;

  beforeEach(() => {
    const onClickFunc = jest.genMockFunction();
  });

  it('Render button with class name, type and text inside', () => {
    const button = renderer.create(
      <Button specialClass="button">Button</Button>
    ).toJSON();
    // Checking of node type
    expect(button.type).toEqual('button');
    // Checking of type
    expect(button.props.type).toEqual('button');
    // Checking of class
    expect(button.props.className).toEqual('button');
    // Checking of inner text
    expect(button.children[0]).toEqual('Button');
  });

  it('Render Link with class name, type and text inside', () => {
    const button = renderer.create(
      <Button specialClass="link" href="http://test.com">Link</Button>
    ).toJSON();
    // Checking of node type
    expect(button.type).toEqual('a');
    // Checking of type
    expect(button.props.type).toEqual('link');
    // Checking of class
    expect(button.props.className).toEqual('link');
    // Checking of class
    expect(button.props.href).toEqual('http://test.com');
    // Checking of inner text
    expect(button.children[0]).toEqual('Link');
  });

  it('Render button with empty class and children elements inside', () => {
    const button = renderer.create(
      <Button>
        <i className="material-icons">Arrow</i>
        Arrow
      </Button>
    ).toJSON();
    // Checking of class
    expect(button.props.className).toEqual('');
    // Checking of inner icon
    expect(button.children[0].type).toEqual('i');
    expect(button.children[0].props.className).toEqual('material-icons');
    expect(button.children[0].children[0]).toEqual('Arrow');
    // Checking of inner text
    expect(button.children[1]).toEqual('Arrow');
  });
});
