import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      term: ''
    };
   this.button = React.createRef();
   this.Search = this.Search.bind(this);
   this.handleTermChange = this.handleTermChange.bind(this);
   this.handleKeyUp = this.handleKeyUp.bind(this);
    }
  Search(){
   this.props.onSearch(this.state.term);
  }
  handleKeyUp(event){
    if(event.keyCode === 13){
      this.button.current.click();
    }
  }
  handleTermChange(event){
    var newTerm = event.target.value;
    this.setState ({
      term: newTerm
    })
  }
  render(){
    return (
        <div className="SearchBar">
         <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyUp={this.handleKeyUp}/>
         <button className="SearchButton" onClick={this.Search} ref={this.button}>SEARCH</button>
         <div style={{color:'red',marginTop:'5px'}}>{this.props.inputError}</div>
        </div>
    );
    
  }
}
export default SearchBar;