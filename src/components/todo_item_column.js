import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';
import {getImgPriority} from '../utils/todo_item_utils';
import {withRouter} from "react-router-dom";




class TodoItemColumn extends Component {
  showEditTodo() {
    const id = this.props.todo.id;
    this.setState({activeTodo: id});
    this.props.GetToDo(id);
    this.props.history.push(`/progress/${id}`);
  }
  render() {
    const {id, date, label, title, description, priority} = this.props.todo;
    return (
      <div className='td-issue' onClick={this.showEditTodo.bind(this)}>
        <div className="td-issue-content">
          <div className="td-row">
            <span className="td-type" title={priority}>
              {getImgPriority(priority)}
            </span>
            <div className="td-key">
              <span title={id} className="td-key-link">{id}</span>
            </div>
            <span className="td-inner">{title}</span>
          </div>
          <div className="td-row-description">
            <span className="td-description">{description}</span>
          </div>
          <div className="td-row td-row-bottom">
            <div className="td-label" title={label}>
              <span className="td-inner">{label}</span>
            </div>
            <div className="td-date" title={date}>
              <span className="td-inner">{date}</span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

TodoItemColumn = connect(
  null,
  actions
)(TodoItemColumn);

export default withRouter(TodoItemColumn)