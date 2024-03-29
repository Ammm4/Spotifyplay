import React from 'react';
import './Playlist.css';
import  TrackList  from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e) {
   let name = e.target.value;
    this.props.onNameChange(name);
  }
  render() {
    return (
      <div className="Playlist">
      <input placeholder={this.props.playlistName} value={this.props.inputValue} onChange={this.handleNameChange}/>
      <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
      <button className="Playlist-save" onClick={this.props.onSave}>SAVE</button>
    </div>
    );
  }
}
export default Playlist;