import './ExecutiveOrderCard.css';
import { Link } from 'react-router-dom';


function ExecutiveOrderCard({ execOrder }) {
  console.log("execOrder: ", execOrder)
  return (
    <section className='ExecutiveOrderCard'>
      <Link to={`/${execOrder.id}`}>
        <h2>{execOrder.title}</h2>
        <h3>{execOrder.executive_order_number}</h3>
        <p>{execOrder.publication_date}</p>
        {/* <a href={execOrder.html_url}>Full Executive Order</a> */}
      </Link>
    </section>
  );
}

export default ExecutiveOrderCard;