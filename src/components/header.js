import React from 'react';
import { Component } from 'react';


export default class Header extends Component {

  render() {
    return (
      <div className="td-header" >
        <div className="td-header-logo">

        </div>
        <div className="td-header-content">
          <button type="button" className="btn btn-primary btn-md">Create</button>
          <button type="button" className="btn btn-md disabled">LogIn</button>
        </div>

      </div>
    );
  }
}
