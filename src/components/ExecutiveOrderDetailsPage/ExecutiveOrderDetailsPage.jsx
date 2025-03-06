import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ExecutiveOrderDetails.css';

function ExecutiveOrderDetails() {
  // const clickedId = useParams().movieId;
  const [clickedMovie, setClickedMovie] = useState();

  function getMovieDetails() {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${clickedMovieId}`)
    .then(response => response.json())
    .then(data => {
      setClickedMovie(data)
    })
    .catch(error => console.log('error message: ', error.message))
  }

  useEffect(() => {
    getMovieDetails();
  })

  if(clickedMovie) {
    return (
      <section className='MovieDetails'>
        <img src= { clickedMovie.backdrop_path } alt={ clickedMovie.title } />
        <h1>{ clickedMovie.title }</h1>
        <div className="genres">
          {clickedMovie.genre_ids.map((genre, index) => (
            <h2 key={index}>{ genre }</h2>
        ))}
        </div>
        <p>{ clickedMovie.overview } </p>
      </section>
    );
  }
}

export default ExecutiveOrderDetails;
