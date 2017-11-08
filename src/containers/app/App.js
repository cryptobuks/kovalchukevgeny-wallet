import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';

import Header from './../header/header';
import Footer from './../../components/footer/footer.jsx';
import Button from './../../components/button/button.jsx';

import { changeTheme } from './../../actions/actionCreators';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.changeTheme = this.changeTheme.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === this.props.location.pathname || nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({ showMenu: false });
    }
  }

  changeTheme(theme) {
    const { changeTheme, user } = this.props;
    if (theme !== user) {
      changeTheme(theme);
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
        <div className="change-theme-buttons-container">
          <div>
            <Button
              icon={'brightness_2'}
              onClickFunction={() => this.changeTheme('dark')}
            />
          </div>
          <div>
            <Button
              icon={'wb_sunny'}
              onClickFunction={() => this.changeTheme('light')}
            />
          </div>
        </div>

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

App.defaultProps = {
  user: {
    settings: {
      theme: 'dark',
    },
  },
  changeTheme: () => { },
};

App.propTypes = {
  changeTheme: PropTypes.func,
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  user: PropTypes.object,
};

export default connect(state => ({
  user: state.user,
}), { changeTheme })(App);
