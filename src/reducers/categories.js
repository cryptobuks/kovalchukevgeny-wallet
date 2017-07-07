import { load } from 'redux-localstorage-simple';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.categories || !initialState.categories.length) {
  initialState = {
    categories: []
  };
}

function categories(state = initialState.categories, action) {
  let store = [...state];
  switch (action.type) {
    case 'ADD_CATEGORY' :
      return [
        ...state, {
          categoryId: action.categoryId,
          categoryDescription: action.categoryDescription,
          categoryTitle: action.categoryTitle,
          categoryIcon: action.categoryIcon
        }
      ];
    case 'DELETE_CATEGORY' :
      return store.filter(category => category.categoryId !== action.categoryId);
    default:
      return state;
  }
}

export default categories;
