import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Helpers from './../../helpers/Helpers';
import Icon from './../../components/icon/icon.jsx';

class CurrencyRate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: []
    }

    this.Helpers = new Helpers();

    this.dataNormalize = this.dataNormalize.bind(this);
  }

  dataNormalize(data) {
    let currencies = this.state.currencies;

    currencies = currencies.map(currency => {
      for(let i = 0; i < data.length; i++) {
        if(currency.Cur_ID === data[i].Cur_ID) {
          currency.Cur_OfficialRateYest = data[i].Cur_OfficialRate
        }
      }
      return currency;
    });

    return currencies;
  }

  componentWillMount() {
    const { request, formatDateCurr } = this.Helpers;

    const today = formatDateCurr(moment());
    const yesterday = formatDateCurr(moment(), 'yest');

    request({url: `http://www.nbrb.by/API/ExRates/Rates?onDate=${today}&Periodicity=0`})
    .then(data => {
        let currencies = JSON.parse(data);
        currencies = currencies.filter(currency => {
          return currency.Cur_ID === 145 || currency.Cur_ID === 292 || currency.Cur_ID === 298;
        });
        this.setState({
          currencies: currencies
        });
    })
    .catch(error => {
        console.log(error);
    });

    request({url: `http://www.nbrb.by/API/ExRates/Rates?onDate=${yesterday}&Periodicity=0`})
    .then(data => {
        let currencies = JSON.parse(data);
        currencies = currencies.filter(currency => {
          return currency.Cur_ID === 145 || currency.Cur_ID === 292 || currency.Cur_ID === 298;
        });
        this.setState({
          currencies: this.dataNormalize(currencies)
        });
    })
    .catch(error => {
        console.log(error);
    });
  }

  render() {
    let { currencies } = this.state;

    currencies = currencies.map((currency, i) => {
      return(
        <tr key={i}>
          <td>{currency.Cur_Abbreviation}</td>
          <td>{currency.Cur_OfficialRateYest}</td>
          <td>{currency.Cur_OfficialRate}</td>
        </tr>
      );
    });

    return (
      <div className="panel panel-success currency">
        <div className="panel-heading">
          <h3 className="panel-title">Currency courses</h3>
        </div>
        <div className="panel-body">
          <table className="table table-striped table-hover ">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Yesterday</th>
                <th>Today</th>
              </tr>
            </thead>
            <tbody>
              {currencies}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

CurrencyRate.propTypes = {

};

export default CurrencyRate;
