import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SearchResultsCardDetails() {
  const repId = useParams().repId;
  const zipCode = useParams().zipCode
  console.log("You're in searchREsultsCArdDeatilas:", repId)
  const [clickedRep, setClickedRep] = useState();

  function getRepDetails() {
    fetch(`http://127.0.0.1:3000/api/v1/representatives/search?db=false&query=${zipCode}&id=${repId}`)
    .then(response => response.json())
    .then(data => {
      setClickedRep(data)
    })
    .catch(error => console.log('error message: ', error.message))
  }

  useEffect(() => {
    getRepDetails();
  }, [])

  if(clickedRep) {
    console.log(clickedRep.data.attributes.photo_url)
    return (
      <div className="search-card">
      <img src={ clickedRep.data.attributes.photo_url} alt={`photo of ${clickedRep.data.attributes.name}`} className="search-card-img"/>
      <img src="../assets/Five-pointed_star.svg" ></img>

      <div className="search-card-info">
        <h3 className="search-card-name">{clickedRep.data.attributes.name}</h3>
        <p className="search-card-area">{clickedRep.data.attributes.area}</p>
        <p className="search-card-party">{clickedRep.data.attributes.party}</p>
        <p className="search-card-state">{clickedRep.data.attributes.phone}</p>
        <p className="search-card-state">{clickedRep.data.attributes.state}</p>
        <p className="search-card-state">{clickedRep.data.attributes.state}</p>

      </div>
    </div>
    );
  }
}


export default SearchResultsCardDetails;
