import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Icon from './../icon/icon.jsx';
import Panel from './../panel/panel.jsx';
import Helpers from './../../helpers/Helpers';

class CurrencyRate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: []
    }

    this.Helpers = new Helpers();

    this.dataNormalize = this.dataNormalize.bind(this);
  }

  dataNormalize(data, prevRes) {
    let currencies = prevRes;

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

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  componentDidMount() {
    const { request, formatDateCurr } = this.Helpers;

    const today = formatDateCurr(moment());
    const yesterday = formatDateCurr(moment(), 'yest');

    let res = [];

    request({url: `http://www.nbrb.by/API/ExRates/Rates?onDate=${today}&Periodicity=0`})
    .then(data => {
        let currencies = JSON.parse(data);
        res = currencies.filter(currency => {
          return currency.Cur_ID === 145 || currency.Cur_ID === 292 || currency.Cur_ID === 298;
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
          currencies: this.dataNormalize(currencies, res)
        });
    })
    .catch(error => {
        console.log(error);
    });
  }

  render() {
    let { currencies } = this.state;

    currencies = currencies.map((currency, i) => {
      // Add icon for currency
      let iconCurr = '';
      switch(currency.Cur_ID) {
        case 145 : iconCurr = 'fa-usd'; break;
        case 292 : iconCurr = 'fa-eur'; break;
        default: iconCurr = 'fa-rub'; break;
      }
      // Add icon for currency arrow
      let iconArrow = '';
      iconArrow = currency.Cur_OfficialRate > currency.Cur_OfficialRateYest ?
      'fa-long-arrow-up' : 'fa-long-arrow-down';

      return(
        <tr key={i}>
          <td className="curr">
            <span>{currency.Cur_Abbreviation}</span>
            ({currency.Cur_Scale}<Icon type={'fa'} icon={iconCurr}/>)
          </td>
          <td>{currency.Cur_OfficialRateYest}</td>
          <td className="today">
            {currency.Cur_OfficialRate}
            <Icon type={'fa'} icon={iconArrow} />
          </td>
        </tr>
      );
    });

    return (
      <Panel
        specialClass="panel-success currency"
        heading="Currency courses"
      >
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
      </Panel>
    );
  }
}

CurrencyRate.propTypes = {

};

export default CurrencyRate;
