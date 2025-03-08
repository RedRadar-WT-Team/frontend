import './SearchResultsCard.css'
import { Link } from "react-router-dom"

function SearchCard({ photoURL, name, area, party, state, location, id, setDetailsTarget, getDetails, handleSavedReps }) {

  const cardClick = () => {
    setDetailsTarget("rep")
    getDetails(id, location)
  }

  const starClick = (event) => {
    event.stopPropagation();
    handleSavedReps(id, location);
  }

  return (
    <div className="search-card" onClick={cardClick}>
      <img src={ photoURL } alt={`photo of ${name}`} className="search-card-img"/>
      
      <div className="content-container">
        <div className="search-card-info">
            <h3 className="search-card-name">{name}</h3>
            <p className="search-card-area">{area}</p>
            <p className="search-card-party">{party}</p>
            <p className="search-card-state">{state}</p>
        </div>
        <button onClick={starClick}><img className="star" src="/public/Five-pointed_star.svg" /></button>
      </div>
    </div>
  );
}

export default SearchCard