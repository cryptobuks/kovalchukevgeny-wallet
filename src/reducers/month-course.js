import { load } from 'redux-localstorage-simple';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.course) {
  initialState = {
    course: []
  };
}

function course(state = initialState.course, action) {
  let store = [...state];
  switch (action.type) {
    case 'ADD_MONTH-COURSE' :
    if(!store.filter(course => course.date === action.date)[0]) {
      return [
        ...store, {
          date: action.date,
          course: action.course
        }
      ];
    } else {
      return store.map(course => {
        if(course.date === action.date) {
          course.course = action.course;
        }
        return course;
      });
    }
    default:
      return state;
  }
}

export default course;
