import './SavedEoCards.css';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function SavedEosCards({ title, executive_order_number, publication_date, id}) {
    const navigate = useNavigate();
    
    const cardClick = () => {
        navigate(`/executive_orders/${executive_order_number}`);
    }

    return (
        <div className='saved-eo-card' onClick={ cardClick }>
            <h3>{title}</h3>
            <div className="eo_details">
                <p>{executive_order_number}</p>
                <p>{format(new Date(publication_date), "MMMM dd, yyyy")}</p>
            </div>
        </div>
    );
}

export default SavedEosCards;