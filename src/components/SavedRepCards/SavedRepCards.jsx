import './SavedRepCards.css';

function SavedRepsCards({ photoURL, name, party, area, location, id, setDetailsTarget, getRepDetails}) {

    const cardClick = () => {
        setDetailsTarget("rep")
        getRepDetails(id, location)
    }

    return (
        <div className='rep-card' onClick={ cardClick }>
            <img src={ photoURL } alt={ `phot of ${name}`} />

            <div className='rep-content'>
                <h3>{ name }</h3>
                <p>{ party }</p>
                <p>{ area }</p>
            </div>
        </div>
    );
}

export default SavedRepsCards;