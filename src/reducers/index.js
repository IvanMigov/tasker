import { combineReducers } from 'redux';
import todosReducer from './todos';
import currentTodo from './current_todo';
import modalReducer from './modal';
import {reducer as reduxFormReducer} from 'redux-form'


const rootReducer = combineReducers({
  todos: todosReducer,
  form: reduxFormReducer,
  todo: currentTodo,
  modal: modalReducer

});

export default rootReducer;
