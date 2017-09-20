import {FETCH_TODO_BY_ID,SET_CURRENT_TODO,PATCH_TODO} from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_TODO_BY_ID:
      return action.payload.data;
    case SET_CURRENT_TODO:
      return action.payload;
    case PATCH_TODO:
      return action.payload.data;
    default:
      return state;

  }

}
