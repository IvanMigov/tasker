import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';
import TestModal from './testModal';



class Header extends Component {
  onCreate(){
    this.props.setModalComponents(TestModal);
    this.props.showHideModal(true);
  }

  render() {
    return (
      <div className="td-header" >
        <div className="td-header-logo">

        </div>
        <div className="td-header-content">
          <button
            type="button"
            className="btn btn-primary btn-md"
            onClick={this.onCreate.bind(this)}
          >Create
          </button>
          <button type="button" className="btn btn-md disabled">LogIn</button>
        </div>

      </div>
    );
  }
}

Header = connect(
  null,
  actions
)(Header);

export default Header