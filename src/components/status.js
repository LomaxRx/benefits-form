import React from 'react';
import PropTypes from 'prop-types';

export default class Status extends React.Component {
  static propTypes = {
      message: PropTypes.string,
      code: PropTypes.number,
      text: PropTypes.string,
      dismiss: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      show: props.code !== null
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.code !== this.props.code){
      this.setState({
        show: this.props.code !== null
      });
    }
  }


  render(){
    let { message, code, text, dismiss, nextStep } = this.props;
    let { show } = this.state;
    let style = show ? { display: 'block', visibility: 'visible' } : { display: 'block', visibility: 'hidden' };
    return (
      <div className={`modal fade ${show ? 'show' : ''}`} style={style}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{text}</h5>
            </div>
            <div className="modal-body">
              {message}
            </div>
            <div className="modal-footer">
              {code === 201 &&
                <button type="button" className="btn btn-success" onClick={nextStep}>Next Step</button>
              }{code !== 201 &&
                <button type="button" className="btn btn-danger" onClick={dismiss}>Try Again</button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

}
