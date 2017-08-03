// add transaction
export function addTransaction(id, startDate, money, description, category) {
  return {
    type: 'ADD_TRANSACTION',
    id,
    startDate,
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
export function addCategory(categoryId, categoryDescription, categoryTitle, categoryIcon) {
  return {
    type: 'ADD_CATEGORY',
    categoryId,
    categoryDescription,
    categoryTitle,
    categoryIcon
  };
}

// delete category
export function deleteCategory(categoryId) {
  return {
    type: 'DELETE_CATEGORY',
    categoryId
  };
}

// change language
export function changeLang(lang) {
  return {
    type: 'CHANGE_LANGUAGE',
    lang
  };
}
