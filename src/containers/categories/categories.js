import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import Button from './../../components/button/button.jsx';
import Input from './../../components/input/input.jsx';
import IconSelect from './../../components/icon-select/icon-select.jsx';
import Icon from './../../components/icon/icon.jsx';
import Panel from './../../components/panel/panel.jsx';

import { addCategory, deleteCategory } from './../../actions/actionCreators';

import iconsArray from './../../components/icon-select/icons.js';

import staticContent from './../../static-content/languages';

import LoadingHOC from './../../HOC/loadingHOC.jsx';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      title: '',
      filter: true,
      icon: 'fa-car' //default icon
    };

    this.changeCategoryIcon = this.changeCategoryIcon.bind(this);
    this.clearCategory = this.clearCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
  }

  changeCategoryIcon(icon) {
    this.setState({icon: icon});
  }

  clearCategory() {
    this.setState({
      description: '',
      filter: true,
      title: ''
    });
  }

  deleteCategory(event) {
    const { deleteCategory, lang } = this.props;
    const id = +event.target.parentNode.getAttribute('data-id');
    toastr.confirm(staticContent[lang]['toastr'].categoryRemove,
      { onOk: () => {
        deleteCategory(id);
      }
    });
  }

  handleChangeDescription(event) {
    this.setState({description: event.target.value});
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  saveCategory() {
    const { description, title, icon, filter } = this.state;
    const { addCategory, lang } = this.props;
    const id = (new Date()).getTime();
    if(title.length < 2) {
      toastr.error(staticContent[lang]['toastr'].smallCategoryName, {timeOut: 4000});
    } else {
      addCategory(id, description, title, icon, filter);
      this.setState({
        description: '',
        filter: true,
        title: ''
      });
      toastr.success(staticContent[lang]['toastr'].categoryAdd, {timeOut: 4000});
    }
  }

  render() {
    const { description, title, icon } = this.state;
    let { categories, lang } = this.props;

    categories = categories.map((category, i) => {
      return(
        <div key={i} className="category-card">
          <Panel specialClass="panel-default category">
            <div data-id={category.id}>
              <div className="categ-icon">
                <Icon type="fa" icon={category.icon} />
              </div>
              <h5>{category.title}</h5>
              {category.description &&
                <blockquote>
                  <small><cite>{category.description}</cite></small>
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
                  <div className="col-lg-2 col-md-12">
                    <legend>{staticContent[lang]['adding-category'].head}</legend>
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-6">
                    <Input
                      placeholder={staticContent[lang]['adding-category'].category}
                      value={title}
                      handleChange={this.handleChangeTitle}
                    />
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <Input
                      placeholder={staticContent[lang]['adding-category'].descr}
                      value={description}
                      handleChange={this.handleChangeDescription}
                    />
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-6 text-right">
                    <IconSelect
                      onClickFunction={this.changeCategoryIcon}
                      defaultIcon={icon}
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
}), { addCategory, deleteCategory })(LoadingHOC('categories')(Categories));
