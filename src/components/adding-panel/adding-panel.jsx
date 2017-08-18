import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';

import Button from './../button/button.jsx';
import Input from './../input/input.jsx';
import Panel from './../panel/panel.jsx';

import { addTransaction } from './../../actions/actionCreators';

import './../../styles/vendor/datepicker/react-datepicker.scss';

import staticContent from './../../static-content/languages';

class AddingPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      money: '',
      date: moment(),
      description: ''
    };

    this.clearTransactionData = this.clearTransactionData.bind(this);
    this.handleChangeData = this.handleChangeData.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeMoney = this.handleChangeMoney.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.setDefaultCategory = this.setDefaultCategory.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
  }

  clearTransactionData() {
    this.setState({
      category: this.setDefaultCategory(),
      money: '',
      date: moment(),
      description: ''
    });
  }

  componentWillMount() {
    this.setState({category: this.setDefaultCategory()});
  }

  handleChangeCategory(event) {
    this.setState({category: event.target.value});
  }

  handleChangeData(date) {
    this.setState({date: date});
  }

  handleChangeMoney(event) {
    this.setState({money: event.target.value});
  }

  handleChangeTitle(event) {
    this.setState({description: event.target.value});
  }

  setDefaultCategory() {
    const category = this.props.categories[0];
    return category ? category.title : '';
  }

  saveTransaction() {
    const { category, money, date, description } = this.state;
    const { addTransaction, lang } = this.props;
    const id = Date.now();
    if(+money === 0 || money === null || money === '' || money === undefined) {
      toastr.error(staticContent[lang]['toastr'].smallTransValue, {timeOut: 4000});
    } else if(description.length < 2) {
      toastr.error(staticContent[lang]['toastr'].smallTransDescr, {timeOut: 4000});
    } else {
      addTransaction(id, date, +money, description, category);
      this.setState({
        category: this.setDefaultCategory(),
        money: '',
        date: moment(),
        description: ''
      });
    }
  }

  render() {
    const { category, money, date, description } = this.state;
    let { categories, lang } = this.props;

    categories = categories.map((category, i) => {
      return(
        <option key={i} value={category.title}>{category.title}</option>
      );
    });

    return (
      <Panel
        specialClass="panel-default adding-panel"
      >
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <legend>{staticContent[lang]['adding-panel'].head}</legend>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 text-right">
            <Button
              specialClass="btn btn-default"
              onClickFunction={this.clearTransactionData}
            >{staticContent[lang]['adding-panel'].btnCancel}</Button>
            <Button
              specialClass="btn btn-primary"
              onClickFunction={this.saveTransaction}
            >{staticContent[lang]['adding-panel'].btnSubmit}</Button>
          </div>
        </div>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <DatePicker
                  locale="en-gb"
                  className="form-control"
                  maxDate={moment()}
                  selected={date}
                  onChange={this.handleChangeData}
                />
              </td>
              <td>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={money}
                  handleChange={this.handleChangeMoney}
                />
              </td>
              <td>
                <Input
                  placeholder={staticContent[lang]['adding-panel'].descr}
                  value={description}
                  handleChange={this.handleChangeTitle}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  value={this.state.category}
                  onChange={this.handleChangeCategory}
                >
                  {categories}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </Panel>
    );
  }
}

AddingPanel.propTypes = {
  categories: PropTypes.array,
  lang: PropTypes.string
};

export default AddingPanel;
