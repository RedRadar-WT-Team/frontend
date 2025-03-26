import SavedEoCards from '../SavedEoCards/SavedEoCards'
import './SaveEosContainer.css';

function SavedEosContainer({ savedEos }) {

    if (!savedEos?.data || !Array.isArray(savedEos.data)) {
        return <p> Loading... </p>
    }

    const eos = savedEos.data.map((eo) => {
        console.log(eo)
        return ( 
        <SavedEoCards  title={ eo.attributes.title }
                        executive_order_number={eo.attributes.document_number}
                        publication_date={eo.attributes.publication_date}
                        id={ eo.attributes.id }
                        key={ eo.attributes.id}
                        />
        );
    });

    return (
        <section className='saved-container'>
            <h2>Your Saved Executive Orders</h2>
            <div className="card-scroll">
                {eos}
            </div>
        </section>
    );
}

export default SavedEosContainer;
