import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from './../../components/button/button.jsx';
import Input from './../../components/input/input.jsx';
import IconSelect from './../../components/icon-select/icon-select.jsx';
import Icon from './../../components/icon/icon.jsx';
import Panel from './../../components/panel/panel.jsx';

import { addCategory, deleteCategory } from './../../actions/actionCreators';

import iconsArray from './../../components/icon-select/icons.js';

import staticContent from './../../static-content/languages';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryDescription: '',
      categoryTitle: '',
      categoryIcon: 'fa-car' //default icon
    };

    this.changeCategoryIcon = this.changeCategoryIcon.bind(this);
    this.clearCategory = this.clearCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
  }

  changeCategoryIcon(icon) {
    this.setState({categoryIcon: icon});
  }

  clearCategory() {
    this.setState({
      categoryDescription: '',
      categoryTitle: ''
    });
  }

  deleteCategory(event) {
    const { deleteCategory } = this.props;
    const id = +event.target.parentNode.getAttribute('data-id');
    deleteCategory(id);
  }

  handleChangeDescription(event) {
    this.setState({categoryDescription: event.target.value});
  }

  handleChangeTitle(event) {
    this.setState({categoryTitle: event.target.value});
  }

  saveCategory() {
    const { categoryDescription, categoryTitle, categoryIcon } = this.state;
    const { addCategory } = this.props;
    const categoryId = (new Date()).getTime();
    addCategory(categoryId, categoryDescription, categoryTitle, categoryIcon);
    this.setState({
      categoryDescription: '',
      categoryTitle: ''
    });
  }

  render() {
    const { categoryDescription, categoryTitle, categoryIcon } = this.state;
    let { categories, lang } = this.props;

    categories = categories.map((category, i) => {
      return(
        <div key={i} className="category-card">
          <Panel specialClass="panel-default category">
            <div data-id={category.categoryId}>
              <div className="categ-icon">
                <Icon type="fa" icon={category.categoryIcon} />
              </div>
              <h5>{category.categoryTitle}</h5>
              {category.categoryDescription &&
                <blockquote>
                  <small><cite>{category.categoryDescription}</cite></small>
                </blockquote>
              }
              <Button
                specialClass="close"
                onClickFunction={this.deleteCategory}
              >&times;</Button>
            </div>
          </Panel>
        </div>
      );
    });

    return (
      <div className="categories">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Panel specialClass="panel-default">
                <div className="row">
                  <div className="col-lg-2 col-md-2">
                    <legend>{staticContent[lang]['adding-category'].head}</legend>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-6">
                    <Input
                      placeholder={staticContent[lang]['adding-category'].category}
                      value={categoryTitle}
                      handleChange={this.handleChangeTitle}
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6">
                    <Input
                      placeholder={staticContent[lang]['adding-category'].descr}
                      value={categoryDescription}
                      handleChange={this.handleChangeDescription}
                    />
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-6 text-right">
                    <IconSelect
                      onClickFunction={this.changeCategoryIcon}
                      defaultIcon={categoryIcon}
                      iconsArray={iconsArray}
                      lang={lang}
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-6 text-right">
                    <Button
                      specialClass="btn btn-default"
                      onClickFunction={this.clearCategory}
                    >{staticContent[lang]['adding-category'].btnCancel}</Button>
                    <Button
                      specialClass="btn btn-primary"
                      onClickFunction={this.saveCategory}
                    >{staticContent[lang]['adding-category'].btnSubmit}</Button>
                  </div>
                </div>
              </Panel>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
            {categories.length > 0 &&
              <Panel
                specialClass="panel-primary categories-panel"
                heading={staticContent[lang]['categories'].head}
              >
                <div className="categories-wrapper">
                  {categories}
                </div>
              </Panel>
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array,
  addCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
  lang: PropTypes.string
};

export default connect(state => ({
  categories: state.categories,
  lang: state.lang
}), { addCategory, deleteCategory })(Categories);
