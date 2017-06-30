import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './../../components/button/button.jsx';

// XMLHttpRequest wrapper using callbacks
const request = obj => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
        if (obj.headers) {
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
};

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: []
    }
  }

  componentWillMount() {
    request({url: "http://www.nbrb.by/API/ExRates/Rates/Dynamics/145?startDate=2017-6-1&endDate=2017-6-29"})
    .then(data => {
        let currency = JSON.parse(data);
        this.setState({currency})
    })
    .catch(error => {
        console.log(error);
    });
  }

  render() {

    let curr = this.state.currency.map((item, i) => {
      return(
        <tr key={i}>
          <td className="mdl-data-table__cell--non-numeric">{item.Cur_OfficialRate}</td>
          <td className="">{item.Date}</td>
        </tr>
      );
    });

    return (
      <div className="categories">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
              <thead>
                <tr>
                  <th className="mdl-data-table__cell--non-numeric">Material</th>
                  <th>Quantity</th>
                  <th>Unit price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
                  <td>25</td>
                  <td>$2.90</td>
                </tr>
                <tr>
                  <td className="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
                  <td>50</td>
                  <td>$1.25</td>
                </tr>
                <tr>
                  <td className="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
                  <td>10</td>
                  <td>$2.35</td>
                </tr>
              </tbody>
            </table>
            <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
              <thead>
                <tr>
                  <th className="mdl-data-table__cell--non-numeric">USD</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {curr}
              </tbody>
            </table>
            <Button
              specialClass={'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'}
            ><i className="material-icons">add</i>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Categories.propTypes = {

};

export default Categories;
