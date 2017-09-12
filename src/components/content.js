import React from 'react';
import { Component } from 'react';
import LeftSideBar   from './left-side-bar';
import ToDoList   from './todo_list';
import EditToDoForm   from './edit-todo';
import Filters   from './todo-filters';



export default class Content extends Component {
  render() {
    return (
      <div className="td-content" >
        <LeftSideBar/>
        <div className="td-content-main">
          <Filters/>
          <div className="td-content-list">
            <ToDoList/>
            <EditToDoForm/>
          </div>
        </div>
      </div>
    );
  }
}
