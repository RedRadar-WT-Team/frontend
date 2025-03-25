import './LocalRepCards.css'

function LocalRepCards({ photoURL, name, party, area, location, id, setDetailsTarget, getDetails }) {

    const cardClick = () => {
        setDetailsTarget("rep")
        getDetails(id, location)
    }

    return(
        <div className='local-rep-card' onClick={ cardClick }>
            <img src={ photoURL } alt={ `phot of ${name}`} />

            <div className='local-rep-content'>
                <h3>{ name }</h3>
                <p>{ party }</p>
                <p>{ area }</p>
            </div>
        </div>
    );
}

export default LocalRepCards;