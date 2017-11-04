import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';

import Header from './../header/header';
import Footer from './../../components/footer/footer.jsx';
import Button from './../../components/button/button.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {  
    if (nextProps.location.pathname === this.props.location.pathname || nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({ showMenu: false });
    }
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    const { showMenu } = this.state;
    const { user } = this.props;
    let pallet = user.settings.pallet;

    if (!pallet || !pallet.startColor || !pallet.endColor) {
      pallet = {
        name: 'volta',
        alias: 'volta',
        background: '#842448',
        startColor: '#c04848',
        endColor: '#480048',
      };
    }

    return (
      <div
        style={{
          backgroundColor: pallet.background,
          backgroundImage: `linear-gradient(to bottom right, ${pallet.startColor}, ${pallet.endColor})`,
        }}
        className={showMenu ? 'App visible-menu' : 'App'}
      >
        <Header />
        <Button
          specialClass="btn-primary btn showMenu"
          onClickFunction={this.toggleMenu}
          icon={showMenu ? 'clear' : 'menu'}
        />
        <ReduxToastr
          newestOnTop={false}
          preventDuplicates
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <div className="main">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  user: PropTypes.object,
};

export default connect(state => ({
  user: state.user,
}))(App);
