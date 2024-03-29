import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }
  renderAction (addSub) {

    return addSub? <button className='Track-action' onClick={this.removeTrack}>-</button>:<button className='Track-action' onClick={this.addTrack}>+</button>;
      }
      
  addTrack(){
    this.props.onAdd(this.props.track);
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h4>{this.props.track.name}</h4>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction(this.props.isRemoval)}   
        
    </div>
    );
  }
}
export default Track;