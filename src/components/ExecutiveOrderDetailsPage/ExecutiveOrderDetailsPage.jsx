import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ExecutiveOrderDetailsPage.css';

function ExecutiveOrderDetails() {
  const eoID = useParams().eoId;
  console.log(eoID)
  const [clickedEO, setClickedEO] = useState();

  function getEODetails() {
    fetch(`http://127.0.0.1:3000/api/v1/executive_orders/api/v1/executive_orders/${eoID}`)
    .then(response => response.json())
    .then(data => {
      setClickedEO(data)
    })
    .catch(error => console.log('error message: ', error.message))
  }

  useEffect(() => {
    getEODetails();
  })

  if(clickedEO) {
    console.log(clickedEO)
    return (
      console.log("Hello")
    )
  }
}

export default ExecutiveOrderDetails;
