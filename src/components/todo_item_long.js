import React, { Component } from 'react';
import { connect } from 'react-redux';
import logoNormal from '../images/status/normal.png';
import logoHigh from '../images/status/major.svg';
import logoLow from '../images/status/minor.svg';
import {GetToDo} from '../actions';



class TodoItemLong extends Component {
  getImgPriority(priority) {
    let logoImg = logoNormal;
    switch (priority) {
      case  'low':
        logoImg = logoLow;
        break;
      case  'high':
        logoImg = logoHigh;
        break;
    }

    return (
      <img src={logoImg}/>
    );
  }
  getColorStatus(status) {
    let backgroundColor = '#bfe4ff';//status == todo
    switch (status) {
      case  'InProgress':
        backgroundColor = '#0c0e75';
        break;
      case  'Closed':
        backgroundColor = '#1d750c';
        break;
    }

    return {backgroundColor}
  }
  callClick() {
    const {GetToDo,todo} = this.props;
    GetToDo(todo.id);
  }

  render() {
    const {id,date,label,title,status,priority} = this.props.todo;
    return (
      <div className="td-issue-long"  onClick={this.callClick.bind(this)}>
        <div className="td-issue-content" >
          <div className="td-row">
            <span className="td-type" title={priority}>
              {this.getImgPriority(priority)}
            </span>
            <div className="td-key">
              <a href="" title={id} className="td-key-link">{id}</a>
            </div>
            <div className="td-summary" title={title}>
              <span className="td-inner">{title}</span>
            </div>

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
        <div className="td-grabber" style={this.getColorStatus(status)}></div>
      </div>
    );
  }
}
export default connect(null , {GetToDo})(TodoItemLong);