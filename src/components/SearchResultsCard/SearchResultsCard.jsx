import './SearchResultsCard.css'
import { Link } from "react-router-dom"

function SearchCard({ photoURL, name, area, party, state, id }) {
  
  const handleOnClick = () => {
    // Navigate to details page and set target state in app to be passed to show fetch
  }

  return (
    <div className="search-card" onClick={ () => handleOnClick(id)}>
      <img src={ photoURL } alt={`photo of ${name}`} className="search-card-img"/>
      
      <div className="content-container">
        <div className="search-card-info">
            <h3 className="search-card-name">{name}</h3>
            <p className="search-card-area">{area}</p>
            <p className="search-card-party">{party}</p>
            <p className="search-card-state">{state}</p>
        </div>
        <button><img className="star" src="src/assets/Five-pointed_star.svg" /></button>
      </div>
    </div>
  );
}

export default SearchCard