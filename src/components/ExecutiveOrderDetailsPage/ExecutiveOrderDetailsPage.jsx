import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ExecutiveOrderDetailsPage.css';

function ExecutiveOrderDetails() {
  const eoID = useParams().eoId;
  const [clickedEO, setClickedEO] = useState();

  function getEODetails() {
    fetch(`http://127.0.0.1:3000/api/v1/executive_orders/${eoID}`)
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
      <h1>{ clickedEO.data.attributes.title }</h1>
      <h2>{ clickedEO.data.attributes.document_number}</h2>
      <h2>{ clickedEO.data.attributes.publication_date}</h2>
      <a href={ clickedEO.data.attributes.pdf_url }>Click me to see full executive order</a>
    </section>
    )
  }
}

export default ExecutiveOrderDetails;
