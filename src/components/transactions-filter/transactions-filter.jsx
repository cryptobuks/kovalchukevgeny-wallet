import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from './../../components/button/button.jsx';
import Input from './../../components/input/input.jsx';
import Icon from './../../components/icon/icon.jsx';
import Panel from './../../components/panel/panel.jsx';

import staticContent from './../../static-content/languages';

class TransactionsFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectAll: false
    }

    this.isCategoryActive = this.isCategoryActive.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }

  selectAll() {
    let { categories, changeAllCategories } = this.props;
    categories = categories.map(category => {
      category.filter = this.state.selectAll
      return category;
    });
    changeAllCategories(categories);
    this.setState({ selectAll: !this.state.selectAll });
  }

  isCategoryActive(category) {
    let { changeCategory } = this.props;
    let { id, description, title, icon, filter } = category;
    filter = !filter;
    changeCategory(id, description, title, icon, filter);
  }

  render() {
    let { categories, lang, changeCategory } = this.props;

    categories = categories.map((category, i) => {
      return(
        <div
          key={i}
          data-filter={category.title}
          className={classNames('category', {active: category.filter})}
          onClick={() => this.isCategoryActive(category)}
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
              <div className="toolbar">
                <Button
                  onClickFunction={this.selectAll}
                  specialClass="btn btn-primary"
                >
                  <Icon icon={'done_all'} />
                  {staticContent[lang]['transactions-filter'].btnSelect}
                </Button>
              </div>
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
  lang: PropTypes.string,
  isCategoryActive: PropTypes.func
};

export default TransactionsFilter;
