import axios from 'axios';
import {
  FETCH_TODOS,
  FETCH_TODO_BY_ID,
  PATCH_TODO,
  SET_CURRENT_TODO,
  CHANGE_VISIBILITY,
  SET_MODAL_COMPONENT
} from './types';

const requestUrl = 'http://localhost:3004/todos';

export function fetchTodos() {
  const request = axios.get(requestUrl);

  return {
    type: FETCH_TODOS,
    payload: request
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
  const request = axios.patch(`${requestUrl}/${todo.id}`,todo);//.then(()=>{callback()});

  return {
    type: PATCH_TODO,
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