import SearchCard from '../SearchResultsCard/SearchResultsCard';
import './ExecutiveOrderCard.css';
import { Link } from 'react-router-dom';

function ExecutiveOrderCard({ execOrder, handleSavedEos}) {
    
  const starClick = (event) => {
    event.stopPropagation();
    handleSavedEos(execOrder.document_number);
  }
  
  return (
    <section className='ExecutiveOrderCard'>
      <Link to={`/executive_orders/${execOrder.id}`}>
        <h2>{execOrder.title}</h2>
        <div className="eo_details">
          <h3>{execOrder.document_number}</h3>
          <p>{execOrder.publication_date}</p>
        </div>
      </Link>
       <button onClick={starClick}><img className="star" src="/Five-pointed_star.svg" /></button>
    </section>
  );
}

export default ExecutiveOrderCard;
