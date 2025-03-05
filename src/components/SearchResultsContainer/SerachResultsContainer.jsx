import './SearchResultsContainer.css';
import SearchResultsCard from '../SearchResultsCard/SearchResultsCard.jsx';

function SearchResultCards( { repData } ) {
  const repDataCards = repData.map(rep => {
    return (
      < SearchResultsCard 
          name = { rep.name } 
          area = { rep.area }
          party = { rep.party } 
          state = { rep.state }
          id = { rep.id } 
          key = { rep.id }
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

