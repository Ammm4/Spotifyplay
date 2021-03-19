import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {

  constructor(props){

   super(props);

   this.state = {
     term: ''
   };
   
   this.Search = this.Search.bind(this);
   this.handleTermChange = this.handleTermChange.bind(this);

    }
  Search(){
   this.props.onSearch(this.state.term);
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
         <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
         <button className="SearchButton" onClick={this.Search}>SEARCH</button>
        </div>
    );
    
  }
}
export default SearchBar;