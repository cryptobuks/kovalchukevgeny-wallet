import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';

import Header from './../header/header';
import Navigation from './../navigation/navigation';
import Footer from './../../components/footer/footer.jsx';
import Button from './../../components/button/button.jsx';

class App extends Component {
  render() {
    const { user } = this.props;
    const pallet = user.settings.pallet;

    return (
      <div
        style={{
          backgroundColor: pallet.background,
          backgroundImage: `linear-gradient(to bottom right, ${pallet.startColor}, ${pallet.endColor})`,
        }}       
        className="App visible-menu"
      >
        <Header user={user} />
        <Navigation user={user} />
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
