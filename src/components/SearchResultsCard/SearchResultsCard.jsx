import './SearchResultsCard.css'
import { Link } from "react-router-dom"

function SearchCard({ photoURL, name, area, party, state, id }) {
  return (
    <div className="search-card">
      <img src={ photoURL } alt={`photo of ${name}`} className="search-card-img"/>
      <img src="../assets/Five-pointed_star.svg" ></img>

      <div className="search-card-info">
        <Link to={`/results/${id}`}>
          <h3 className="search-card-name">{name}</h3>
          <p className="search-card-area">{area}</p>
          <p className="search-card-party">{party}</p>
          <p className="search-card-state">{state}</p>
        </Link>
      </div>
    </div>
  );
}

export default SearchCard