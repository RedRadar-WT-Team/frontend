import SearchCard from '../SearchResultsCard/SearchResultsCard';
import './ExecutiveOrderCard.css';
import { Link } from 'react-router-dom';


function ExecutiveOrderCard({ execOrder, setDetailsTarget, getDetails }) {
  
  const cardClick = () => {
    setDetailsTarget("EO")
    console.log(execOrder)
    getDetails(execOrder.document_number)
  }

  const starClick = (event) => {
    event.stopPropagation();
    alert("star clicked!")
  }

  return (
    <section className='ExecutiveOrderCard' onClick={cardClick}>
      <h2>{execOrder.title}</h2>
      <h3>{execOrder.document_number}</h3>
      <p>{execOrder.publication_date}</p>
      <button onClick={starClick}><img className="star" src="src/assets/Five-pointed_star.svg" /></button>
    </section>
  );
}

export default ExecutiveOrderCard;