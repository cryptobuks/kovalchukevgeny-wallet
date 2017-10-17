export const addTransaction = (id, date, money, description, category) => ({
  type: 'ADD_TRANSACTION',
  id,
  date,
  money,
  description,
  category,
});

export const changeTransaction = (id, date, money, description, category) => ({
  type: 'CHANGE_TRANSACTION',
  id,
  date,
  money,
  description,
  category,
});

export const deleteTransaction = id => ({
  type: 'DELETE_TRANSACTION',
  id,
});

export const addCategory = (id, description, title, icon, filter, color) => ({
  type: 'ADD_CATEGORY',
  id,
  description,
  title,
  icon,
  filter,
  color,
});

export const updateCategory = (id, description, title, icon, filter, color) => ({
  type: 'UPDATE_CATEGORY',
  id,
  description,
  title,
  icon,
  filter,
  color,
});

export const changeAllCategories = categories => ({
  type: 'CHANGE_ALL_CATEGORIES',
  categories,
});

export const deleteCategory = id => ({
  type: 'DELETE_CATEGORY',
  id,
});

export const changeLang = lang => ({
  type: 'CHANGE_LANGUAGE',
  lang,
});

export const addMonthCourse = (date, course) => ({
  type: 'ADD_MONTH-COURSE',
  date,
  course,
});
