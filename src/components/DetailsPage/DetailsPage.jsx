import './DetailsPage.css'
// import EOs component
// import reps component

function DetailsPage( { target, details }) {
    const targetComponent = () => {
        if ( target === "EO" ) {
            return (
                <div>{/* Load in eoDetails component */}</div>
            );
        } else {
            return (
                <div>{/* Load in repDetails component */}</div>
            );
        } 
    }
    
    return (
        <section className="details_container">
            {targetComponent}
        </section>
    );
}

export default DetailsPage;