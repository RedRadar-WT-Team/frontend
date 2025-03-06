import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SearchResultsCardDetails() {
  const repId = useParams().repId;
  console.log("You're in searchREsultsCArdDeatilas:", repId)
  const [clickedRep, setClickedRep] = useState();

  function getRepDetails() {
    fetch(`http://127.0.0.1:3000/api/v1/representatives/search?db=false&query=89032&id=R000608`)
    .then(response => response.json())
    .then(data => {
      setClickedRep(data)
    })
    .catch(error => console.log('error message: ', error.message))
  }

  useEffect(() => {
    getRepDetails();
  })

  if(clickedRep) {
    return (
      <div className="search-card">
      <img src={ photoURL } alt={`photo of ${name}`} className="search-card-img"/>
      <img src="../assets/Five-pointed_star.svg" ></img>

      <div className="search-card-info">
        <h3 className="search-card-name">{name}</h3>
        <p className="search-card-area">{area}</p>
        <p className="search-card-party">{party}</p>
        <p className="search-card-state">{state}</p>
      </div>
    </div>
    );
  }
}


export default SearchResultsCardDetails;
