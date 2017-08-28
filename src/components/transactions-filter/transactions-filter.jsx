import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from './../../components/button/button.jsx';
import Input from './../../components/input/input.jsx';
import Icon from './../../components/icon/icon.jsx';
import Panel from './../../components/panel/panel.jsx';

import staticContent from './../../static-content/languages';

class TransactionsFilter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { categories, lang, isCategoryActive } = this.props;

    categories = categories.map((category, i) => {
      return(
        <div
          key={i}
          data-filter={category.title}
          className={classNames('category', {active: category.filter})}
          onClick={() => isCategoryActive(category)}
        >
          <Icon icon={category.filter ? 'check_box' : 'check_box_outline_blank'} />
          <span className="category-title">{category.title}</span>
        </div>
      );
    });

    return (
      <div className="filter">
        <div className="row">
          <div className="col-lg-12">
            <Panel heading={staticContent[lang]['transactions-filter'].head}>
              <div className="categories">
                {categories}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

TransactionsFilter.propTypes = {
  categories: PropTypes.array,
  lang: PropTypes.string
};

export default connect(state => ({
  categories: state.categories,
  lang: state.lang
}))(TransactionsFilter);
