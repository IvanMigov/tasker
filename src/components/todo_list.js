import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as actions from '../actions';
import TodoItemLong   from './todo_item_long';

class ToDoList extends Component {
  componentWillMount() {
    this.props.fetchTodos();
  }
  constructor(props) {
    super(props);

    this.state = {
      activeTodo: props.match.params.ToDoId
    };
  }
  getClassName(id){
    return id.toString() === this.state.activeTodo ? 'td-active' : '';
  }
  setActive(id){
    this.setState({activeTodo: id});
    this.props.GetToDo(id);
  }

  renderTodo(todo) {
    return (
      <Link to={{ pathname: `/todos/${todo.id }`}} key={todo.id} className={this.getClassName(todo.id)}>
        <TodoItemLong todo={todo} fireOnClick = {this.setActive.bind(this)}/>
      </Link>
    );
  }

  render() {
    return (
      <div className="todo-list">
        {
          this.props.todos.map(this.renderTodo.bind(this))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos

  };
}

export default connect(mapStateToProps, actions)(ToDoList);
