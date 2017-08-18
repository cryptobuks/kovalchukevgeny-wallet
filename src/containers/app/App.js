import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';

import Header from './../header/header';
import Footer from './../../components/footer/footer.jsx';

import api from './../../api/index';

const App = props => {
  const { children } = props;
  return (
    <div className="App">
      <Header />
      <ReduxToastr
        newestOnTop={false}
        preventDuplicates
        position="top-center"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
      <div className="main">
        {children}
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
