import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './../../components/button/button';

class Categories extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
