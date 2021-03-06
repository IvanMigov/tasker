import axios from 'axios';
import {
  FETCH_TODOS,
  FETCH_TODO_BY_ID,
  PATCH_TODO,
  PATCH_TODO_SILENTLY,
  SET_CURRENT_TODO,
  CHANGE_VISIBILITY,
  SET_MODAL_COMPONENT,
  CREATE_TODO,
  REORDER_TODOS,
  SAVE_TODOS,
  CHANGE_FILTERS_SET,
  SAVE_TODO_IN_LIST
} from './types';

const requestUrl = 'http://localhost:3004/todos';

export function fetchTodos() {
  const request = axios.get(requestUrl);

  return {
    type: FETCH_TODOS,
    payload: request
  };
}
export function reorderTodos(dragIndex,hoverIndex) {
  return {
    type: REORDER_TODOS,
    payload: {dragIndex, hoverIndex}
  };
}
export function saveToDoInList(todo) {
  return {
    type: SAVE_TODO_IN_LIST,
    payload: todo
  };
}
export function saveTodos(todos,callback) {
  let todosOrder = [];
  todos.forEach(todo =>{
    todosOrder.push(todo.id);
  });
  const request = axios.patch(`${requestUrl}/0`,{order:todosOrder});

  return {
    type: SAVE_TODOS,
    payload: request,
    callback
  };
}
export function GetToDo(id) {
  const request = axios.get(`${requestUrl}/${id}`);

  return {
    type: FETCH_TODO_BY_ID,
    payload: request
  };
}
export function saveToDo(todo, callback) {
  const request = axios.patch(`${requestUrl}/${todo.id}`,todo);

  return {
    type: PATCH_TODO,
    payload: request,
    callback
  };
}
export function saveToDoWithoutChangingState(todo, callback) {
  const request = axios.patch(`${requestUrl}/${todo.id}`,todo);

  return {
    type: PATCH_TODO_SILENTLY,
    payload: request,
    callback
  };
}
export function saveNewToDo(todo, callback) {
  const request = axios.post(`${requestUrl}`,todo);

  return {
    type: CREATE_TODO,
    payload: request,
    callback
  };
}
export function setToDo(todo) {
  return {
    type: SET_CURRENT_TODO,
    payload: todo
  };
}
export function showHideModal(visibility) {

  return {
    type: CHANGE_VISIBILITY,
    payload: visibility
  };
}
export function setModalComponents(component) {

  return {
    type: SET_MODAL_COMPONENT,
    payload: component
  };
}
export function fetchFiltersSet() {
  const filters = JSON.parse(localStorage.getItem(CHANGE_FILTERS_SET)) || {};

  return {
    type: CHANGE_FILTERS_SET,
    payload: filters
  };
}
export function changeFiltersSet(filters) {
  localStorage.setItem(CHANGE_FILTERS_SET,JSON.stringify(filters));

  return {
    type: CHANGE_FILTERS_SET,
    payload: filters
  };
}