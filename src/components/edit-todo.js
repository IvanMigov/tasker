import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import * as actions from '../actions';

class EditToDoForm extends Component {
  componentWillMount() {
    this.props.GetToDo(this.props.match.params.ToDoId);
  }
  componentWillReceiveProps(nextProps){
    this.props.GetToDo(this.props.match.params.ToDoId);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <Field
              name="title"
              component="input"
              type="text"
              placeholder="title"
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Undo Changes
          </button>
        </div>
      </form>
    )

  }
}


EditToDoForm = reduxForm({
  form: 'initializeFromState',
  enableReinitialize: true
})(EditToDoForm);

EditToDoForm = connect(
  state => ({
    initialValues: state.todo // pull initial values from account reducer
  }),
  actions

)(EditToDoForm);

export default EditToDoForm