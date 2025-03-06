import './DetailsPage.css'
// import EOs component
// import reps component

function DetailsPage( { target }) {
    const targetComponent = () => {
        if ( target === "EO" )
            return (
                <div>{/* Load in eoDetails component */}</div>
            );
        else
        return (
            <div>{/* Load in repDetails component */}</div>
        );
        end
    }
    
    return (
        {targetComponent}
    );
}

export default DetailsPage;