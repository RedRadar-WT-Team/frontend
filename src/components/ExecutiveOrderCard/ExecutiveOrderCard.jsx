import SearchCard from '../SearchResultsCard/SearchResultsCard';
import './ExecutiveOrderCard.css';
import { Link } from 'react-router-dom';

function ExecutiveOrderCard({ execOrder, handleSavedEos}) {
    
  const starClick = (event) => {
    event.stopPropagation();
    handleSavedEos(execOrder.executive_order_number);
  }
  
  return (
    <section className='ExecutiveOrderCard'>
      <Link to={`/executive_orders/${execOrder.id}`}>
        <h2>{execOrder.title}</h2>
        <h3>{execOrder.executive_order_number}</h3>
        <p>{execOrder.publication_date}</p>
      </Link>
       <button onClick={starClick}><img className="star" src="src/assets/Five-pointed_star.svg" /></button>
    </section>
  );
}

export default ExecutiveOrderCard;