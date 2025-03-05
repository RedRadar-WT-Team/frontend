import './SearchBar.css';
import searchIcon from '../assets/search-user-icon.svg';

function SearchBar() {
  return (
    <section className='searchBar'>
        <input type="text" name="searchInput" placeholder="  Enter your zip code"></input>
        <button><img src={searchIcon} alt="search Rep"/></button>
    </section>
  );  
}

export default SearchBar;