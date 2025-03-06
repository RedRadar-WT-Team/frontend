import './SearchResultsContainer.css';
import SearchResultsCard from '../SearchResultsCard/SearchResultsCard.jsx';

function SearchResultCards( { reps } ) {
  const repDataCards = reps.data.map((rep) => {
    return (
      < SearchResultsCard 
          photoURL = { rep.attributes.photo_url }
          name= { rep.attributes.name } 
          area= { rep.attributes.area }
          party= { rep.attributes.party } 
          state= { rep.attributes.state }
          id= { rep.attributes.id } 
          key = { rep.attributes.id }
      />
    )
  })

  return (
      <section className='MoviesContainer'>
        { repDataCards }
      </section>
  );
}

export default SearchResultCards

