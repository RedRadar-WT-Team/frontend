import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ExecutiveOrderDetailsPage.css';

function ExecutiveOrderDetails({ baseURL }) {
  const eoID = useParams().eoId;
  const [clickedEO, setClickedEO] = useState();

  function getEODetails() {
    fetch(`${baseURL}/api/v1/executive_orders/${eoID}`)
    .then(response => response.json())
    .then(data => {
      setClickedEO(data)
    })
    .catch(error => console.log('error message: ', error.message))
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
          <a href={ clickedEO.data.attributes.pdf_url }>Click me to see full executive order</a>
        </div>
      </section>
    )
  }
}

export default ExecutiveOrderDetails;
