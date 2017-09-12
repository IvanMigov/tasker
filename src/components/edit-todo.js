import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import * as actions from '../actions';

let EditToDoForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
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
};

EditToDoForm = reduxForm({
  form: 'initializeFromState'
})(EditToDoForm);

EditToDoForm = connect(
  state => ({
    initialValues: state.todo // pull initial values from account reducer
  })

)(EditToDoForm);

export default EditToDoForm