import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


class Modal extends React.Component {
  getChildContent(){
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
      zIndex: 1050,
    };

    // The modal "window"
    const modalStyle = {
      display: 'flex',
      justifyContent: 'center',
      zIndex: 1051
    };
    const ChildComponent = this.props.modal.child[0];
    if(!this.props.modal.show) {
      return null;
    }
    return (
      <div className="td-modal" style={backdropStyle} >
        <div className="td-modal-content" style={modalStyle}>
          <ReactCSSTransitionGroup
            transitionName="bounce"
            transitionAppear={true}
            transitionAppearTimeout={650}
            transitionEnter={false}
            transitionLeave={false}
          >
            <ChildComponent/>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="bounce"
        transitionAppear={false}
        transitionEnter={false}
        transitionLeave={true}
        transitionLeaveTimeout={600}
      >
        {this.getChildContent()}

      </ReactCSSTransitionGroup>

    );
  }
}
const mapStateToProps = (state) => ({
  modal: state.modal
});
Modal = connect(
  mapStateToProps
)(Modal);

export default Modal;