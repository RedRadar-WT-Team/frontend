import './SearchBar.css';
import searchIcon from '../../assets/search-user-icon.svg';

function SearchBar() {
  return (
    <section className='search_bar_container'>
        <h2>Find your local Representatives!</h2>
        <div className="search_bar"> 
          <input type="text" name="searchInput" placeholder="  Enter your zip code"></input>
          <button><img src={searchIcon} alt="search Rep"/></button>
        </div>
       
    </section>
  );  
}

export default SearchBar;