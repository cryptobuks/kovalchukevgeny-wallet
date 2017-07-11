import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './../../components/button/button.jsx';
import Input from './../../components/input/input.jsx';
import IconSelect from './../../components/icon-select/icon-select.jsx';
import Icon from './../../components/icon/icon.jsx';
import { addCategory, deleteCategory } from './../../actions/actionCreators';

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
    let { categories } = this.props;

    categories = categories.map((category, i) => {
      return(
        <div key={i} className="category-card">
          <div className="panel panel-default category">
            <div className="panel-body" data-id={category.categoryId}>
              <div className="categ-icon">
                <Icon type="fa" icon={category.categoryIcon} />
              </div>
              <h5>{category.categoryTitle}</h5>
              <blockquote>
                <small><cite>{category.categoryDescription}</cite></small>
              </blockquote>
              <Button
                specialClass="close"
                onClickFunction={this.deleteCategory}
              >&times;</Button>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="categories">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-2">
                      <legend>New Category</legend>
                    </div>
                    <div className="col-lg-2">
                      <Input
                        placeholder="Category"
                        value={categoryTitle}
                        handleChange={this.handleChangeTitle}
                      />
                    </div>
                    <div className="col-lg-3">
                      <Input
                        placeholder="Small description"
                        value={categoryDescription}
                        handleChange={this.handleChangeDescription}
                      />
                    </div>
                    <div className="col-lg-2 text-right">
                      <IconSelect
                        onClickFunction={this.changeCategoryIcon}
                        defaultIcon={categoryIcon}
                      />
                    </div>
                    <div className="col-lg-3 text-right">
                      <Button
                        specialClass="btn btn-default"
                        onClickFunction={this.clearCategory}
                      >Cancel</Button>
                      <Button
                        specialClass="btn btn-primary"
                        onClickFunction={this.saveCategory}
                      >Submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="panel panel-primary categories-panel">
                <div className="panel-heading">
                  <h3 className="panel-title">Categories</h3>
                </div>
                <div className="panel-body">
                  <div className="categories-wrapper">
                    {categories}
                  </div>
                </div>
              </div>
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
  deleteCategory: PropTypes.func
};

export default connect(state => ({
  categories: state.categories
}), { addCategory, deleteCategory })(Categories);
