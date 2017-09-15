export function addTransaction(id, date, money, description, category) {
  return {
    type: 'ADD_TRANSACTION',
    id,
    date,
    money,
    description,
    category
  };
}

export function changeTransaction(id, date, money, description, category) {
  return {
    type: 'CHANGE_TRANSACTION',
    id,
    date,
    money,
    description,
    category
  };
}

export function deleteTransaction(transactionId) {
  return {
    type: 'DELETE_TRANSACTION',
    transactionId
  };
}

export function addCategory(id, description, title, icon, filter, color) {
  return {
    type: 'ADD_CATEGORY',
    id,
    description,
    title,
    icon,
    filter,
    color
  };
}

export function updateCategory(id, description, title, icon, filter, color) {
  return {
    type: 'UPDATE_CATEGORY',
    id,
    description,
    title,
    icon,
    filter,
    color
  };
}

export function changeAllCategories(categories) {
  return {
    type: 'CHANGE_ALL_CATEGORIES',
    categories
  };
}

export function deleteCategory(id) {
  return {
    type: 'DELETE_CATEGORY',
    id
  };
}

export function changeLang(lang) {
  return {
    type: 'CHANGE_LANGUAGE',
    lang
  };
}

export function addMonthCourse(date, course) {
  return {
    type: 'ADD_MONTH-COURSE',
    date,
    course
  };
}
