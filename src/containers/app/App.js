import React from 'react';
import PropTypes from 'prop-types';
import Header from './../header/header';
import Footer from './../footer/footer';
import api from './../../api/index';

const App = props => {
  const { children } = props;
  return (
    <div className="App">
      <Header />
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
