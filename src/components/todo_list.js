import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as actions from '../actions';
import TodoItemLong   from './todo_item_long';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


class ToDoList extends Component {
  componentWillMount() {
    this.props.fetchTodos();
  }
  constructor(props) {
    super(props);

    this.state = {
      activeTodo: props.match.params.ToDoId,
      isDragging: false
    };
  }
  getClassName(id){
    let className = '';
    if(id && this.state.activeTodo){
      className = id.toString() === this.state.activeTodo.toString() ? 'td-active' : '';
    }
    return className;
  }
  getWrapClassName(){
    let className = this.state.isDragging ? 'todo-list td-drag-in-process' : 'todo-list';
    return className;
  }
  setActive(id){
    this.setState({activeTodo: id});
    this.props.GetToDo(id);
  }
  triggerIsDragging(){
    this.setState({isDragging: !this.state.isDragging});
  }
  moveTodo(dragIndex, hoverIndex) {
    this.props.reorderTodos(dragIndex,hoverIndex);
  }
  pinTodo(dragID, hoverID) {
    this.props.saveTodos(this.props.todos,()=>{
      this.props.fetchTodos()
    });

  }
  renderTodo(todo,i) {
    if(this.props.filters[todo.status]){
      return (
        <Link
          to={{ pathname: `/todos/${todo.id }`}}
          key={todo.id}
          className={this.getClassName(todo.id)}
        >
          <TodoItemLong
            todo={todo}
            fireOnClick = {this.setActive.bind(this)}
            index={i}
            id={todo.id}
            moveTodo={this.moveTodo.bind(this)}
            pinTodo={this.pinTodo.bind(this)}
            triggerDragging={this.triggerIsDragging.bind(this)}

          />
        </Link>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className={this.getWrapClassName()}>
        {
          this.props.todos.map(this.renderTodo.bind(this))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    filters: state.filters

  };
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, actions)(ToDoList));
