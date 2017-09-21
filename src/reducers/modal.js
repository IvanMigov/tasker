import {CHANGE_VISIBILITY,SET_MODAL_COMPONENT} from '../actions/types';

export default function (state = {child:[],show:false}, action) {
  switch (action.type) {
    case CHANGE_VISIBILITY:
      return {...state,show:action.payload};
    case SET_MODAL_COMPONENT:
      return {...state,child:[action.payload]};
    default:
      return state;
  }

}
