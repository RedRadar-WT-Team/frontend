import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ExecutiveOrderDetailsPage.css';

function ExecutiveOrderDetails({ baseURL }) {
  const eoID = useParams().eoId;
  const [clickedEO, setClickedEO] = useState();

  function getEODetails() {
    console.log('Fetching EO details from:', `${baseURL}/api/v1/executive_orders/${eoID}`);
    fetch(`${baseURL}/api/v1/executive_orders/${eoID}`)
    .then(response => {
      console.log('Response status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('Full API Response:', data);
      console.log('Data structure:', {
        hasData: !!data.data,
        hasAttributes: !!data.data?.attributes,
        availableFields: data.data?.attributes ? Object.keys(data.data.attributes) : []
      });
      console.log('Executive Order Details:', data);
      console.log('Summary:', data.data.attributes.summary);
      setClickedEO(data)
    })
    .catch(error => {
      console.error('Error fetching EO details:', error);
      console.log('error message: ', error.message)
    })
  }

  useEffect(() => {
    getEODetails();
  }, [])


  if(clickedEO) {
    return (
      <section className='EODetails'>
        <div className="EOCard"> 
          <h2>{ clickedEO.data.attributes.title }</h2>
          <h3>Document #: { clickedEO.data.attributes.document_number}</h3>
          <h3>Published Date: { clickedEO.data.attributes.publication_date}</h3>
          <p className="eo-summary">{ clickedEO.data.attributes.summary }</p>
          <a href={ clickedEO.data.attributes.pdf_url }>Click me to see full executive order</a>
        </div>
      </section>
    )
  }
  return <div>Loading...</div>;
}

export default ExecutiveOrderDetails;
