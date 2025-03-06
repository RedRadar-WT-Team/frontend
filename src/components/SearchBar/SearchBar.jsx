import './SearchBar.css';
import searchIcon from '../../assets/search-user-icon.svg';
import { useState } from 'react';

function SearchBar({getRepData}) {
  const [inputQuery, setInputQuery] = useState("")

  const handleChange =  (event) => {
    setInputQuery(event.target.value);
  };

  return (
    <section className='search_bar_container'>
        <h2>Find your local Representatives!</h2>
        <div className="search_bar"> 
          <input type="text" name="searchInput" placeholder="  Enter your zip code" value={inputQuery} onChange={handleChange}></input>
          <button onClick={() => getRepData(inputQuery)}><img src={searchIcon} alt="search Rep"/></button>
        </div>
    </section>
  );  
}

export default SearchBar;