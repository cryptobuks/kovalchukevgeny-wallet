import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router';
import classNames from 'classnames';

import Button from './../../components/button/button.jsx';
import Input from './../../components/input/input.jsx';
import IconSelect from './../../components/icon-select/icon-select.jsx';
import ColorSelect from './../../components/color-select/color-select.jsx';
import Icon from './../../components/icon/icon.jsx';
import Panel from './../../components/panel/panel.jsx';
import ButtonToolbar from './../../components/button-toolbar/button-toolbar.jsx';
import Container from './../../components/container/container.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';

import { addCategory, deleteCategory } from './../../actions/actionCreators';

import iconsArray from './../../components/icon-select/icons.js';
import colorsArray from './../../components/color-select/colors.js';

import staticContent from './../../static-content/languages';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      filter: true,
      categoriesView: 'grid',
      icon: 'fa-car', // default icon
      color: '#b91919', // default color
    };

    this.setViewGrid = this.setViewGrid.bind(this);
    this.setViewList = this.setViewList.bind(this);
    this.changeCategoryIcon = this.changeCategoryIcon.bind(this);
    this.changeCategoryColor = this.changeCategoryColor.bind(this);
    this.clearCategory = this.clearCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.renderCategoryCard = this.renderCategoryCard.bind(this);
  }

  setViewGrid() {
    this.setState({ categoriesView: 'grid' });
  }

  setViewList() {
    this.setState({ categoriesView: 'list' });
  }

  saveCategory() {
    const { title, icon, filter, color } = this.state;
    const { user, addCategory } = this.props;
    const id = Date.now();
    const lang = user.settings.lang;

    if (title.length < 2) {
      toastr.error(staticContent[lang].toastr.smallCategoryName, { timeOut: 4000 });
    } else {
      addCategory(id, title, icon, filter, color);
      this.setState({
        filter: true,
        title: '',
      });
      toastr.success(staticContent[lang].toastr.categoryAdd, { timeOut: 4000 });
    }
  }

  changeCategoryColor(color) {
    this.setState({ color });
  }

  changeCategoryIcon(icon) {
    this.setState({ icon });
  }

  clearCategory() {
    this.setState({
      filter: true,
      title: '',
    });
  }

  createDefaultCategory() {
    const { addCategory } = this.props;
    const defaultCategory = {
      id: 1,
      title: '',
      icon: '',
      filter: true,
    };
    addCategory(defaultCategory.id, defaultCategory.title, defaultCategory.icon, defaultCategory.filter);
  }

  deleteCategory(event) {
    const { categories, user, deleteCategory, transactions } = this.props;
    const lang = user.settings.lang;
    const id = +event.target.parentNode.parentNode.parentNode.getAttribute('data-id');
    toastr.confirm(staticContent[lang].toastr.categoryRemove, { onOk: () => deleteCategory(id) });
    transactions.forEach(transaction => {
      const currentTransaction = transaction;

      if (currentTransaction.category === id) {
        currentTransaction.category = 1;
      }
    });

    if (!categories.find(category => category.id === 1)) {
      this.createDefaultCategory();
    }
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  renderCategoryCard(categories) {
    const { user } = this.props;

    return categories.map((category, i) => {
      const categoryColor = category.color ? category.color : '#33373e';

      if (category.id !== 1) {
        return (
          <div key={i} className="category-card">
            <Panel specialClass={`category ${user.settings.theme}`}>
              <div data-id={category.id}>
                <div className="categ-icon" style={{ backgroundColor: categoryColor }}>
                  <Icon type="fa" icon={category.icon} />
                </div>
                <h5>{category.title}</h5>
                <ButtonToolbar>
                  <Link
                    className="edit btn-primary btn"
                    to={`/categories/${category.id}`}
                  >
                    <Icon icon={'create'} />
                  </Link>
                  <Button
                    specialClass="btn-primary btn dark"
                    onClickFunction={this.deleteCategory}
                    icon="clear"
                  />
                </ButtonToolbar>
              </div>
            </Panel>
          </div>
        );
      }
      return '';
    });
  }

  render() {
    const { title, icon, color, categoriesView } = this.state;
    const { categories, user } = this.props;
    const { theme, lang } = user.settings;

    return (
      <Container>
        <Row>
          <Col lg={12}>
            <Panel specialClass={`categories ${theme}`}>
              <Row>
                <Col lg={2} md={2} sm={6}>
                  <legend>{staticContent[lang]['adding-category'].head}</legend>
                </Col>
                <Col lg={2} md={2} sm={6}>
                  <Input
                    specialClass={theme}
                    placeholder={staticContent[lang]['adding-category'].category}
                    value={title}
                    handleChange={this.handleChangeTitle}
                  />
                </Col>
                <Col lg={2} md={2} sm={6} specialClass="text-right">
                  <IconSelect
                    onClickFunction={this.changeCategoryIcon}
                    defaultIcon={icon}
                    iconsArray={iconsArray}
                    lang={lang}
                    theme={theme}
                  />
                </Col>
                <Col lg={2} md={2} sm={6} specialClass="text-right">
                  <ColorSelect
                    onClickFunction={this.changeCategoryColor}
                    defaultColor={color}
                    colorsArray={colorsArray}
                    lang={lang}
                    theme={theme}
                  />
                </Col>
                <Col lg={4} md={4} sm={6} specialClass="text-right">
                  <ButtonToolbar>
                    <Button
                      specialClass="btn btn-primary"
                      onClickFunction={this.saveCategory}
                      icon="save"
                    >{staticContent[lang]['adding-category'].btnSubmit}</Button>
                    <Button
                      specialClass="btn btn-primary dark"
                      onClickFunction={this.clearCategory}
                      icon="undo"
                    >{staticContent[lang]['adding-category'].btnCancel}</Button>
                  </ButtonToolbar>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            {categories.length > 0 &&
              <Panel
                specialClass={`categories-panel ${theme}`}
                heading={staticContent[lang].categories.head}
                headingIcon="work"
              >
                <div className="categoriesView">
                  <ButtonToolbar>
                    <Button
                      specialClass={this.state.categoriesView === 'list' ? 'btn btn-primary active' : 'btn btn-primary'}
                      onClickFunction={this.setViewList}
                      icon="view_list"
                    />
                    <Button
                      specialClass={this.state.categoriesView === 'grid' ? 'btn btn-primary active' : 'btn btn-primary'}
                      onClickFunction={this.setViewGrid}
                      icon="view_module"
                    />
                  </ButtonToolbar>
                </div>
                <div className={classNames('categories-wrapper', categoriesView)}>
                  {this.renderCategoryCard(categories)}
                </div>
              </Panel>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

Categories.defaultProps = {
  categories: [],
  transactions: [],
  addCategory: () => { },
  deleteCategory: () => { },
};

Categories.propTypes = {
  addCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
  categories: PropTypes.array,
  transactions: PropTypes.array,
  user: PropTypes.object,
};

export default connect(state => ({
  categories: state.categories,
  transactions: state.transactions,
  user: state.user,
}), { addCategory, deleteCategory })(Categories);
