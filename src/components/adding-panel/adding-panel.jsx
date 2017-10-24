import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import ReactAutocomplete from 'react-autocomplete';
import classNames from 'classnames';

import Button from './../button/button.jsx';
import Input from './../input/input.jsx';
import Panel from './../panel/panel.jsx';
import ButtonToolbar from './../button-toolbar/button-toolbar.jsx';

import Helpers from './../../helpers/Helpers';

import { addTransaction } from './../../actions/actionCreators';

import './../../styles/vendor/datepicker/react-datepicker.scss';

import staticContent from './../../static-content/languages';

class AddingPanel extends PureComponent {
  constructor(props) {
    super(props);

    this.Helpers = new Helpers();

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
    this.props.hideAddingPanel();
  }

  componentWillMount() {
    this.setState({ category: this.setDefaultCategory() });
  }

  handleChangeCategory(event) {
    this.setState({ category: event.target.value });
  }

  handleChangeData(date) {
    this.setState({ date });
  }

  handleChangeMoney(event) {
    this.setState({ money: +event.target.value });
  }

  setDefaultCategory() {
    const category = this.props.categories[0];
    return category ? category.id : '';
  }

  saveTransaction() {
    const { addTransaction, lang, hideAddingPanel, categories } = this.props;
    const id = Date.now();
    let { category, money, date, description } = this.state;

    if(+money === 0 || money === null || money === '' || money === undefined) {
      toastr.error(staticContent[lang]['toastr']['smallTransValue'], {timeOut: 4000});
    } else if(description !== '' && description.length < 2) {
      toastr.error(staticContent[lang]['toastr']['smallTransDescr'], {timeOut: 4000});
    } else if(categories.length === 0) {
      toastr.error(staticContent[lang]['description'], {timeOut: 4000});
    } else {
      addTransaction(id, date, money, description, +category);
      this.setState({
        category: this.setDefaultCategory(),
        money: '',
        date: moment(),
        description: ''
      });
      hideAddingPanel();
    }
  }

  render() {
    const { category, money, date, description } = this.state;
    let { categories, lang, transactions, showPanel } = this.props;

    categories = categories.map((category, i) => {
      return (
        <option key={i} value={category.id}>{category.title}</option>
      );
    });

    return (
      <div className={classNames('adding-panel-wrapper', {'hidden' : !showPanel})}>
        <Panel
          specialClass="adding-panel dark"
          heading={staticContent[lang]['adding-panel']['head']}
        >
          <div className="form-item">
            <label className="label">{staticContent[lang]['adding-panel']['dateLabel']}</label>
            <DatePicker
              locale="en-gb"
              className="form-control"
              maxDate={moment()}
              selected={date}
              onChange={this.handleChangeData}
            />
          </div>
          <div className="form-item">
            <label className="label">{staticContent[lang]['adding-panel']['moneyLabel']}</label>
            <Input
              type="number"
              placeholder="0.00"
              value={money}
              handleChange={this.handleChangeMoney}
            />
          </div>
          <div className="autocomplete form-item">
            <label className="label">{staticContent[lang]['adding-panel']['descrLabel']}</label>
            <ReactAutocomplete
              items={this.Helpers.getUnicDescription(transactions)}
              shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.label}
              renderItem={(item, highlighted) =>
                <div
                  key={item.label}
                  style={{ backgroundColor: highlighted ? '#eee' : '#fff'}}
                >
                  {item.label}
                </div>
              }
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
              onSelect={value => this.setState({ description: value })}
            />
          </div>
          {categories.length > 0 &&
          <div className="form-item">
            <label className="label">{staticContent[lang]['adding-panel'].categoryLabel}</label>
            <select
              className="form-control"
              value={this.state.category}
              onChange={this.handleChangeCategory}
            >
              {categories}
            </select>
          </div>
          }
          <ButtonToolbar specialClass="text-center">
            <Button
              specialClass="btn btn-primary"
              onClickFunction={this.saveTransaction}
              icon="save"
            >{staticContent[lang]['adding-panel']['btnSubmit']}</Button>
            <Button
              specialClass="btn btn-default"
              onClickFunction={this.clearTransactionData}
              icon="undo"
            >{staticContent[lang]['adding-panel']['btnCancel']}</Button>
          </ButtonToolbar>
        </Panel>
      </div>
    );
  }
}

AddingPanel.defaultProps = {
  categories: [],
  lang: 'eng',
  hideAddingPanel: () => {},
  showPanel: () => {}
};

AddingPanel.propTypes = {
  categories: PropTypes.array,
  lang: PropTypes.string,
  hideAddingPanel: PropTypes.func,
  showPanel: PropTypes.bool
};

export default AddingPanel;
