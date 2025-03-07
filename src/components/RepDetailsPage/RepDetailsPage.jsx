import './RepDetailsPage.css'

function RepDetailsPage ( {repDetails }) {
    return (
        <section className="rep-details-container">
            <img src={ repDetails.data.attributes.photo_url } alt={`photo of ${repDetails.data.attributes.name}`} className="rep-card-img"/>
            <h1>{repDetails.data.attributes.name}</h1>
            <h2>{repDetails.data.attributes.area}</h2>
            <h2>{repDetails.data.attributes.state}</h2>
            <h2>{repDetails.data.attributes.location}</h2>
            <h2>{repDetails.data.attributes.party}</h2>
            <h2>{repDetails.data.attributes.phone}</h2>
            <h2>{repDetails.data.attributes.reason}</h2>
        </section>
    );
}

export default RepDetailsPage;