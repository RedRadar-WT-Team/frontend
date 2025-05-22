import LocalRepCards from '../LocalRepCards/LocalRepCards'
import './LocalRepsContainer.css';

function LocalRepsContainer({ localReps, setDetailsTarget, getRepDetails }) {

    if (!localReps?.data || !Array.isArray(localReps.data)) {
        return <p> Loading... </p>
    }

    const reps = localReps.data.map((rep) => {
        return ( 
        <LocalRepCards  photoURL = { rep.attributes.photo_url }
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
        <section className='localContainer'>
            <h2>Your Local Reps</h2>
            <div className="card-scroll">
                {reps}
            </div>
        </section>
    );
}

export default LocalRepsContainer;
