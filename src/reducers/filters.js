import {CHANGE_FILTERS_SET} from '../actions/types';

export default function (state = {ToDo:true,InProgress:true}, action) {
  switch (action.type) {
    case CHANGE_FILTERS_SET:
      return {...state,...action.payload};
    default:
      return state;
  }

}
