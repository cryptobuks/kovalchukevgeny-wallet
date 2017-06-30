import React from 'react';
import PropTypes from 'prop-types';
import Header from './../header/header';
import Footer from './../footer/footer';
import api from './../../api/index';

const App = props => {
  const { children } = props;
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        {children}     
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
