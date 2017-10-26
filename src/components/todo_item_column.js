import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';
import {getImgPriority,getColorStatus} from '../utils/todo_item_utils'




class TodoItemColumn extends Component {
  render() {
    const {id, date, label, title, description, priority} = this.props.todo;
    return (
      <div className='td-issue'>
        <div className="td-issue-content">
          <div className="td-row">
            <span className="td-type" title={priority}>
              {getImgPriority(priority)}
            </span>
            <div className="td-key">
              <span title={id} className="td-key-link">{id}</span>
            </div>
            <div className="td-summary" title={title}>
              <span className="td-inner">{title}</span>
            </div>
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

export default TodoItemColumn