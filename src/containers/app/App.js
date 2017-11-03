import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    if (nextProps.user == this.props.user) {
      this.setState({ showMenu: !(nextProps.location !== this.props.location) });
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
    return (
      <div className={showMenu ? 'App visible-menu' : 'App'}>
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
    }
  },
  changeTheme: () => { },
};

App.propTypes = {
  changeTheme: PropTypes.func,
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
};

export default connect(state => ({
  user: state.user,
}), { changeTheme })(App);

// export default App;
