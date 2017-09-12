import { combineReducers } from 'redux';
import todosReducer from './todos';
import currentTodo from './current_todo';
import {reducer as reduxFormReducer} from 'redux-form'


const rootReducer = combineReducers({
  todos: todosReducer,
  form: reduxFormReducer,
  todo: currentTodo,

});

export default rootReducer;
