import './SavedEoCards.css';
import { useNavigate } from 'react-router-dom';

function SavedEosCards({ title, executive_order_number, publication_date, id}) {

    const cardClick = () => {
        useNavigate(`/executive_orders/${id}`);
    }

    return (
        <div className='saved-eo-card' onClick={ cardClick }>
            <h3>{title}</h3>
            <div className="eo_details">
                <p>{executive_order_number}</p>
                <p>{publication_date}</p>
            </div>
        </div>
    );
}

export default SavedEosCards;