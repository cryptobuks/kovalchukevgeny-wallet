import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MetricsGraphics from 'react-metrics-graphics';
import Helpers from './../../helpers/Helpers';
import Panel from './../panel/panel.jsx';

import staticContent from './../../static-content/languages.json';

class TransactionsGraph extends Component {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();
  }

  render() {
    const { transactions, lang } = this.props;

    return (
      <Panel
        specialClass="panel-success"
        heading={staticContent[lang]['transactions-graph'].head}
      >
        <MetricsGraphics
          title={staticContent[lang]['transactions-graph'].smDescr}
          description={staticContent[lang]['transactions-graph'].bigDescr}
          data={this.Helpers.sumSameDateTransactions(transactions)}
          height={250}
          width={535}
          x_accessor="date"
          y_accessor="money"
          yax_units="BYR "
        />
      </Panel>
    );
  }
}

TransactionsGraph.defaultProps = {
  transactions: []
};

TransactionsGraph.propTypes = {
  transactions: PropTypes.array
};

export default TransactionsGraph;
