import React from 'react';
import PropTypes from 'prop-types';
import Header from './../../components/header/header';
import api from './../../api/index';

const App = props => {
  const { children } = props;
  return (
    <div className="App">
      <div className="main">
        <Header />
        {children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
