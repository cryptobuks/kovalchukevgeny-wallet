import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Button from './../../components/button/button.jsx';
import Input from './../../components/input/input.jsx'
import { addTransaction } from './../../actions/actionCreators';

import './../../styles/vendor/datepicker/react-datepicker.scss';

class AddingPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      money: '',
      startDate: moment(),
      transactionTitle: ''
    };

    this.clearTransactionData = this.clearTransactionData.bind(this);
    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeMoney = this.handleChangeMoney.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
  }

  clearTransactionData() {
    this.setState({
      category: '',
      money: '',
      startDate: moment(),
      transactionTitle: ''
    });
  }

  handleChangeCategory(event) {
    this.setState({category: event.target.value});
  }

  handleChangeData(date) {
    this.setState({startDate: date});
  }

  handleChangeMoney(event) {
    this.setState({money: event.target.value});
  }

  handleChangeTitle(event) {
    this.setState({transactionTitle: event.target.value});
  }

  sendTransaction() {
    const { category, money, startDate, transactionTitle } = this.state;
    const { addTransaction } = this.props;
    addTransaction(startDate, money, transactionTitle, category);
    this.setState({
      category: '',
      money: '',
      startDate: moment(),
      transactionTitle: ''
    });
  }

  render() {

    let { category, money, startDate, transactionTitle } = this.state;

    return (
      <div className="panel panel-default adding-panel">
        <div className="panel-body">
          <form className="form-horizontal">
            <fieldset>
              <div className="row">
                <div className="col-lg-10">
                  <legend>Add new transaction</legend>
                </div>
                <div className="col-lg-2">
                  <Button
                    specialClass="btn btn-danger"
                    onClickFunction={this.clearTransactionData}
                  >Cancel</Button>
                  <Button
                    specialClass="btn btn-success"
                    onClickFunction={this.sendTransaction}
                  >Submit</Button>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <DatePicker
                    placeholderText="Click to select a date"
                    locale="en-gb"
                    className="form-control"
                    selected={this.state.startDate}
                    onChange={this.handleChangeData}
                  />
                </div>
                <div className="col-lg-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={money}
                    handleChange={this.handleChangeMoney}
                  />
                </div>
                <div className="col-lg-6">
                  <Input
                    placeholder="Description"
                    value={transactionTitle}
                    handleChange={this.handleChangeTitle}
                  />
                </div>
                <div className="col-lg-2">
                  <select
                    className="form-control"
                    value={this.state.category}
                    onChange={this.handleChangeCategory}
                  >
                    <option value="Home">Home</option>
                    <option value="Shop">Shop</option>
                    <option value="Subscribes">Subscribes</option>
                    <option value="Internet">Internet</option>
                  </select>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

AddingPanel.propTypes = {

};

export default connect(state => ({
  transactions: state.transactions,
}), { addTransaction })(AddingPanel);
