import SavedRepCards from '../SavedRepCards/SavedRepCards'
import './SavedRepsContainer.css';

function SavedRepsContainer({ savedReps, setDetailsTarget, getRepDetails }) {

    if (!savedReps?.data || !Array.isArray(savedReps.data)) {
        return <p> Loading... </p>
    }

    const reps = savedReps.data.map((rep) => {
        return ( 
        <SavedRepCards photoURL = { rep.attributes.photo_url }
                        name={ rep.attributes.name }
                        party={ rep.attributes.party }
                        area={ rep.attributes.area }
                        location={ rep.attributes.location }
                        id={ rep.attributes.id }
                        key={ rep.attributes.id}
                        setDetailsTarget = { setDetailsTarget }
                        getRepDetails = { getRepDetails }
                        />
        );
    });

    return (
        <section className='saved-container'>
            <h2>Your Saved Representatives</h2>
            <div className="card-scroll">
                {reps}
            </div>
        </section>
    );
}

export default SavedRepsContainer;
