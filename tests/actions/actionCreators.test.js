import * as actions from '../../src/actions/actionCreators';

describe('actions', () => {
  it('should create new transaction', () => {
    const id = 1234567890;
    const date = '2017-10-05T12:11:22.531Z';
    const money = 45;
    const description = 'Test description';
    const category = 'Test category';
    const expectedAction = {
      type: 'ADD_TRANSACTION',
      id,
      date,
      money,
      description,
      category,
    }
    expect(actions.addTransaction(id, date, money, description, category)).toEqual(expectedAction);
  });

  it('should change existing transaction', () => {
    const id = 1234567890;
    const date = '2017-10-05T12:11:22.531Z';
    const money = 45;
    const description = 'Test description';
    const category = 'Test category';
    const expectedAction = {
      type: 'CHANGE_TRANSACTION',
      id,
      date,
      money,
      description,
      category,
    }
    expect(actions.changeTransaction(id, date, money, description, category)).toEqual(expectedAction);
  });

  it('should delete existing transaction', () => {
    const id = 1234567890;
    const expectedAction = {
      type: 'DELETE_TRANSACTION',
      id,
    }
    expect(actions.deleteTransaction(id)).toEqual(expectedAction);
  });

  it('should create new category', () => {
    const id = 1234567890;
    const description = 'Test description';
    const title = 'Test title';
    const icon = 'fa-test';
    const filter = true;
    const color = '#ff0000';
    const expectedAction = {
      type: 'ADD_CATEGORY',
      id,
      description,
      title,
      icon,
      filter,
      color,
    }
    expect(actions.addCategory(id, description, title, icon, filter, color)).toEqual(expectedAction);
  });

  it('should change existing category', () => {
    const id = 1234567890;
    const description = 'Test description';
    const title = 'Test title';
    const icon = 'fa-test';
    const filter = true;
    const color = '#ff0000';
    const expectedAction = {
      type: 'UPDATE_CATEGORY',
      id,
      description,
      title,
      icon,
      filter,
      color,
    }
    expect(actions.updateCategory(id, description, title, icon, filter, color)).toEqual(expectedAction);
  });

  it('should change all categories', () => {
    const categories = [];
    const expectedAction = {
      type: 'CHANGE_ALL_CATEGORIES',
      categories,
    }
    expect(actions.changeAllCategories(categories)).toEqual(expectedAction);
  });

  it('should delete existing category', () => {
    const id = 1234567890;
    const expectedAction = {
      type: 'DELETE_CATEGORY',
      id,
    }
    expect(actions.deleteCategories(id)).toEqual(expectedAction);
  });

  it('should change language', () => {
    const lang = 'eng';
    const expectedAction = {
      type: 'CHANGE_LANGUAGE',
      lang,
    }
    expect(actions.changeLang(lang)).toEqual(expectedAction);
  });

  it('should add month course', () => {
    const date = '2017-10-05T12:11:22.531Z';
    const course = 1.95;
    const expectedAction = {
      type: 'ADD_MONTH-COURSE',
      date,
      course,
    }
    expect(actions.addMonthCourse(date, course)).toEqual(expectedAction);
  });
})
