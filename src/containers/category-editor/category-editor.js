import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import enhanceWithClickOutside from 'react-click-outside';
import { toastr } from 'react-redux-toastr';

import Panel from './../../components/panel/panel.jsx';
import Input from './../../components/input/input.jsx';
import IconSelect from './../../components/icon-select/icon-select.jsx';
import ColorSelect from './../../components/color-select/color-select.jsx';
import Button from './../../components/button/button.jsx';
import ButtonToolbar from './../../components/button-toolbar/button-toolbar.jsx';
import Container from './../../components/container/container.jsx';
import Row from './../../components/row/row.jsx';
import Col from './../../components/col/col.jsx';

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
      color: '#b91919', // default color
    };

    this.changeCategoryIcon = this.changeCategoryIcon.bind(this);
    this.changeCategoryColor = this.changeCategoryColor.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
  }

  componentWillMount() {
    const { categories } = this.props;
    const category = categories.find(categoryItem => categoryItem.id === +this.props.routeParams.id);

    this.setState({
      id: category.id,
      description: category.description,
      title: category.title,
      icon: category.icon,
      filter: category.filter,
      color: category.color || '#b91919',
    });
  }

  changeCategoryIcon(icon) {
    this.setState({ icon });
  }

  changeCategoryColor(color) {
    this.setState({ color });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  updateCategory() {
    const { id, description, title, icon, filter, color } = this.state;
    const { user, updateCategory } = this.props;
    const lang = user.settings.lang;
    updateCategory(id, description, title, icon, filter, color);
    browserHistory.goBack();
    toastr.success(staticContent[lang].toastr.categoryUpdated, { timeOut: 3000 });
  }

  render() {
    const { description, title, icon, color } = this.state;
    const { user } = this.props;
    const lang = user.settings.lang;

    return (
      <Container>
        <Row>
          <Col lg={12}>
            <Panel
              specialClass="category-editor dark"
              heading={staticContent[lang]['category-editor'].head}
              headingIcon="settings"
            >
              <Row>
                <Col lg={3} md={2} sm={6}>
                  <Input
                    specialClass="dark"
                    placeholder={staticContent[lang]['category-editor'].category}
                    value={title}
                    handleChange={this.handleChangeTitle}
                  />
                </Col>
                <Col lg={3} md={3} sm={6}>
                  <Input
                    specialClass="dark"
                    placeholder={staticContent[lang]['category-editor'].descr}
                    value={description}
                    handleChange={this.handleChangeDescription}
                  />
                </Col>
                <Col lg={2} md={4} sm={6} specialClass="text-right">
                  <IconSelect
                    onClickFunction={this.changeCategoryIcon}
                    defaultIcon={icon}
                    iconsArray={iconsArray}
                    lang={lang}
                  />
                </Col>
                <Col lg={2} md={4} sm={6} specialClass="text-right">
                  <ColorSelect
                    onClickFunction={this.changeCategoryColor}
                    defaultColor={color}
                    colorsArray={colorsArray}
                    lang={lang}
                  />
                </Col>
                <Col lg={2} md={2} sm={6} specialClass="text-right">
                  <ButtonToolbar>
                    <Button
                      specialClass="btn btn-primary"
                      onClickFunction={this.updateCategory}
                      icon="done"
                    >{staticContent[lang]['category-editor'].btnUpdate}</Button>
                  </ButtonToolbar>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      </Container>
    );
  }
}

CategoryEditor.defaultProps = {
  categories: [],
};

CategoryEditor.propTypes = {
  categories: PropTypes.array,
  routeParams: PropTypes.object,
  updateCategory: PropTypes.func,
  user: PropTypes.object,
};

export default connect(state => ({
  categories: state.categories,
  user: state.user,
}), { updateCategory })(enhanceWithClickOutside(CategoryEditor));
