import React from 'react';
import PropTypes from 'prop-types';
import CurrencyRate from './../../components/currency-rate/currency-rate.jsx';

const Home = () => {
  return (
    <div className="widgets">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <CurrencyRate />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {

};

export default Home;
