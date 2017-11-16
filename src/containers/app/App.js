import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';

import Header from './../header/header';
import Navigation from './../navigation/navigation';
import Footer from './../../components/footer/footer.jsx';

const App = props => {
  const { user } = props;
  const { pallet, theme } = user.settings;

  return (
    <div
      style={{
        backgroundColor: pallet.background,
        backgroundImage: `linear-gradient(to bottom right, ${pallet.startColor}, ${pallet.endColor})`,
      }}
      className={`App ${pallet.alias}`}
    >
      <Header user={user} />
      <Navigation user={user} />
      <ReduxToastr
        newestOnTop={false}
        preventDuplicates
        position="top-center"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        className={theme}
      />
      <div className="main">
        {props.children}
      </div>
      <Footer user={user} />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object,
};

export default connect(state => ({
  user: state.user,
}))(App);
