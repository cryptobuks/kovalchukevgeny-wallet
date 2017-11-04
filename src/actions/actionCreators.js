import Constants from './../helpers/constants.js';

export const addTransaction = (id, date, money, description, category) => ({
  type: Constants.ACTIONS.Constants.ACTIONS.ADD_TRANSACTION,
  id,
  date,
  money,
  description,
  category,
});

export const changeTransaction = (id, date, money, description, category) => ({
  type: Constants.ACTIONS.CHANGE_TRANSACTION,
  id,
  date,
  money,
  description,
  category,
});

export const deleteTransaction = id => ({
  type: Constants.ACTIONS.DELETE_TRANSACTION,
  id,
});

export const addCategory = (id, description, title, icon, filter, color) => ({
  type: Constants.ACTIONS.ADD_CATEGORY,
  id,
  description,
  title,
  icon,
  filter,
  color,
});

export const updateCategory = (id, description, title, icon, filter, color) => ({
  type: Constants.ACTIONS.UPDATE_CATEGORY,
  id,
  description,
  title,
  icon,
  filter,
  color,
});

export const changeAllCategories = categories => ({
  type: Constants.ACTIONS.CHANGE_ALL_CATEGORIES,
  categories,
});

export const deleteCategory = id => ({
  type: Constants.ACTIONS.DELETE_CATEGORY,
  id,
});

export const changeLang = lang => ({
  type: Constants.ACTIONS.CHANGE_LANGUAGE,
  lang,
});

export const addMonthCourse = (date, course) => ({
  type: Constants.ACTIONS.ADD_MONTH_COURSE,
  date,
  course,
});

export const changePallet = pallet => ({
  type: Constants.ACTIONS.CHANGE_PALLET,
  pallet,
});  

export const changeTheme = theme => ({
  type: Constants.ACTIONS.CHANGE_THEME,
  theme,
});
