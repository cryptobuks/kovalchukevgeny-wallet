import React, { Component } from 'react';
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
    this.setState({ showMenu: !(nextProps.location !== this.props.location) });
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    const { showMenu } = this.state;
    return (
      <div className={showMenu ? 'App visible-menu' : 'App'}>
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
};

export default App;
