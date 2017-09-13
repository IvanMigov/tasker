import React from 'react';
import { Component } from 'react';
import LeftSideBar   from './left-side-bar';
import ToDoList   from './todo_list';
import Filters   from './todo-filters';



export default function(ComposedComponent){
  class Content extends Component {
    getChildComponent(){
      return ComposedComponent ? <ComposedComponent {...this.props}/> : '';
    }
    render() {
      return (
        <div className="td-content" >
          <LeftSideBar/>
          <div className="td-content-main">
            <Filters/>
            <div className="td-content-list">
              <ToDoList/>
              <div className="td-test"></div>
              {this.getChildComponent()}
            </div>
          </div>
        </div>
      );
    }
  }
  return Content;
}
