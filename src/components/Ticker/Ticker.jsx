import { useState } from "react";
import TickerSlide from '../TickerSlide/TickerSlide';
import './Ticker.css';
// import BtnSlider from './BtnSlider' 

function Ticker( { executiveOrders } ){
  const executiveOrderSlides = executiveOrders.map(executiveOrder => {
    return (
      <TickerSlide
      title={executiveOrder.title}
      summary={executiveOrder.summary}
      id={executiveOrder.id}
      key={executiveOrder.id}    
    />
    
    )
  })
  return (
    <div className='ticker-container'>
      {executiveOrderSlides}
    </div>
  )
}

export default Ticker;