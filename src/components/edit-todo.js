import React, {Component} from 'react';
import {connect} from 'react-redux';
import { reduxForm} from 'redux-form'
import ToDoForm from './todo-form'
import * as actions from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class EditToDoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }
  componentDidMount() {
    this.props.GetToDo(this.props.match.params.ToDoId);
  }
  onSubmit(values){
    this.props.saveToDo(values,()=>{
      this.props.fetchTodos()
    });
    this.props.setToDo(null);
  }
  onClose() {
    this.setState({show: false});
    setTimeout(()=>{
      this.props.history.push('/todos');
    },640);
  }
  getContent(){
    const additionalProps ={
      onSubmit: this.onSubmit.bind(this),
      onClose: this.onClose.bind(this),
      formClass:'td-edit'
    };

    if (this.state.show) {
      return ToDoForm({...this.props, ...additionalProps})
    }
    return null;

  }

  render() {
    return(
      <ReactCSSTransitionGroup
        transitionName="bounceRight"
        transitionAppear={true}
        transitionAppearTimeout={650}
        transitionEnter={false}
        transitionLeave={true}
        transitionLeaveTimeout={640}

      >
        {this.getContent()}
      </ReactCSSTransitionGroup>

    )
  }
}
const mapStateToProps = (state) => ({
  initialValues: state.todo,
  todo: state.todo
});

EditToDoForm = reduxForm({
  form: 'initializeFromState',
  enableReinitialize: true
})(EditToDoForm);

EditToDoForm = connect(
  mapStateToProps,
  actions
)(EditToDoForm);

export default EditToDoForm