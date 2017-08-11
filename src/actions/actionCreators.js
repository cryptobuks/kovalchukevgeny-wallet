// add transaction
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

// change transaction
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

// delete transaction
export function deleteTransaction(transactionId) {
  return {
    type: 'DELETE_TRANSACTION',
    transactionId
  };
}

// add category
export function addCategory(id, description, title, icon) {
  return {
    type: 'ADD_CATEGORY',
    id,
    description,
    title,
    icon
  };
}

// delete category
export function deleteCategory(id) {
  return {
    type: 'DELETE_CATEGORY',
    id
  };
}

// change language
export function changeLang(lang) {
  return {
    type: 'CHANGE_LANGUAGE',
    lang
  };
}

// add month course
export function addMonthCourse(date, course) {
  return {
    type: 'ADD_MONTH-COURSE',
    date,
    course
  };
}
