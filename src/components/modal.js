import React from 'react';
import {connect} from 'react-redux';


class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    console.log('Modal',this.props);
    if(!this.props.modal.show) {
      return null;
    }

    // The gray background
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
    return (
      <div className="td-modal" style={backdropStyle} >
        <div className="td-modal-content" style={modalStyle} >
          <ChildComponent/>
        </div>
      </div>
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