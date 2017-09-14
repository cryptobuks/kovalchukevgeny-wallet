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
          id: action.id,
          description: action.description,
          title: action.title,
          icon: action.icon,
          filter: action.filter,
          color: action.color
        }
      ];
    case 'CHANGE_CATEGORY' :
      store = store.map(category => {
        if(category.id === action.id) {
          category.description = action.description;
          category.title = action.title;
          category.icon = action.icon;
          category.filter = action.filter;
          category.color = action.color;
        }
        return category;
      });
      return store;
    case 'CHANGE_ALL_CATEGORIES' :
      return action.categories;
    case 'DELETE_CATEGORY' :
      return store.filter(category => category.id !== action.id);
    default:
      return state;
  }
}

export default categories;
