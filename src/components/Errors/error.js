import React from 'react';


class Error extends React.Component {
  constructor(props){
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount(){
    this.ref.current.scrollIntoView();
  }
  render(){
    return(
      <div className='error-container' ref={this.ref}>
        {this.props.error === 'success' ? <span style={{color: 'white'}}>Playlist Saved!</span> : <span>{this.props.error}</span>} 
      </div>
    )
  }
}

export default Error;