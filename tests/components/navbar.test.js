import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Navbar from './../../src/components/navbar/navbar.jsx';

describe('Navbar Component', () => {

  it('Render default navbar', () => {
    const navbar = renderer.create(
      <Navbar />
    ).toJSON();
    // Checking of node type
    expect(navbar.type).toEqual('nav');
    // Checking of class
    expect(navbar.props.className).toEqual('navbar');
  });

  it('Render navbar without logo', () => {
    const navbar = shallow(
      <Navbar />
    );
    // Checking logo
    expect(navbar.find('.navbar-brand').length).toEqual(0);
  });

  it('Render custom navbar with links and logo', () => {
    const navbar = shallow(
      <Navbar specialClass="navigation" withLogo>
        <ul className="links">
          <li><a className="link" href="#">Link</a></li>
          <li><a className="link" href="#">Link</a></li>
          <li><a className="link" href="#">Link</a></li>
        </ul>
      </Navbar>
    );
    // Checking of class
    expect(navbar.node.props.className).toEqual('navbar navigation');
    // Checking children
    expect(navbar.find('.link').length).toEqual(3);
    // Checking logo
    expect(navbar.find('.navbar-brand').length).toEqual(1);
  });

  it('Simulate click on hamburger menu', () => {
    const navbar = mount(<Navbar />);
    // Cheking state before click
    expect(navbar.state().isShow).toEqual(false);
    navbar.find('.navbar-toggle').simulate('click');
    // Cheking state after click
    expect(navbar.state().isShow).toEqual(true);
  });

  it('Simulate open/close menu state', () => {
    const navbar = shallow(<Navbar />);
    // Cheking close state
    expect(navbar.state().isShow).toEqual(false);
    expect(navbar.find('.navbar-collapse').node.props.className).toEqual('navbar-collapse collapse');
    // Cheking open state
    navbar.setState({ isShow: true });
    expect(navbar.find('.navbar-collapse').node.props.className).toEqual('navbar-collapse');
  });

});
