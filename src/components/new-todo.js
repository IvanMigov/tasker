import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm} from 'redux-form'

import ToDoForm from './todo-form'
import * as actions from '../actions';

const mapStateToProps = (state) => ({
  initialValues: state.todo,
  todo: state.todo
});

let EditToDoForm = reduxForm({
  form: 'initializeFromState',
  enableReinitialize: true
})(ToDoForm);

EditToDoForm = connect(
  mapStateToProps,
  actions
)(EditToDoForm);

export default EditToDoForm