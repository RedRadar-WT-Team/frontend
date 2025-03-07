import './SearchResultsContainer.css';
import SearchResultsCard from '../SearchResultsCard/SearchResultsCard.jsx';

function SearchResultCards( { reps, setDetailsTarget, getDetails, handleSavedReps } ) {
  const repDataCards = reps.data.map((rep) => {
    return (
      < SearchResultsCard 
          photoURL = { rep.attributes.photo_url }
          name= { rep.attributes.name } 
          area= { rep.attributes.area }
          party= { rep.attributes.party } 
          state= { rep.attributes.state }
          location= { rep.attributes.location}
          id= { rep.attributes.id } 
          key = { rep.attributes.id }
          setDetailsTarget = { setDetailsTarget }
          getDetails = { getDetails }
          handleSavedReps = { handleSavedReps }
      />
    )
  })

  return (
      <section className='results_container'>
        { repDataCards }
      </section>
  );
}

export default SearchResultCards

