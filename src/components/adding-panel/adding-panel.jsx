import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Button from './../../components/button/button.jsx';
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
    this.formatDate = this.formatDate.bind(this);
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
    })
  }

  formatDate(date) {
    let newDate = new Date(date)
    let dd = newDate.getDate();
    if (dd < 10) dd = '0' + dd;
    let mm = newDate.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    return `${dd}/${mm}/${newDate.getFullYear()}`;
  }

  handleChangeCategory(event) {
    this.setState({category: event.target.value});
  }

  handleChangeData(date) {
    this.setState({startDate: date});
  }

  handleChangeMoney(event) {
    this.setState({money: parseInt(event.target.value, 10)});
  }

  handleChangeTitle(event) {
    this.setState({transactionTitle: event.target.value});
  }

  sendTransaction() {
    const { category, money, startDate, transactionTitle } = this.state;
    const { addTransaction } = this.props;
    const date = this.formatDate(startDate)
    console.log(date);
    addTransaction(date, money, transactionTitle, category);
  }

  render() {

    let { category, money, startDate, transactionTitle } = this.state;

    return (
      <div className="panel panel-default adding-panel">
        <div className="panel-body">
          <form className="form-horizontal">
            <fieldset>
              <legend>Add new transaction</legend>
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
                <div className="col-lg-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="0.00"
                    value={money}
                    onChange={this.handleChangeMoney}
                  />
                </div>
                <div className="col-lg-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={transactionTitle}
                    onChange={this.handleChangeTitle}
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
