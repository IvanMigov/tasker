import {SET_CURRENT_TODO} from '../actions/types';

export default function (state = null, action) {
  console.log('action',action);
  switch (action.type) {
    case SET_CURRENT_TODO:
      return action.payload;
  }

  return state;
}
