import SavedEoCards from '../SavedEoCards/SavedEoCards'
import './SaveEosContainer.css';

function SavedEosContainer({ savedEos }) {

    if (!savedEos?.data || !Array.isArray(savedEos.data)) {
        return <p> Loading... </p>
    }

    const eos = savedEos.data.map((eo) => {
        return ( 
        <SavedEoCards  title={ eo.attributes.title }
                        executive_order_number={eo.attributes.executive_order_number}
                        publication_date={eo.attributes.publication_date}
                        id={ eo.attributes.id }
                        key={ eo.attributes.id}
                        />
        );
    });

    return (
        <section className='saved-container'>
            <h2>Your Saved Executive Orders</h2>
            {eos}
        </section>
    );
}

export default SavedEosContainer;
