import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router';

import Button from './../../components/button/button.jsx';
import Input from './../../components/input/input.jsx';
import IconSelect from './../../components/icon-select/icon-select.jsx';
import ColorSelect from './../../components/color-select/color-select.jsx';
import Icon from './../../components/icon/icon.jsx';
import Panel from './../../components/panel/panel.jsx';
import ButtonToolbar from './../../components/button-toolbar/button-toolbar.jsx';

import { addCategory, deleteCategory } from './../../actions/actionCreators';

import iconsArray from './../../components/icon-select/icons.js';
import colorsArray from './../../components/color-select/colors.js';

import staticContent from './../../static-content/languages';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      title: '',
      filter: true,
      icon: 'fa-car', // default icon
      color: '#b91919' // default color
    };

    this.changeCategoryIcon = this.changeCategoryIcon.bind(this);
    this.changeCategoryColor = this.changeCategoryColor.bind(this);
    this.clearCategory = this.clearCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.renderCategoryCard = this.renderCategoryCard.bind(this);
  }

  changeCategoryIcon(icon) {
    this.setState({ icon });
  }

  changeCategoryColor(color) {
    this.setState({ color });
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
    toastr.confirm(staticContent[lang]['toastr'].categoryRemove, { onOk: () => deleteCategory(id) });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  saveCategory() {
    const { description, title, icon, filter, color } = this.state;
    const { addCategory, lang } = this.props;
    const id = Date.now();

    if(title.length < 2) {
      toastr.error(staticContent[lang]['toastr'].smallCategoryName, {timeOut: 4000});
    } else {
      addCategory(id, description, title, icon, filter, color);
      this.setState({
        description: '',
        filter: true,
        title: ''
      });
      toastr.success(staticContent[lang]['toastr'].categoryAdd, {timeOut: 4000});
    }
  }

  renderCategoryCard(categories) {
    const { lang } = this.props;

    return categories.map((category, i) => {
      const categoryColor = category.color ? category.color : '#33373e';

      return (
        <div key={i} className="category-card">
          <Panel specialClass="category">
            <div data-id={category.id}>
              <div className="categ-icon" style={{backgroundColor: categoryColor}}>
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
                icon="clear"
              />
              <ButtonToolbar>
                <Link
                  className="edit btn-primary btn"
                  to={`/categories/${category.id}`}
                >
                  <Icon icon={'create'} />
                  {staticContent[lang]['categories'].btnEdit}
                </Link>
              </ButtonToolbar>
            </div>
          </Panel>
        </div>
      );
    });
  }

  render() {
    const { description, title, icon, color } = this.state;
    const { categories, lang } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Panel specialClass="categories">
              <div className="row">
                <div className="col-lg-12">
                  <legend>{staticContent[lang]['adding-category'].head}</legend>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6">
                  <Input
                    placeholder={staticContent[lang]['adding-category'].category}
                    value={title}
                    handleChange={this.handleChangeTitle}
                  />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <Input
                    placeholder={staticContent[lang]['adding-category'].descr}
                    value={description}
                    handleChange={this.handleChangeDescription}
                  />
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 text-right">
                  <IconSelect
                    onClickFunction={this.changeCategoryIcon}
                    defaultIcon={icon}
                    iconsArray={iconsArray}
                    lang={lang}
                  />
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 text-right">
                  <ColorSelect
                    onClickFunction={this.changeCategoryColor}
                    defaultColor={color}
                    colorsArray={colorsArray}
                    lang={lang}
                  />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 text-right">
                  <ButtonToolbar>
                    <Button
                      specialClass="btn btn-primary"
                      onClickFunction={this.saveCategory}
                      icon="save"
                    >{staticContent[lang]['adding-category'].btnSubmit}</Button>
                    <Button
                      specialClass="btn btn-default"
                      onClickFunction={this.clearCategory}
                      icon="undo"
                    >{staticContent[lang]['adding-category'].btnCancel}</Button>
                  </ButtonToolbar>
                </div>
              </div>
            </Panel>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            {categories.length > 0 &&
            <Panel
              specialClass="categories-panel"
              heading={staticContent[lang]['categories'].head}
              headingIcon="work"
            >
              <div className="categories-wrapper">
                {this.renderCategoryCard(categories)}
              </div>
            </Panel>
            }
          </div>
        </div>
      </div>
    );
  }
}

Categories.defaultProps = {
  lang: 'eng',
  categories: [],
  transactions: [],
  addCategory: () => {},
  deleteCategory: () => {}
};

Categories.propTypes = {
  addCategory: PropTypes.func,
  categories: PropTypes.array,
  deleteCategory: PropTypes.func,
  lang: PropTypes.string
};

export default connect(state => ({
  categories: state.categories,
  lang: state.lang
}), { addCategory, deleteCategory })(Categories);
