import {
  FETCH_TODOS,
  REORDER_TODOS,
  SAVE_TODOS,
  SAVE_TODO_IN_LIST

} from '../actions/types';

export default function (state = [], action) {
  let todos = [];
  switch (action.type) {
    case FETCH_TODOS:
      todos = [...action.payload.data];
      let orderedTodos = [];
      const todosOrder = todos.find(todo => {return todo.id === 0})['order'];
      todosOrder.forEach((todoId) =>{
        let todoIndex = null;
        const todoData = todos.find((todo, index) => {
          todoIndex = index;
          return todo.id === todoId
        });
        if(todoData){
          orderedTodos.push(todoData);
          todos.splice(todoIndex, 1)
        }
      });
      todos.splice(0, 1);
      return [...orderedTodos,...todos];
    case REORDER_TODOS:
      // debugger;
      const {dragIndex,hoverIndex} = action.payload;
      todos = [...state];
      let element = todos[dragIndex];
      todos.splice(dragIndex, 1);
      todos.splice(hoverIndex, 0, element);
      return todos;
    // case SAVE_TODOS:
    //   return [...action.payload.data];
    case SAVE_TODO_IN_LIST:
      const todosList = [...state];
      let TodoIndex = 0;
      todosList.find((todo,index)=>{
        if(todo.id === action.payload.id){
          TodoIndex = index;
          return true;
        }else{
          return false
        }
      });
      todosList[TodoIndex] = action.payload;
      return todosList;

    default:
      return state;
  }

}
