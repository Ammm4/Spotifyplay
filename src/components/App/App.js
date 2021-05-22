import React from 'react';
import './App.css';
import SearchBar  from '../SearchBar/SearchBar';
import SearchResults  from '../SearchResults/SearchResults';
import Playlist  from '../Playlist/Playlist';
import Error from '../Errors/error'
import Spotify from '../../util/spotify';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      SearchResults: [],
      playlistName: 'New Playlist',
      newPlayListName: '',
      playlistTracks: [],
      inputError:'',
      error:''
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.Search = this.Search.bind(this);
  }
  Search(term){
    if(!term){
      this.setState({inputError: 'Enter a Artist, Song or Album'})
    } else {
      this.setState({inputError: ''})
      Spotify.search(term)
      .then( (tracks) => {
          this.setState({
          SearchResults: tracks
        });
     });
    }
    
  }
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id )){
      return;
      } else { 
      this.state.playlistTracks.push(track);       
      this.setState({playlistTracks: this.state.playlistTracks});       
      }
    }
  removeTrack(track) {
   this.setState({
     playlistTracks: this.state.playlistTracks.filter(saved => {
    return track.id !== saved.id; }) 
    });
  }
  updatePlaylistName(name) {
  this.setState({
    newPlayListName: name
  })
  }
  savePlaylist(){
    if(this.state.playlistTracks.length !== 0 && this.state.newPlayListName !== '') {
      this.setState({
        newPlayListName: '',
        playlistTracks: []
      })
      this.setState({error: 'success'});
    } else {
      this.setState({error: 'Missing Tracks or Playlist Name'})
    }
    window.setTimeout(() => this.setState({error: ''}), 5000)
  }
 componentDidMount(){
  Spotify.getAccessToken()
 }
  render() {
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch={this.Search} inputError={this.state.inputError}/>
      {this.state.error && <Error error={this.state.error} />}
      <div className="App-playlist">
      <SearchResults 
          searchResults={this.state.SearchResults} 
          onAdd={this.addTrack}/>
      <Playlist 
          playlistName={this.state.playlistName}
          inputValue={this.state.newPlayListName}
          playlistTracks={this.state.playlistTracks} 
          onRemove={this.removeTrack} 
          onNameChange={this.updatePlaylistName} 
          onSave={this.savePlaylist}/>
      </div>
    </div>
  </div>
    );
  }
  
}

export default App;
