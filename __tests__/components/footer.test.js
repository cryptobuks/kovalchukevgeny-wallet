import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import renderer from 'react-test-renderer';

import Footer from './../../src/components/footer/footer.jsx';

describe('Foter Component', () => {

  it('Render footer', () => {
    const footer = renderer.create(
      <Footer />
    ).toJSON();
    // Checking of node type
    expect(footer.type).toEqual('footer');
    // Checking of class
    expect(footer.props.className).toEqual('footer');
  });
  
});
