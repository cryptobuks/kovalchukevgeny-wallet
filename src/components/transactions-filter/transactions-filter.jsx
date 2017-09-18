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
    let { updateCategory } = this.props;
    let { id, description, title, icon, filter, color } = category;
    filter = !filter;
    updateCategory(id, description, title, icon, filter, color);
  }

  render() {
    let { categories, lang } = this.props;

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
      <Panel
        specialClass="filter"
        heading={staticContent[lang]['transactions-filter'].head}
        headingIcon="filter_list"
      >
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
    );
  }
}

TransactionsFilter.defaultProps = {
  categories: [],
  lang: 'eng',
  isCategoryActive: () => {}
};

TransactionsFilter.propTypes = {
  categories: PropTypes.array,
  lang: PropTypes.string,
  isCategoryActive: PropTypes.func
};

export default TransactionsFilter;
