import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from './../../components/button/button.jsx';
import Input from './../../components/input/input.jsx';
import Icon from './../../components/icon/icon.jsx';
import Panel from './../../components/panel/panel.jsx';
import ButtonToolbar from './../button-toolbar/button-toolbar.jsx';
import ListGroup from './../list-group/list-group.jsx';
import ListGroupItem from './../list-group-item/list-group-item.jsx';

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
    let { id, title, icon, filter, color } = category;
    filter = !filter;
    updateCategory(id, title, icon, filter, color);
  }

  render() {
    let { categories, lang, theme } = this.props;

    categories = categories.map((category, i) => {
      return(
        <ListGroupItem
          key={i}
          data-filter={category.title}
          className={classNames(`list-group-item category ${theme}`, {active: category.filter})}
          onClick={() => this.isCategoryActive(category)}
        >
          <Icon icon={category.filter ? 'check_box' : 'check_box_outline_blank'} />
          <span className="category-title">{category.id !== 1 ? category.title : staticContent[lang].defaultCategory}</span>
        </ListGroupItem>
      );
    });

    return (
      <Panel
        specialClass={`filter ${theme}`}
        heading={staticContent[lang]['transactions-filter']['head']}
        headingIcon="filter_list"
      >
        <ButtonToolbar>
          <Button
            onClickFunction={this.selectAll}
            specialClass="btn btn-primary"
            icon="done_all"
          >{staticContent[lang]['transactions-filter']['btnSelect']}</Button>
        </ButtonToolbar>
        <ListGroup specialClass="categories">
          {categories}
        </ListGroup>
      </Panel>
    );
  }
}

TransactionsFilter.defaultProps = {
  categories: [],
  lang: 'eng',
  isCategoryActive: () => {},
  theme: 'dark',
};

TransactionsFilter.propTypes = {
  categories: PropTypes.array,
  lang: PropTypes.string,
  theme: PropTypes.string,
  isCategoryActive: PropTypes.func
};

export default TransactionsFilter;
