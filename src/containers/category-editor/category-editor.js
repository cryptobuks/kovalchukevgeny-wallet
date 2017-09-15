import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
import enhanceWithClickOutside from 'react-click-outside';
import { toastr } from 'react-redux-toastr';

import Panel from './../../components/panel/panel.jsx';
import Input from './../../components/input/input.jsx';
import IconSelect from './../../components/icon-select/icon-select.jsx';
import ColorSelect from './../../components/color-select/color-select.jsx';
import Button from './../../components/button/button.jsx';

import { updateCategory } from './../../actions/actionCreators.js';

import iconsArray from './../../components/icon-select/icons.js';
import colorsArray from './../../components/color-select/colors.js';

import staticContent from './../../static-content/languages';

class CategoryEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      title: '',
      icon: 'fa-car', // default icon
      color: '#b91919' // default color
    };

    this.changeCategoryIcon = this.changeCategoryIcon.bind(this);
    this.changeCategoryColor = this.changeCategoryColor.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  componentWillMount() {
    const { categories } = this.props;

    const category = categories.filter(category => {
      return category.id === +this.props.routeParams.id
    })[0];

    this.setState({
      id: category.id,
      description: category.description,
      title: category.title,
      icon: category.icon,
      color: category.color || '#b91919'
    });
  }

  changeCategoryIcon(icon) {
    this.setState({ icon: icon });
  }

  changeCategoryColor(color) {
    this.setState({ color: color });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  updateCategory() {
    const { id, description, title, icon, color } = this.state;
    const { updateCategory, categories } = this.props;

    updateCategory(id, description, title, icon, color);
    browserHistory.goBack();
    toastr.success('Category updated', { timeOut: 3000 });
  }

  render() {
    const { description, title, icon, color } = this.state;
    const { lang } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Panel
              specialClass="category-editor"
              heading={staticContent[lang]['category-editor'].head}
            >
              <div className="row">
                <div className="col-lg-3 col-md-2 col-sm-6">
                  <Input
                    placeholder={staticContent[lang]['category-editor'].category}
                    value={title}
                    handleChange={this.handleChangeTitle}
                  />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <Input
                    placeholder={staticContent[lang]['category-editor'].descr}
                    value={description}
                    handleChange={this.handleChangeDescription}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 text-right">
                  <IconSelect
                    onClickFunction={this.changeCategoryIcon}
                    defaultIcon={icon}
                    iconsArray={iconsArray}
                    lang={lang}
                  />
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6 text-right">
                  <ColorSelect
                    onClickFunction={this.changeCategoryColor}
                    defaultColor={color}
                    colorsArray={colorsArray}
                    lang={lang}
                  />
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 text-right">
                  <Button
                    specialClass="btn btn-primary"
                    onClickFunction={this.updateCategory}
                  >{staticContent[lang]['category-editor'].btnUpdate}</Button>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

CategoryEditor.defaultProps = {
  onClickFunction: () => {}
};

CategoryEditor.propTypes = {
  onClickFunction: PropTypes.func,
  lang: PropTypes.string
};

export default connect(state => ({
  categories: state.categories,
  lang: state.lang
}), { updateCategory })(enhanceWithClickOutside(CategoryEditor));